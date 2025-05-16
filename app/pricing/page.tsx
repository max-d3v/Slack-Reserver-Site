import { getPlanFeatures, getPlans } from "@/lib/stripe/stripeServices";
import { JsonObject } from "next-auth/adapters";
import { Suspense } from "react";
import Stripe from "stripe";
import PricingPlans from "@/components/ui/pricingPlans";


export type PriceWithFeatures = Stripe.Price & {
    features: null | JsonObject;
} 

const Page = async () => {
    const stripePricingPlans = await getPlanFeatures(await getPlans());

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

                <Suspense><PricingPlans pricingPlans={stripePricingPlans} ></PricingPlans></Suspense>
            </div>
        </main>
    )
};

export default Page;