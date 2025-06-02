import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import stripe from "@/lib/stripe/stripe";
import subscriptionService from "@/lib/stripe/subscriptionServices";
import logger from "@/lib/utils/logger";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    logger.info('stripe-webhook', "Webhook called");

    const body = await request.text();
    const signature = (await headers()).get('stripe-signature') || '';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      logger.error('stripe-webhook', `Webhook signature verification failed`, { error: err.message });
      return NextResponse.json({
        error: `Webhook Error: ${err.message}`
      }, {
        status: 400
      });
    }

    //Serves as controler!
    switch (event.type) {
      case 'customer.created':
        logger.info('stripe-webhook', 'Processing customer.created event', { id: event.id });
        await subscriptionService.handleCustomerCreated(event);
        break;
      case 'invoice.paid':
        logger.info('stripe-webhook', 'Processing invoice.paid event', { id: event.id });
        break;
      case 'invoice.payment_failed':
        logger.info('stripe-webhook', 'Processing invoice.payment_failed event', { id: event.id });
        break;
      case 'customer.subscription.updated':
        logger.info('stripe-webhook', 'Processing customer.subscription.updated event', { id: event.id });
        break;
      case 'customer.subscription.deleted':
        logger.info('stripe-webhook', 'Processing subscription.updated or subscription.deleted event', { id: event.id });
        break;
      default:
        logger.debug('stripe-webhook', `Unhandled event type ${event.type}`, { id: event.id });
    }

    logger.info('stripe-webhook', 'Webhook processed successfully');

    return NextResponse.json({
      received: true
    }, {
      status: 200
    });

  } catch (error: any) {
    logger.critical('stripe-webhook', `Erro no processamento do webhook`, {
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json({
      error: `Webhook Error: ${error.message}`
    }, {
      status: 500
    });
  }
}

