import { Metadata } from "next";
import Script from "next/script";
import PricingPlans from "@/components/ui/pricingPlans";
import { getPlanFeatures, getPlans } from "@/lib/stripe/stripeServices";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Pricing - Simple Plans for Teams of All Sizes',
    description: 'Choose the perfect plan for your workspace - from free options for small teams to full-featured company plans. Book rooms and resources in Slack with plans starting at $0/month.',
    keywords: 'slack reserver pricing, slack app pricing, room booking plans, resource management pricing, slack integration cost',
    openGraph: {
        title: 'Slack Reserver Pricing - Simple, Transparent Plans',
        description: 'From free to company-wide solutions, find the perfect Slack resource booking plan for your team. Includes 14-day free trial on paid plans.',
        url: `${process.env.SITE_URL}/pricing`,
        siteName: 'Slack Reserver',
        images: [
            {
                url: '/images/slack-reserver-pricing-og.png',
                width: 1200,
                height: 630,
                alt: 'Slack Reserver Pricing Plans',
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Slack Reserver Pricing Plans',
        description: 'Choose the perfect resource booking plan for your Slack workspace',
        images: ['/images/slack-reserver-pricing-og.png'],
    },
    alternates: {
        canonical: `${process.env.SITE_URL}/pricing`,
        languages: {
            'en': `${process.env.SITE_URL}/pricing`,
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};


const Page = async () => {
    const pricingJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Slack Reserver",
        "description": "Book meeting rooms, equipment, and other shared resources directly within Slack.",
        "offers": [
            {
                "@type": "Offer",
                "name": "Free Plan",
                "description": "Perfect for small offices with minimal scheduling needs",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#free`,
                "priceValidUntil": "2025-12-31",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Free Slack Reserver Plan",
                    "description": "Up to 30 reservations per month, up to 3 resource groups, up to 10 resources"
                }
            },
            {
                "@type": "Offer",
                "name": "Team Plan (Monthly)",
                "description": "For small teams that want to reserve a limited amount of rooms",
                "price": "6",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#team-monthly`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Team Slack Reserver Plan (Monthly)",
                    "description": "Up to 120 reservations per month, up to 20 resource groups, up to 60 resources, email notifications"
                }
            },
            {
                "@type": "Offer",
                "name": "Team Plan (Annual)",
                "description": "For small teams that want to reserve a limited amount of rooms",
                "price": "40",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#team-annual`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Team Slack Reserver Plan (Annual)",
                    "description": "Up to 120 reservations per month, up to 20 resource groups, up to 60 resources, email notifications"
                }
            },
            {
                "@type": "Offer",
                "name": "Company Plan (Monthly)",
                "description": "Transform your workspace with comprehensive resource management",
                "price": "12",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#company-monthly`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Company Slack Reserver Plan (Monthly)",
                    "description": "Up to 360 reservations per month, up to 50 resource groups, up to 180 resources, email notifications, daily personal reservations and usage info"
                }
            },
            {
                "@type": "Offer",
                "name": "Company Plan (Annual)",
                "description": "Transform your workspace with comprehensive resource management",
                "price": "80",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#company-annual`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Company Slack Reserver Plan (Annual)",
                    "description": "Up to 360 reservations per month, up to 50 resource groups, up to 180 resources, email notifications, daily personal reservations and usage info"
                }
            },
            {
                "@type": "Offer",
                "name": "Enterprise Plan (Monthly)",
                "description": "For large organizations with extensive scheduling requirements",
                "price": "20",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#enterprise-monthly`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Enterprise Slack Reserver Plan (Monthly)",
                    "description": "Up to 1000 reservations per month, up to 100 resource groups, unlimited resources, priority support"
                }
            },
            {
                "@type": "Offer",
                "name": "Enterprise Plan (Annual)",
                "description": "For large organizations with extensive scheduling requirements",
                "price": "200",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${process.env.SITE_URL}/pricing#enterprise-annual`,
                "priceValidUntil": "2025-12-31",
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 14,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": "Enterprise Slack Reserver Plan (Annual)",
                    "description": "Up to 1000 reservations per month, up to 100 resource groups, unlimited resources, priority support"
                }
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "156"
        }
    };

    const stripePricingPlans = await getPlanFeatures(await getPlans());

    


    return (
        <>
            <Script
                id="roadmap-jsonld"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
            />
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
        </>
    )
};

export default Page;