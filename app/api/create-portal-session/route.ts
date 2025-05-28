import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe/stripe';

const YOUR_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const session_id = formData.get('session_id') as string;

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      return NextResponse.json(
        { error: 'No customer found in the session' },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer.toString(),
      return_url: YOUR_DOMAIN,
    });

    return NextResponse.redirect(`${portalSession.url}/success=checkout`, { status: 303 });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    return NextResponse.redirect(new URL(`/auth-result?error=${error.message}`, request.url));
  }
}
