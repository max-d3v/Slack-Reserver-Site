import Stripe from "stripe";
import stripe from "./stripe"
import { ValidPlanFeatures } from "../utils/functions";
import logger from "../utils/logger";
import * as utils from "../utils/functions";

class StripeServices {
    async getPrices() {
        const plans = await stripe.prices.list({
            active: true,
            expand: ['data.product'],
        });
        const { data } = plans;

        console.log(data);
        return data
    }


    async getProducts() {
        const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price'],
        });
        const { data } = products;
        return data;
    }

    async updateProductFeatures(productId: string, features: ValidPlanFeatures) {
        try {
            return await stripe.products.update(productId, { metadata: features });
        } catch (error: any) {
            logger.error('stripe', 'Error updating product features', {
                error: error.message,
                productId,
                features
            });
            throw new Error(`Failed to update product features: ${error.message}`);
        }
    }

    /* Deprecated - Moved all plan logic to stripe
    async getPlanFeatures(plans: Stripe.Price[]): Promise<PriceWithFeatures[]> {
        const dbPlans = await prisma.plans.findMany();

        return plans.map(plan => {
            const { product } = plan;
            if (!isStripeProduct(product)) {
                console.error("Invalid Stripe product:", plan.product);
                return {
                    ...plan,
                    features: null
                } as PriceWithFeatures;
            }
            const dbPlan = dbPlans.find(dbPlan => dbPlan.stripe_product_id === product.id);
            return {
                ...plan,
                features: dbPlan?.features || null
            } as PriceWithFeatures;
        });
    }
    */
   
    async updateProductMetadata(productId: string, metadata: Stripe.MetadataParam): Promise<Stripe.Product> {
        try {
            const validProductMetadata = utils.validPlanFeatures(metadata);
            if (!validProductMetadata) {
                throw new Error('Invalid product metadata');
            }

            const product = await stripe.products.update(productId, { metadata });

            logger.info('stripe', 'Product metadata updated successfully', {
                productId,
                metadata
            });
            return product;
        } catch (error: any) {
            logger.error('stripe', 'Error updating product metadata', {
                error: error.message,
                productId,
                metadata
            });
            throw new Error(`Failed to update product metadata: ${error.message}`);
            
        }
    }

}

const stripeServices = new StripeServices();
export default stripeServices;