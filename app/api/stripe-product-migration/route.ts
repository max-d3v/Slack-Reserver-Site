// API endpoint to migrate products to db
import { getProducts } from "@/lib/stripe/stripeServices";
import prisma from "@/lib/db/db";

export async function GET() {
    try {
        const products = await getProducts();

        for (const product of products) {
            const planObject = {
                stripe_product_id: product.id,
            }

            const result = await prisma.plans.upsert({
                where: { stripe_product_id: product.id },
                update: planObject,
                create: planObject
            });

            console.log(`Product ${product.id} migrated successfully:`, result);
        }


        return new Response(JSON.stringify({ message: "Products migrated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error migrating products:", error);
        return new Response(JSON.stringify({ error: "Failed to migrate products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}