import stripeServices from "@/lib/stripe/stripeServices";

//prod_SJOG024YLTJpPS - company
//prod_SJOH1c19o09YuE - company

//prod_SJjAP6Bv68EESW - enterprise
//prod_SJjBEEIWmAluSy - enterprise

//prod_SJjCcg00HJWAlo - free

export async function GET(request: Request) {
    try {
        const enterpriseFeatures = { "resources": -1, "reservations": 1000, "resource_groups": 100 }
        const freeFeatures = {"resources": 10, "reservations": 30, "resource_groups": 3}
        const companyFeatures = {"resources": 180, "reservations": 360, "resource_groups": 50}

        const success = [];
        const errors: any[] = [];
        const products = [
            { id: "prod_SJOG024YLTJpPS", features: companyFeatures },
            { id: "prod_SJOH1c19o09YuE", features: companyFeatures },
            { id: "prod_SJjAP6Bv68EESW", features: enterpriseFeatures },
            { id: "prod_SJjBEEIWmAluSy", features: enterpriseFeatures },
            { id: "prod_SJjCcg00HJWAlo", features: freeFeatures }
        ];

        for (const product of products) {
            try {
                const updatedProduct = await stripeServices.updateProductMetadata(product.id, product.features);
                success.push(updatedProduct);
            } catch (error: any) {
                console.error('Error updating product:', error);
                errors.push({ id: product.id, error: error.message });
            }
        }


        return new Response(JSON.stringify({ success, errors }), { status: 200 });
    } catch (error: any) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: error.status ?? 500 });
    }
}