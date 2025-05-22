"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

import { BillingToggle } from './billingToggle';
import { useRouter } from 'next/navigation';
import Stripe from 'stripe';
import PricingPlan from './pricingPlan';
import { PriceWithFeatures } from '@/app/pricing/page';
import { includesInsensitive, isStripeProduct } from '@/lib/utils/functions';
import { CONSTANTS } from '@/lib/constants';

const PricingPlans = ({ pricingPlans }: { pricingPlans: Stripe.Price[] }) => {
    const { data: session } = useSession();
    const hasTenantId = (session?.user as any)?.tenant_id;
    const hasSubscription = (session?.user as any)?.subscription ?? false;

    const [chosenPlans, setChosenPlans] = useState<Stripe.Price[]>([]);
    const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');

    const handleBillingChange = () => {
        setBillingCycle(billingCycle == "month" ? 'year' : 'month');
    };

    const filterPlans = ({ recurring_interval }: { recurring_interval: string }) => {
        const filtered = pricingPlans.filter((plan) => {
            return ((plan.recurring?.interval === recurring_interval && isStripeProduct(plan.product) && plan.product.active === true) || (isStripeProduct(plan.product) && includesInsensitive(plan.product.name, CONSTANTS.PRICING.FIXED_PLAN)));
        });

        //Order highlighted plans in the middle
        const highlightedPlans = filtered.filter((plan) => includesInsensitive((plan.product as Stripe.Product).name, CONSTANTS.PRICING.HIGHLIGHTED_PLAN));
        const otherPlans = filtered.filter((plan) => !includesInsensitive((plan.product as Stripe.Product).name, CONSTANTS.PRICING.HIGHLIGHTED_PLAN));
        return [...otherPlans.slice(0, 1), ...highlightedPlans, ...otherPlans.slice(1)];
    }

    useEffect(() => {
        const filteredPlans = filterPlans({ recurring_interval: billingCycle })
        setChosenPlans(filteredPlans);
    }, [billingCycle])

    const router = useRouter();
    return (
        <>
            <div className='text-center max-w-3xl mx-auto mb-10'>
                <h1 className="text-6xl text-gray-700 font-bold mb-4">Pricing</h1>
                <p className="text-gray-600 text-lg mb-8">
                    Simple pricing for all use cases.
                </p>
                <BillingToggle onChangeAction={handleBillingChange} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>


                {/* Pricing plans */}
                {chosenPlans.map((price) => {
                    return <PricingPlan price={price} highlight={includesInsensitive((price.product as Stripe.Product).name, CONSTANTS.PRICING.HIGHLIGHTED_PLAN)} hasTenantId={hasTenantId} hasSubscription={hasSubscription} />
                })}



            </div>
            <div className="mt-16 text-center">
                <button
                    className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#4A154B] text-[#4A154B] font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A154B]"
                    onClick={() => router.push("/contact?flavor=planRequest&inputHighlight=message")}
                >
                    <span>Did not find a plan suitable for you? Let me know!</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default PricingPlans