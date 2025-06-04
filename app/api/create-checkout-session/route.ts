import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import prisma from '@/lib/db/db';
import stripe from '@/lib/stripe/stripe';
import logger from '@/lib/utils/logger';

const YOUR_DOMAIN = process.env.SITE_URL;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productId = formData.get('product_id') as string;

    if (!productId) {
      return NextResponse.json(
        { error: 'product_id is required' },
        { status: 400 }
      );
    }

    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      expand: ['data.product'],
    });


    if (!prices.data.length) {
      return NextResponse.json(
        { error: 'No active prices found for this product' },
        { status: 404 }
      );
    }

    const authSession = await auth();
    if (!authSession?.user) {
      return NextResponse.json(
        { error: 'User must be authenticated' },
        { status: 401 }
      );
    }

    const price = prices.data[0];
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}?success=Checkout successful!`,
      cancel_url: `${YOUR_DOMAIN}?error=Checkout canceled`,
      metadata: {
        user_id: authSession.user.id,
      },
    });



    if (!session.url) {
      throw new Error("Error creating stripe session")
    }


    await prisma.user_checkout_sessions.create({
      data: {
        user_id: authSession.user.id,
        session_id: session.id
      }
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error: any) {
    logger.critical('stripe', `Checkout session creation error: ${error.message}`)
    return NextResponse.redirect(new URL(`/?error=${error.message}`, request.url));
  }
}