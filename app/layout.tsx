import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { SessionProvider } from "@/components/sessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/utils/authOptions";
import Footer from "@/components/ui/footer";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Slack Reserver - Book Rooms & Resources Directly in Slack',
  description: 'Simplify workspace management with Slack Reserver. Book meeting rooms, equipment, and resources directly in Slack. Eliminate double-bookings and automate notifications.',
  keywords: 'slack integration, room booking, resource management, meeting scheduler, slack app, workspace management, slack',
  openGraph: {
    title: 'Slack Reserver - Book Rooms & Resources Directly in Slack',
    description: 'Simplify workspace management with Slack Reserver. Book meeting rooms, equipment, and resources directly in Slack. Eliminate double-bookings and automate notifications.',
    url: process.env.SITE_URL,
    siteName: 'Slack Reserver',
    images: [
      {
        url: '/images/slack-reserver-og.png', // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: 'Slack Reserver - Workspace Resource Management',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: process.env.SITE_URL,
    languages: {
      'en': process.env.SITE_URL,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Slack Reserver",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A Slack integration that allows teams to book meeting rooms, equipment, and other shared resources directly within Slack.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/OnlineOnly"
  },
  "featureList": "Room booking, Resource management, Automated notifications, Custom resource groups, Custom resources",
  "screenshot": `${process.env.SITE_URL}/images/prints_reserver/Modal_reservation.png`,
  "softwareHelp": {
    "@type": "WebContent",
    "url": `${process.env.SITE_URL}/support`
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah T."
      },
      "reviewBody": "After implementing Slack Reserver, we reduced meeting setup time by 30%. No more double-bookings or confusion about room availability."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "David K."
      },
      "reviewBody": "After migrating from a web app to Slack, utilization jumped from 20% to nearly 90%. Almost every meeting is now properly scheduled."
    }
  ]
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions as any);

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-auto antialiased bg-white`}>
        <Script
          id="slack-reserver-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
