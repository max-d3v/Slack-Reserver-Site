import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Slack Reserver Roadmap - Upcoming Features and Development Timeline',
  description: 'Explore Slack Reserver\'s development roadmap. See what features we\'re working on, what\'s coming next, and our long-term plans to enhance your workspace management experience.',
  keywords: 'slack reserver roadmap, upcoming features, slack app development, resource management features, meeting room booking updates',
  openGraph: {
    title: 'Slack Reserver Roadmap - Our Development Plan',
    description: 'See what\'s in the pipeline for Slack Reserver - from quick booking features to calendar integrations. Follow our development journey and submit your feature requests.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap`,
    siteName: 'Slack Reserver',
    images: [
      {
        url: '/images/slack-reserver-roadmap-og.png',
        width: 1200,
        height: 630,
        alt: 'Slack Reserver Feature Roadmap',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap`,
    languages: {
      'en': `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap`,
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

//Dont need to keep this super in sync.
const roadmapJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Slack Reserver Product Roadmap",
    "description": "The development roadmap for Slack Reserver, showing in-progress, upcoming, and planned features.",
    "publisher": {
      "@type": "Organization",
      "name": "Slack Reserver",
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/slack-reserver-logo.png`
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Quick Book",
          "description": "One-day reservations with simplified resource selection. Search resources by name for faster booking process.",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap#quick-book`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Meeting Feedback System",
          "description": "Post-meeting feedback collection from organizers. Automatic sharing of meeting summaries with all participants.",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap#meeting-feedback`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Confirm attendance",
          "description": "Support for confirming participation in meetings. Automatic reminders for participants to confirm their attendance.",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap#confirm-attendance`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Google Calendar Integration",
          "description": "Seamless synchronization with Google Calendar. Import and export reservations between Slack Reserver and Google Calendar.",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/roadmap#google-calendar`
        }
      ]
    }
  };

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Script
                id="roadmap-jsonld"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapJsonLd) }}
            />
            {children}
        </>
    )
}