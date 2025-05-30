import Stripe from "stripe";

console.log(process.env);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

await stripe.billingPortal.configurations.create({
  features: {
    invoice_history: {
      enabled: true,
    },
  },
});


export default stripe;