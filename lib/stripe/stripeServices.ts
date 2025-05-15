'use server'

import Stripe from "stripe";
import stripe from "./stripe"
import prisma from "../db/db";
import { isStripeProduct } from "../utils/functions";
import { PriceWithFeatures } from "@/app/pricing/page";

export const getPlans = async () => {
    const plans = await stripe.prices.list({
        active: true,
        expand: ['data.product'],
    });
    const { data } = plans;
    return data
}

export const getProducts = async () => {
    const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
    });
    const { data } = products;
    return data;
}

export async function getPlanFeatures(plans: Stripe.Price[]): Promise<PriceWithFeatures[]> {
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