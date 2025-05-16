import { includesInsensitive, isStripeProduct } from '@/lib/utils/functions';
import { SlackButton } from './slackButton';
import { CalendarCheck } from 'lucide-react';
import { PriceWithFeatures } from '@/app/pricing/page';
import React from 'react'
import { CONSTANTS } from '@/lib/constants';
import { useRouter } from 'next/navigation';

/*

<div className="flex items-center group relative">
                            <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                            <p>Up to 1000 reservations per month!<span className="text-blue-600 cursor-help">*</span></p>

                            <div className="absolute left-16 bottom-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 w-64 pointer-events-none">
                                Need more reservations?
                                <span
                                    className="font-medium text-blue-300 cursor-pointer ml-1 pointer-events-auto"
                                    onClick={() => router.push("/contact?flavor=needMoreReservations&inputHighlight=message")}
                                >
                                    Contact us for custom enterprise solutions
                                </span>
                            </div>
                        </div>
*/

const PricingPlan = ({ price, highlight, hasTenantId, hasSubscription }: { price: PriceWithFeatures, highlight: boolean, hasTenantId: boolean, hasSubscription: boolean }) => {
  const { product, features } = price;

  const router = useRouter();

  if (!isStripeProduct(product)) {
    return (
      <div>
        Price does not contain a valid stripe product
      </div>
    )
  }

  const featureString = (name: string, value: string | number) => {
    let string = "";
    switch (name) {
      case "resource-groups":
        string = `Up to ${value} resource groups`;
        break;
      case "resources":
        string = `Up to ${value} resources`;
        break;
      case "reservations":
        string = `Up to ${value} reservations per month`;
        break;
      default:
        string = `${name}: ${value}`;
    }

    return string
  }

  const Feature = ({ name, value }: { name: string, value: string | number }) => {
    if (includesInsensitive(CONSTANTS.PRICING.WANT_MORE_PLAN, product.name) && includesInsensitive(name, "reservations")) {
      console.log("ENTRO AQUIIIIIIIIIIIIIIII");
      return (
        <div className="flex items-center group relative">
          <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
          <p>{featureString(name, value)}<span className="text-blue-600 cursor-help">*</span></p>

          <div className="absolute left-16 bottom-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 w-64">
            Need more reservations?
            <span
              className="font-medium text-blue-300 cursor-pointer ml-1 pointer-events-auto"
              onClick={() => router.push("/contact?flavor=needMoreReservations&inputHighlight=message")}
            >
              Contact us for custom enterprise solutions
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex items-center  ">
          <CalendarCheck className="h-5 w-5 min-w-5 text-green-500 mr-2" />
          <p className="break-words text-md">{featureString(name, value)}</p>
        </div>
      )
    }
  }

  const core = () => (
    <div className={` ${highlight ? "" : "border border-slate-300 hover:shadow-md mt-6"} rounded-lg bg-white p-8 shadow-sm transition-shadow flex flex-col  w-full`}>
      <div className="mb-4">
        <h2 className={`${highlight ? "text-2xl" : "text-xl"} font-semibold text-gray-800`}>
          {product.name}
        </h2>
        <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
        <h1 className={`${highlight ? "text-4xl" : "text-3xl"} font-bold mt-4 text-gray-800`}>
          ${Number(price.unit_amount_decimal) / 100}
          <span className="text-gray-500 text-lg font-normal">
            {` / ${price.recurring?.interval} `}
          </span>
        </h1>
        <div className="mt-2 inline-flex items-center">
          <span className="text-sm font-medium text-green-600">
            {highlight ? "✓ 14-day free trial" : "✓ No credit-card required"}
          </span>
        </div>
      </div>

      <div className="my-6 -mx-8">
        <div className="px-8 py-2 border-t border-gray-200"></div>
        <div className="px-8 py-4 flex justify-center">
          {hasTenantId && !hasSubscription ?
            <form className="w-full" action="/api/create-checkout-session" method="POST" >
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="billing_cycle" value={price.recurring?.interval} />
              <button
                id="checkout-and-portal-button"
                type="submit"
                className={`w-full py-3 ${highlight ? "py-4" : "py-3"} px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group`}
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
                className={`w-full py-3 ${highlight ? "py-4" : "py-3"} px-5 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white font-bold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-md relative overflow-hidden group`}
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
              <SlackButton className={highlight ? "py-4" : "py-3"} />
          }
        </div>
        <div className="px-8 py-2 border-b border-gray-200"></div>
      </div>

      <div className={`mt-2 flex ${highlight ? "min-h-[28vh]" : "min-h-[24vh]"} flex-col gap-[3vh] text-gray-800 overflow-y-auto`}>
        {features ? (
          Object.entries(features).map(([key, value], index) => (
            <Feature key={index} name={key} value={value as string | number} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No features available</p>
        )}
      </div>
    </div>
  )


  if (highlight) {
    return (
      <div className="border-2 border-[#4A154B] rounded-xl p-2 shadow-lg bg-white md:scale-[1.03] z-10 relative h-full">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4A154B] text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md">
          Most Popular
        </div>
        {core()}
      </div>
    )
  } else {
    return <div className="h-full">{core()}</div>
  }
}

export default PricingPlan