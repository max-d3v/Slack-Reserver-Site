import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import stripe from '@/lib/stripe/stripe';
export async function POST(request: Request) {
    try {
        const sessionData = await auth() as any;
        const { user } = sessionData;
        if (!user || !user.id) {
            throw new Error("Session not found or user not authenticated");
        }
        if (!user.stripe_customer_id) {
            throw new Error("User does not have a Stripe customer ID");
        }

        const session = await stripe.billingPortal.sessions.create({
            
            customer: user.stripe_customer_id,
            return_url: 'http://localhost:3000/profile',
        });

        return NextResponse.redirect(session.url, { status: 303 });
    } catch (error: any) {
        console.error("Checkout session creation error");
        return NextResponse.redirect(new URL(`/?error=${error.message}`, request.url));
    }
}