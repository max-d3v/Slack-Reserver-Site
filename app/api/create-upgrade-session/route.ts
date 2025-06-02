import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import stripe from '@/lib/stripe/stripe';
import logger from '@/lib/utils/logger';
import subscriptionService from '@/lib/stripe/subscriptionServices';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const newProductId = formData.get('product_id') as string | null;

    if (!newProductId) {
      return NextResponse.json(
        { error: 'product_id is required' },
        { status: 400 }
      );
    }

    const authSession = await auth();
    if (!authSession?.user) {
      return NextResponse.json(
        { error: 'User must be authenticated' },
        { status: 401 }
      );
    }

    const user = authSession.user as any;
    if (!user.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer found for this user' },
        { status: 404 }
      );
    }

    const currentSubscription = await subscriptionService.getActiveSubscription(user.stripe_customer_id);

    

    if (!currentSubscription || !currentSubscription.id) {
      return NextResponse.json(
        { error: 'No current subscription found' },
        { status: 404 }
      );
    }

    const prices = await stripe.prices.list({
      product: newProductId,
      active: true,
    });

    if (!prices.data.length) {
      return NextResponse.json(
        { error: 'No active prices found for this product' },
        { status: 404 }
      );
    }

    const newPrice = prices.data[0];

    // Get the current subscription item ID
    const subscriptionItemId = currentSubscription.items.data[0].id;

    // Update the subscription directly
    const updatedSubscription = await stripe.subscriptions.update(
      currentSubscription.id,
      {
        items: [{
          id: subscriptionItemId,
          price: newPrice.id,
        }],
        proration_behavior: 'create_prorations', // This makes billing automatic when coming from a free tier to a paid one, and when 
        //going from paid to paid, 
        payment_behavior: 'pending_if_incomplete',
      }
    );

    logger.info('stripe', "Client updated subscription!", updatedSubscription.id);

    // Redirect to success page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?success=Plan updated successfully!`, { status: 303 });
  } catch (error: any) {
    logger.critical('stripe', `Subscription upgrade error: ${error.message}`);
    return NextResponse.redirect(
      new URL(`/pricing?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}