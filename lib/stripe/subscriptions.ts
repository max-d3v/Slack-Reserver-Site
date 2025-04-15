import Stripe from "stripe";
import prisma from "../db/db";
import stripe from "./stripe";
import logger from "../utils/logger";

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
        await this.updateSubscription(invoice, subscription);
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

  async handleSubscriptionUpdated(event: Stripe.Event): Promise<boolean> {
    try {
      const subscription = event.data.object as Stripe.Subscription;
      logger.info('stripe', "Subscription updated", { subscriptionId: subscription.id, status: subscription.status });

      const dbSubscription = await this.findDbSubscription(subscription.id);
      if (!dbSubscription) {
        return false;
      }

      const newStatus = this.mapStripeStatusToDbStatus(subscription.status);

      await prisma.tenant_subscriptions.update({
        where: { id: dbSubscription.id },
        data: {
          status: newStatus,
          updated_at: new Date()
        }
      });

      logger.info('stripe', `Assinatura atualizada do antigo: ${subscription.status}, para o novo status: ${newStatus}`, { 
        subscriptionId: subscription.id, 
        tenantId: dbSubscription.tenant_id 
      });
      
      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao processar atualização da assinatura', { 
        error: error.message,
        stack: error.stack
      });
      return false;
    }
  }

  async handleInvoicePaymentFailed(event: Stripe.Event): Promise<boolean> {
    try {
      const invoice = event.data.object as Stripe.Invoice;
      logger.info('stripe', "Pagamento de fatura falhou", { invoiceId: invoice.id });

      if (!invoice?.parent?.subscription_details?.subscription) {
        logger.debug('stripe', 'Fatura sem assinatura associada', { invoiceId: invoice.id });
        return true;
      }

      const subscriptionId = invoice?.parent?.subscription_details?.subscription as string;
      
      const dbSubscription = await this.findDbSubscription(subscriptionId);
      if (!dbSubscription) {
        return false;
      }

      await prisma.tenant_subscriptions.update({
        where: { id: dbSubscription.id },
        data: {
          status: SubscriptionStatus.PAST_DUE,
          updated_at: new Date()
        }
      });

      logger.info('stripe', `Assinatura marcada como past_due devido à falha no pagamento`, { 
        subscriptionId, 
        invoiceId: invoice.id 
      });
      
      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao processar falha de pagamento', { 
        error: error.message,
        stack: error.stack 
      });
      return false;
    }
  }

  async handleSubscriptionDeleted(event: Stripe.Event): Promise<boolean> {
    try {
      const subscription = event.data.object as Stripe.Subscription;
      logger.info('stripe', "Assinatura cancelada", { subscriptionId: subscription.id });

      const dbSubscription = await this.findDbSubscription(subscription.id);
      if (!dbSubscription) {
        return false;
      }

      await prisma.tenant_subscriptions.update({
        where: { id: dbSubscription.id },
        data: {
          status: SubscriptionStatus.CANCELED,
          updated_at: new Date()
        }
      });

      logger.info('stripe', `Assinatura marcada como cancelada`, { 
        subscriptionId: subscription.id, 
        dbSubscriptionId: dbSubscription.id 
      });
      
      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao processar cancelamento da assinatura', { 
        error: error.message,
        stack: error.stack 
      });
      return false;
    }
  }

  private mapStripeStatusToDbStatus(stripeStatus: string): SubscriptionStatus {
    switch (stripeStatus) {
      case 'active':
        return SubscriptionStatus.ACTIVE;
      case 'past_due':
        return SubscriptionStatus.PAST_DUE;
      case 'unpaid':
        return SubscriptionStatus.INACTIVE;
      case 'canceled':
        return SubscriptionStatus.CANCELED;
      default:
        return SubscriptionStatus.INACTIVE;
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
      
      const plan = await prisma.plans.findFirst({
        where: {
          OR: [
            { stripe_product_id: productId }
          ]
        }
      });

      if (!plan) {
        logger.error('stripe', 'Plano não encontrado para o produto', { productId });
        return false;
      }

      // Criar a assinatura no banco de dados
      const newSubscription = await prisma.tenant_subscriptions.create({
        data: {
          tenant_id: users.tenant_id,
          plan_id: plan.id,
          status: SubscriptionStatus.ACTIVE,
          stripe_subscription_id: subscription.id,
        },
        include: {
          tenants: true
        }
      });

      logger.info('stripe', `Assinatura criada para tenant ${users.tenant_id} com plano ${plan.id}`, {
        subscriptionId: newSubscription.id,
        tenantId: users.tenant_id,
        planId: plan.id
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

  private async updateSubscription(invoice: Stripe.Invoice, subscription: Stripe.Subscription): Promise<boolean> {
    try {
      logger.info('stripe', "Subscription renewed! Atualizando entry no db...");
          
      const dbSubscription = await prisma.tenant_subscriptions.findFirst({
        where: {
          stripe_subscription_id: subscription.id
        },
        include: {
          tenants: true
        }
      });
      
      if (!dbSubscription) {
        logger.error('stripe', 'Subscription não encontrada no banco de dados', { 
          subscriptionId: subscription.id,
          customerId: invoice.customer
        });
        return false;
      }

      await prisma.tenant_subscriptions.update({
        where: { id: dbSubscription.id },
        data: {
          status: SubscriptionStatus.ACTIVE,
          updated_at: new Date()
        }
      });

      logger.info('stripe', `Assinatura atualizada com sucesso`, { 
        subscriptionId: subscription.id, 
        dbSubscriptionId: dbSubscription.id 
      });
      
      return true;
    } catch (error: any) {
      logger.error('stripe', 'Erro ao atualizar assinatura', { 
        error: error.message,
        stack: error.stack
      });
      return false;
    }
  }

  private async findDbSubscription(subscriptionId: string) {
    const dbSubscription = await prisma.tenant_subscriptions.findFirst({
      where: { stripe_subscription_id: subscriptionId },
      include: { tenants: true }
    });

    if (!dbSubscription) {
      logger.error('stripe', 'Assinatura não encontrada no banco de dados', { subscriptionId });
      return null;
    }

    return dbSubscription;
  }

  private async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      if (!subscription || !subscription.id) {
        logger.error('stripe', 'Assinatura não encontrada ou inválida no Stripe', { subscriptionId });
        return null;
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
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;