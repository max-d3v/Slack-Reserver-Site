import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");

if (process.env.STRIPE_SECRET_KEY) {
  try {
    await stripe.billingPortal.configurations.create({
      features: {
        invoice_history: {
          enabled: true,
        },
      },
    });
  } catch {
    // Billing portal config is best-effort; ignore failures so the module
    // still loads when Stripe is misconfigured or unreachable.
  }
}

export default stripe;