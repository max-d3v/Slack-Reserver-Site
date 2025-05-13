import { Calendar, MessageCircle, Check, Clock } from "lucide-react";
import Roadmap from "@/components/ui/roadmapFeatures";
import Script from "next/script";
import { Metadata } from "next";
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Slack Reserver Roadmap - Upcoming Features and Development Timeline',
  description: 'Explore Slack Reserver\'s development roadmap. See what features we\'re working on, what\'s coming next, and our long-term plans to enhance your workspace management experience.',
  keywords: 'slack reserver roadmap, upcoming features, slack app development, resource management features, meeting room booking updates',
  openGraph: {
    title: 'Slack Reserver Roadmap - Our Development Plan',
    description: 'See what\'s in the pipeline for Slack Reserver - from quick booking features to calendar integrations. Follow our development journey and submit your feature requests.',
    url: `${process.env.SITE_URL}/roadmap`,
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
    canonical: `${process.env.SITE_URL}/roadmap`,
    languages: {
      'en': `${process.env.SITE_URL}/roadmap`,
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

// Time estimation constants
const TIME_ESTIMATE = {
  SHORT: "1-2 weeks",
  MEDIUM: "1-2 months",
  LONG: "2-3 months",
};

export default function Page() {
  const roadmapJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Slack Reserver Product Roadmap",
    "description": "The development roadmap for Slack Reserver, showing in-progress, upcoming, and planned features.",
    "publisher": {
      "@type": "Organization",
      "name": "Slack Reserver",
      "logo": `${process.env.SITE_URL}/images/slack-reserver-logo.png`
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Quick Book",
          "description": "One-day reservations with simplified resource selection. Search resources by name for faster booking process.",
          "url": `${process.env.SITE_URL}/roadmap#quick-book`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Meeting Feedback System",
          "description": "Post-meeting feedback collection from organizers. Automatic sharing of meeting summaries with all participants.",
          "url": `${process.env.SITE_URL}/roadmap#meeting-feedback`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Confirm attendance",
          "description": "Support for confirming participation in meetings. Automatic reminders for participants to confirm their attendance.",
          "url": `${process.env.SITE_URL}/roadmap#confirm-attendance`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Google Calendar Integration",
          "description": "Seamless synchronization with Google Calendar. Import and export reservations between Slack Reserver and Google Calendar.",
          "url": `${process.env.SITE_URL}/roadmap#google-calendar`
        }
      ]
    }
  };


  const roadmapItems = [
    {
      id: 1,
      title: "Quick Book",
      description: "One-day reservations with simplified resource selection. Search resources by name for faster booking process.",
      status: "in-progress",
      timeEstimate: TIME_ESTIMATE.SHORT,
      icon: <Clock className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      id: 2,
      title: "Meeting Feedback System",
      description: "Post-meeting feedback collection from organizers. Automatic sharing of meeting summaries with all participants.",
      status: "upcoming",
      timeEstimate: TIME_ESTIMATE.MEDIUM,
      icon: <MessageCircle className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      id: 3,
      title: "Confirm attendance",
      description: "Support for confirming participation in meetings. Automatic reminders for participants to confirm their attendance.",
      status: "upcoming",
      timeEstimate: TIME_ESTIMATE.SHORT,
      icon: <Check className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      id: 4,
      title: "Google Calendar Integration",
      description: "Seamless synchronization with Google Calendar. Import and export reservations between Slack Reserver and Google Calendar.",
      status: "planned",
      timeEstimate: TIME_ESTIMATE.LONG,
      icon: <Calendar className="h-10 w-10 text-[#4A154B]" />,
    },
  ];

  return (
    <>
      <Script
        id="roadmap-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapJsonLd) }}
      />
      <div className="bg-white">
        <div className="container py-12 md:py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Reserver Roadmap</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey ahead: discover upcoming features and improvements we're working on to make Slack Reserver even better for your team.
            </p>
          </div>

          <Roadmap roadmapItems={roadmapItems}></Roadmap>

        </div>
      </div>
    </>
  );
}