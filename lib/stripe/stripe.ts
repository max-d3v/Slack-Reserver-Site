import Stripe from "stripe";
import { inspect } from "util";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

await stripe.billingPortal.configurations.create({
  features: {
    invoice_history: {
      enabled: true,
    },
  },
});

export const getPlans = async () => {
  const plans = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  });

  console.log(inspect(plans, { depth: null }))

  return plans.data
}

export function isStripeProduct(product: any): product is Stripe.Product {
  return product &&
    typeof product === 'object' &&
    'id' in product &&
    'name' in product &&
    typeof product.name === 'string';
}

export default stripe;