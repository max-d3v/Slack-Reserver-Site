"use client";

import { CalendarCheck, Slack } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { SlackButton } from '@/components/ui/slackButton'
import React, { useState } from 'react'
import { BillingToggle } from '@/components/ui/billingToggle';

const pricingPlans = {
    team: {
        monthly: {
            price: 6,
            productId: "prod_S4P7FrJrgZvJwG"
        },
        annual: {
            price: 60, // $5/month when paid annually (2 months free)
            productId: "prod_annual_team"
        },
    },
    company: {
        monthly: {
            price: 12,
            productId: "prod_S4iuAaDkOrW6jx"
        },
        annual: {
            price: 120, // $10/month when paid annually (2 months free)
            productId: "prod_annual_company"
        },
    },
    free: {
        monthly: {
            price: 0,
            productId: "123"
        },
        annual: {
            price: 0, // 
            productId: "123"
        },
    }
}

const Pricing = () => {
    const { data: session } = useSession();
    const isLogged = session?.user;
    const hasTenantId = (session?.user as any)?.tenant_id;
    const hasSubscription = (session?.user as any)?.tenant?.tenant_subscriptions?.length > 0;
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const handleBillingChange = (isAnnual: boolean) => {
        setBillingCycle(isAnnual ? 'annual' : 'monthly');
    };

    return (
        <main className="min-h-screen w-full bg-gray-100"
            style={{
                //Noise implementation!
                background: `#f3f3f3 url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.03)"
            }}>
            <div className='container mt-12 mx-auto px-4 py-16'>
                <div className='text-center max-w-3xl mx-auto mb-10'>
                    <h1 className="text-6xl text-gray-700 font-bold mb-4">Pricing</h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Simple pricing for all use cases.
                    </p>
                    <BillingToggle onChangeAction={handleBillingChange} />
                </div>

                {/* Rest of your pricing grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>

                    {/* Enterprise plan */}
                    <div className="border rounded-lg bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:h-[90%] md:self-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Free</h2>
                            <p className="mt-2 text-gray-600">Perfect for small offices with minimal scheduling needs</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">
                                ${pricingPlans.free[billingCycle].price}
                                <span className="text-gray-500 text-lg font-normal">
                                    {billingCycle === 'monthly' ? '/month' : '/year'}
                                </span>
                            </h1>
                            {billingCycle === 'annual' && (
                                <p className="text-sm text-green-600 mt-1">$0/month, billed annually</p>
                            )}
                            <div className="mt-2 inline-flex items-center">
                            <span className="text-sm font-medium text-green-600">✓ No credit-card required</span>
                            </div>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4 flex justify-center">
                                {hasTenantId && !hasSubscription ?
                                    <form className="w-full" action="/api/create-checkout-session" method="POST" >
                                        <input type="hidden" name="product_id" value={pricingPlans.free[billingCycle].productId} />
                                        <input type="hidden" name="billing_cycle" value={billingCycle} />
                                        <button
                                            id="checkout-and-portal-button"
                                            type="submit"
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Start Reserving
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                    </form>
                                    :
                                    hasTenantId ?
                                        <button
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Upgrade Plan
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                        :
                                        <SlackButton />
                                }
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-4 flex-grow text-gray-800">
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 5 reservations per month</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>One resource group</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 3 resources</p>
                            </div>
                        </div>
                    </div>

                    {/* Company plan */}
                    <div className="border-2 border-[#4A154B] rounded-xl p-8 shadow-lg bg-white md:scale-103 z-10 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4A154B] text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md">
                            Most Popular
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Company</h2>
                            <p className="mt-2 text-gray-600">Transform your workspace.</p>
                            <p className="text-gray-600">No more excel sheets and one sided reservations</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">
                                ${pricingPlans.company[billingCycle].price}
                                <span className="text-gray-500 text-lg font-normal">
                                    {billingCycle === 'monthly' ? '/month' : '/year'}
                                </span>
                            </h1>
                            {billingCycle === 'annual' && (
                                <p className="text-sm text-green-600 mt-1">$10/month, billed annually</p>
                            )}
                            <div className="mt-2 inline-flex items-center">
                                <span className="text-sm font-medium text-green-600">✓ 14-day free trial</span>
                            </div>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4 flex justify-center">
                                {hasTenantId && !hasSubscription ?
                                    <form className='w-full' action="/api/create-checkout-session" method="POST">
                                        <input type="hidden" name="product_id" value={pricingPlans.company[billingCycle].productId} />
                                        <input type="hidden" name="billing_cycle" value={billingCycle} />
                                        <button
                                            id="checkout-and-portal-button"
                                            type="submit"
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Start Reserving
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                    </form>
                                    :
                                    hasTenantId ?
                                        <button
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Upgrade Plan
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                        :
                                        <SlackButton />
                                }
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-3 flex-grow text-gray-800">
                            {/* Feature list continues as before */}
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 250 reservations per month</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 25 resource groups</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 100 resources</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Email notifications</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Daily personal reservations and usage info</p>
                            </div>
                        </div>
                    </div>

                    {/* Team plan */}
                    <div className="border rounded-lg bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:h-[90%] md:self-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Team</h2>
                            <p className="mt-2 text-gray-600">For small teams that want to reserve a limited amount of rooms</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">
                                ${pricingPlans.team[billingCycle].price}
                                <span className="text-gray-500 text-lg font-normal">
                                    {billingCycle === 'monthly' ? '/month' : '/year'}
                                </span>
                            </h1>
                            {billingCycle === 'annual' && (
                                <p className="text-sm text-green-600 mt-1">$5/month, billed annually</p>
                            )}
                            <div className="mt-2 inline-flex items-center">
                                <span className="text-sm font-medium text-green-600">✓ 14-day free trial</span>
                            </div>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4 flex justify-center">
                                {hasTenantId && !hasSubscription ?
                                    <form className="w-full" action="/api/create-checkout-session" method="POST" >
                                        <input type="hidden" name="product_id" value={pricingPlans.team[billingCycle].productId} />
                                        <input type="hidden" name="billing_cycle" value={billingCycle} />
                                        <button
                                            id="checkout-and-portal-button"
                                            type="submit"
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Start Reserving
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                    </form>
                                    :
                                    hasTenantId ?
                                        <button
                                            className="w-full py-3 px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Upgrade Plan
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#611f64] via-[#7a2a7d] to-[#611f64] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                        </button>
                                        :
                                        <SlackButton />
                                }
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-4 flex-grow text-gray-800">
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 50 reservations per month</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 5 resource groups</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 20 resources (total)</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Email notifications</p>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </main>
    );
};

export default Pricing;