import Stripe from "stripe";

//Placeholder is only used in build time to avoid error raised.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "api_key_placeholder");

await stripe.billingPortal.configurations.create({
  features: {
    invoice_history: {
      enabled: true,
    },
  },
});


export default stripe;