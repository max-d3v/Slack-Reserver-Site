import Stripe from "stripe";
import prisma from "../db/db";
import stripe from "./stripe";
import logger from "../utils/logger";
import { inspect } from "util";

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  INACTIVE = 'inactive',
  CANCELED = 'canceled'
}

export class SubscriptionService {
  async handleCustomerCreated(event: Stripe.Event): Promise<boolean> {
    try {
      const customer = event.data.object as Stripe.Customer;
      logger.info("stripe", "Cliente criado no Stripe", { customerId: customer.id });

      const checkoutSession = await this.findCheckoutSessionByStripeId(customer.id, "customer");
      if (!checkoutSession) {
        logger.error('stripe', 'Nenhuma sessão de checkout encontrada para o cliente', { customerId: customer.id });
        return false;
      }

      if (!checkoutSession?.users?.id) {
        logger.error('stripe', 'Nenhum usuário encontrado para a sessão de checkout', { sessionId: checkoutSession.id });
        return false;
      }

      await prisma.users.update({
        where: { id: checkoutSession.users.id },
        data: { stripe_customer_id: customer.id },
      });

      logger.info('stripe', `Id do stripe associado á conta do usuário ${checkoutSession.users.id}: ${customer.id}`);
      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro processando criação de cliente', { error: error.message, stack: error.stack });
      return false;
    }
  }

  async handleInvoicePaid(event: Stripe.Event): Promise<boolean> {
    try {
      const invoice = event.data.object as Stripe.Invoice;
      const { billing_reason } = invoice;
      logger.info('stripe', "Invoice Paid! Processing subscription");

      const subscriptionId = invoice.parent?.subscription_details?.subscription as string;
      if (!subscriptionId) {
        logger.error('stripe', 'Fatura não possui subscription associada', { invoiceId: invoice.id });
        return false;
      }

      const subscription = await this.retrieveSubscription(subscriptionId);
      if (!subscription) {
        return false;
      }

      if (billing_reason === 'subscription_create') {
        await this.createSubscription(invoice, subscription);
      } else {
        // No need to update the subscription in my db since it will keep its stripe id so.
      }

      logger.info('stripe', `Pagamento processado com sucesso`, {
        invoiceId: invoice.id,
        subscriptionId: subscription.id
      });

      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro processando pagamento de fatura', {
        error: error.message,
        stack: error.stack
      });
      return false;
    }
  }


  private async createSubscription(invoice: Stripe.Invoice, subscription: Stripe.Subscription): Promise<boolean> {
    try {
      logger.info('stripe', "Nova subscription! Criando entry no db...");

      const customer = await this.retrieveCustomer(invoice.customer as string);
      if (!customer) {
        return false;
      }

      const checkOutSession = await this.findCheckoutSessionByStripeId(customer.id, "customer");
      if (!checkOutSession) {
        logger.error('stripe', 'Nenhuma sessão de checkout encontrada para o cliente', { customerId: customer.id });
        return false;
      }

      const { users } = checkOutSession;
      if (!users || !users.id) {
        logger.error('stripe', 'Nenhum usuário encontrado para o cliente do Stripe', {
          customerId: customer.id,
          customerEmail: typeof customer !== 'string' ? customer.email : undefined
        });
        return false;
      }

      if (!users.tenant_id) {
        logger.error('stripe', 'Usuário não tem tenant_id associado', { userId: users.id });
        return false;
      }

      const lineItem = invoice.lines.data[0];

      logger.debug('stripe', "Processando item da fatura", {
        lineItemId: lineItem.id,
        lineItemDescription: lineItem.description
      });

      const productId = lineItem.pricing?.price_details?.product;
      if (!productId) {
        logger.error('stripe', 'Não foi possível determinar o priceId da fatura', { invoiceId: invoice.id });
        return false;
      }

      // Criar a assinatura no banco de dados
      const newSubscription = await prisma.tenant_subscriptions.create({
        data: {
          tenant_id: users.tenant_id,
          stripe_subscription_id: subscription.id,
        },
        include: {
          tenants: true
        }
      });

      logger.info('stripe', `Assinatura criada para tenant ${users.tenant_id} com subscription id ${newSubscription.id}`, {
        subscriptionId: newSubscription.id,
        tenantId: users.tenant_id,
      });

      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao criar assinatura', {
        error: error.message,
        stack: error.stack
      });
      return false;
    }
  }

  public async retrieveSubscription(subscriptionId?: string | null, customerId?: string | null): Promise<Stripe.Subscription | null> {
    try {
      if (!subscriptionId && !customerId) {
        throw new Error('Nenhum ID de assinatura ou cliente fornecido');
      }

      let subscription;
      if (subscriptionId) {
        subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['items.data.price.product']
        });
      } else if (customerId) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: "active",
        });

        console.log("Numero de subscriptions: ", subscriptions.data.length);

        if (subscriptions.data.length > 1) {

          subscription = this.getNewestSubscription(subscriptions.data);
          console.log("Subscription mais nova: ", inspect(subscription, { depth: 5 }));
        }
      }

      if (!subscription || !subscription.id) {
        throw new Error('Assinatura não encontrada ou inválida no Stripe');
      }

      return subscription;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao buscar assinatura no Stripe', {
        subscriptionId,
        error: error.message
      });
      return null;
    }
  }

  private async retrieveCustomer(customerId: string): Promise<Stripe.Customer | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);

      if (typeof customer === 'string' || customer.deleted) {
        logger.error('stripe', 'Cliente não encontrado ou excluído', { customerId });
        return null;
      }

      return customer;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao buscar cliente no Stripe', {
        customerId,
        error: error.message
      });
      return null;
    }
  }

  private async findCheckoutSessionByStripeId(stripeId: string, type: "customer" | "invoice") {
    const session = await this.findStripeSession(stripeId, type);
    if (!session) {
      logger.error('stripe', 'Nenhuma sessão encontrada', { stripeId });
      return null;
    }

    return this.findCheckoutSession(session.id);
  }

  private async findStripeSession(givenId: string, type: "customer" | "invoice") {
    try {
      const session = await stripe.checkout.sessions.list({
        limit: 1,
        ...(type === "customer" ? { customer: givenId } : { invoice: givenId })
      });

      if (session.data.length === 0) {
        logger.error('stripe', 'Nenhuma sessão encontrada', { givenId });
        return null;
      }

      return session.data[0];
    } catch (error: any) {
      logger.error('stripe', 'Erro ao buscar sessão de checkout', { error: error.message });
      return null;
    }
  }

  private async findCheckoutSession(sessionId: string) {
    try {
      const user = await prisma.user_checkout_sessions.findFirst({
        where: { session_id: sessionId },
        include: { users: true }
      });

      return user;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao buscar cliente pela sessão de checkout', { error: error.message });
      return null;
    }
  }

  private getNewestSubscription(subscriptions: Stripe.Subscription[]): Stripe.Subscription | null {
    try {
      if (!subscriptions || subscriptions.length === 0) {
        return null;
      }

      const sortedSubscriptions = subscriptions.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return dateB.getTime() - dateA.getTime();
      });

      return sortedSubscriptions[0];
    } catch (error: any) {
      logger.error('stripe', 'Erro ao buscar a assinatura mais recente', { error: error.message });
      return null;
    }
  }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;