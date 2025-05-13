import PricingPlans from "@/components/ui/pricingPlans";
import { Metadata } from "next";
import Head from 'next/head';
import Script from "next/script";

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


export type PricingPlansType = {
    [key: string]: {
        monthly: {
            price: number;
            productId: string;
        };
        annual: {
            price: number;
            productId: string;
        };
    };
}

const getPricingPlans = async (): Promise<PricingPlansType> => {
    //Manual for now
    let pricingPlans: any = {}
    return pricingPlans = {
        team: {
            monthly: {
                price: 6,
                productId: "prod_S4P7FrJrgZvJwG"
            },
            annual: {
                price: 60, // $5/month when paid annually (2 months free)
                productId: "prod_annual_team"
            },
        },
        company: {
            monthly: {
                price: 12,
                productId: "prod_S4iuAaDkOrW6jx"
            },
            annual: {
                price: 120, // $10/month when paid annually (2 months free)
                productId: "prod_annual_company"
            },
        },
        free: {
            monthly: {
                price: 0,
                productId: "123"
            },
            annual: {
                price: 0, // 
                productId: "123"
            },
        }
    };
}



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
                    "description": "Up to 5 reservations per month, one resource group, up to 3 resources"
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
                    "description": "Up to 50 reservations per month, up to 5 resource groups, up to 20 resources (total), email notifications"
                }
            },
            {
                "@type": "Offer",
                "name": "Team Plan (Annual)",
                "description": "For small teams that want to reserve a limited amount of rooms",
                "price": "60",
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
                    "description": "Up to 50 reservations per month, up to 5 resource groups, up to 20 resources (total), email notifications"
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
                    "description": "Up to 250 reservations per month, up to 25 resource groups, up to 100 resources, email notifications, daily personal reservations and usage info"
                }
            },
            {
                "@type": "Offer",
                "name": "Company Plan (Annual)",
                "description": "Transform your workspace with comprehensive resource management",
                "price": "120",
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
                    "description": "Up to 250 reservations per month, up to 25 resource groups, up to 100 resources, email notifications, daily personal reservations and usage info"
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

    const pricingPlans = await getPricingPlans();

    return (
        <>
            <Script
                id="roadmap-jsonld"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
            />
            <PricingPlans pricingPlans={pricingPlans} ></PricingPlans>
        </>
    )
};

export default Page;