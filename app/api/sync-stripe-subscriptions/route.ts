/*
TODO: Make failsafe cron job to update subscriptions for failed stripe webhook actions.


import prisma from "@/lib/db/db";
import logger from "@/lib/utils/logger";
import { getSubscription } from "@/lib/stripe/stripeServices";
import stripe from "@/lib/stripe/stripe";

export async function GET() {
    try {
        const loggerTitle = 'stripe-subscription-sync';
        logger.info(loggerTitle, `Starting process`);

        const tenants = await prisma.tenants.findMany({
            where: {
                status: "active",
                tenant_subscriptions.length == 0
            },
            include: {
                users: {
                    select: {
                        stripe_customer_id: true
                    }
                },
                tenant_subscriptions: true
            }
        });

        logger.info(loggerTitle, `Found ${tenants.length} active tenants`);

        const errorTenants: any[] = [];
        const successTenants: any[] = [];

        for (const tenant of tenants) {
            try {
                const { users } = tenant;
                if (users.length === 0) {
                    throw new Error(`No users found for tenant ${tenant.id}, skipping...`);
                }
                const stripeCustomerId = users[0].stripe_customer_id;
                if (!stripeCustomerId) {
                    throw new Error(`No stripe customer ID found for tenant ${tenant.id}, skipping...`);
                }

                logger.info(loggerTitle, `Syncing subscriptions for tenant ${tenant.id} with stripe customer ID ${stripeCustomerId}`);
                const subscription = await getSubscription(stripeCustomerId);
                if (!subscription) {
                    throw new Error(`No active subscription found for tenant ${tenant.id}, skipping...`);
                }
                
                const {plan} = subscription as any;

                const subscriptionDbObject = {
                    tenant_id: tenant.id,
                    plan_id: plan.id,
                    stripe_subscription_id: subscription.id,
                }
                
                await prisma.tenant_subscriptions.upsert({
                    where: {
                        tenant_id: tenant.id
                    },
                    update: subscriptionDbObject,
                    create: subscriptionDbObject
                })


            } catch (error: any) {
                logger.error(loggerTitle, `Error syncing tenant ${tenant.id}: ${error.message}`, { error });
                errorTenants.push({
                    tenantId: tenant.id,
                    error: error.message
                });
                continue;
            }
        }

        


    } catch (error: any) {
        console.error("Error migrating products:", error);
        return new Response(JSON.stringify({ error: "Failed to sync stripe subscriptions with db" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

    }
}
    */