import { isStripeProduct } from '@/lib/stripe/stripe';
import React from 'react'
import Stripe from 'stripe'
import { SlackButton } from './slackButton';
import { CalendarCheck } from 'lucide-react';

const PricingPlan = ({ price, highlight, hasTenantId, hasSubscription }: { price: Stripe.Price, highlight: boolean, hasTenantId: boolean, hasSubscription: boolean }) => {
  const { product } = price;
  if (!isStripeProduct(product)) {
    return (
      <div>
        Price does not contain a valid stripe product
      </div>
    )
  }

  const core = () => (
    <div className="border border-slate-200 rounded-lg bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:h-[90%] md:self-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          ${price.unit_amount_decimal}
          <span className="text-gray-500 text-lg font-normal">
            {`/${price.recurring?.interval}`}
          </span>
        </h1>
        <div className="mt-2 inline-flex items-center">
          <span className="text-sm font-medium text-green-600">✓ No credit-card required</span>
        </div>
      </div>
      <div className="mt-8 -mx-8">
        <div className="px-8 py-2 border-t border-gray-200"></div>
        <div className="px-8 py-4 flex justify-center">
          {hasTenantId && !hasSubscription ?
            <form className="w-full" action="/api/create-checkout-session" method="POST" >
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="billing_cycle" value={price.recurring?.interval} />
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
          <p>Up to 30 reservations per month</p>
        </div>
        <div className="flex items-center">
          <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
          <p>Up to 3 resource groups</p>
        </div>
        <div className="flex items-center">
          <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
          <p>Up to 10 resources</p>
        </div>
      </div>
    </div>
  )

  if (highlight) {
    return (
      <div className="border-2 border-[#4A154B] rounded-xl p-8 shadow-lg bg-white md:scale-103 z-10 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4A154B] text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md">
          Most Popular
        </div>
        {core()}
      </div>
    )
  } else {
    return core()
  }
}

export default PricingPlan