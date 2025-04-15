import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/app/auth';
import prisma from '@/lib/db/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

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
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/pricing?canceled=true`,
      metadata: {
        user_id: authSession.user.id,
      }

    });

    console.log("stripe session: ", session);

    if (!session.url) {
      throw new Error("Error creating stripe session")
    }


    console.log("user creating checkout session: ", authSession);

    await prisma.user_checkout_sessions.create({
      data: {
        user_id: authSession.user.id,
        session_id: session.id
      }
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error: any) {
    console.error("Checkout session creation error");
    return NextResponse.redirect(new URL(`/?error=${error.message}`, request.url));
  }
}