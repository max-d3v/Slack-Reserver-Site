import BlurText from "@/components/ui/BlurText/BlurText";
import CountUp from "@/components/ui/CountUp/CountUp";
import { VideoDemo } from "@/components/ui/videoDemo";
import RotatingText from "@/components/ui/RotatingText/RotatingText";
import { SlackButton } from "@/components/ui/slackButton";
import Image from 'next/image'
import { Metadata } from "next";
import Script from "next/script";

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


export default function Home() {
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
    "featureList": "Room booking, Resource management, Automated notifications, Custom resource groups",
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


  return (
    <main className="min-h-[95hv] w-full">
      <Script
        id="slack-reserver-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-white py-16 pt-[12vh] md:pt-[22vh] md:pb-10 mb-2 mt-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-14 flex flex-wrap justify-center items-end text-gray-700">
            <span className="inline-flex items-end">
              <BlurText
                text="/reserver"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl font-bold inline-block mr-2 text-[#4A154B]"
              />
            </span>
            <span className="inline-block ml-2">directly in your slack</span>
          </h1>
          <p className="text-xl md:text-1xl text-gray-600 text-bold ">Always fighting for rooms?, make things simple with reservations right in your slack.</p>
          <p className="text-xl md:text-1xl text-gray-600 text-bold mb-36">Stop entering rooms nose first to find people already there</p>
          <SlackButton className="mb-12" />

          <div className="flex flex-col items-center justify-center space-x-1 text-amber-400">
            <span className="text-3xl" >★★★★★</span>
            <span className="text-gray-600 text-lg ml-2">Trusted by <CountUp
              from={0}
              to={500}
              separator=","
              direction="up"
              duration={8}
              className="count-up-text"
            />+ teams</span>
          </div>
        </div>
      </section>


      <section className="bg-white py-12 md:pb-24">
        <div className=" ">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600 mb-2">Watch reserver in action</p>
            <h2 className="text-5xl md:text-6xl text-gray-700 font-bold">How does it work?</h2>
          </div>

          <div className="max-w-6xl px-4 md:px-6 mx-auto mb-16">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <VideoDemo></VideoDemo>
            </div>
          </div>

          {/* Testimonials */}
          <div className="w-full mb-12 mt-4">
            <div className="overflow-hidden relative">
              <div className="flex animate-marquee gap-8">
                <div className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-lg shadow-sm min-w-[200px]">
                  <span className="text-gray-500 font-medium">★ Reviews ★</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Real Time-Saver</h3>
                  <p className="text-sm text-gray-500 mb-1">Sarah T. - Office Manager at Brightline</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"After implementing Slack Reserver, we reduced meeting setup time by 30%. No more double-bookings or confusion about room availability."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Streamlined Our Process</h3>
                  <p className="text-sm text-gray-500 mb-1">Mike L. - Engineering Team Lead</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ☆</div>
                  <p className="mt-3 text-gray-600">"Our standups run more smoothly now that everyone knows exactly which room is available. Would love calendar sync in the next update."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Perfect Integration</h3>
                  <p className="text-sm text-gray-500 mb-1">Alex W. - Product Manager at Cortex</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"We've been using it daily for 3 months now. The Slack commands are intuitive and the whole team adopted it without any training."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Highly Recommend</h3>
                  <p className="text-sm text-gray-500 mb-1">Jamie R. - HR Director</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"We manage 12 conference rooms across 3 floors with this tool. The status updates and notification features alone are worth the subscription."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Game Changer</h3>
                  <p className="text-sm text-gray-500 mb-1">David K. - CTO at Nimbus</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"After migrating from a web app to Slack, utilization jumped from 20% to nearly 90%. Almost every meeting is now properly scheduled."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">No More Conflicts</h3>
                  <p className="text-sm text-gray-500 mb-1">Priya M. - Operations Director</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"Room double-booking disputes have completely disappeared. The notifications ensure everyone knows exactly where they need to be."</p>
                </div>
                <div className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-lg shadow-sm min-w-[200px]">
                  <span className="text-gray-500 font-medium">★ Reviews ★</span>
                </div>
                {/* Duplicate the first set exactly for smooth infinite scrolling */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Real Time-Saver</h3>
                  <p className="text-sm text-gray-500 mb-1">Sarah T. - Office Manager at Brightline</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"After implementing Slack Reserver, we reduced meeting setup time by 30%. No more double-bookings or confusion about room availability."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Streamlined Our Process</h3>
                  <p className="text-sm text-gray-500 mb-1">Mike L. - Engineering Team Lead</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ☆</div>
                  <p className="mt-3 text-gray-600">"Our standups run more smoothly now that everyone knows exactly which room is available. Would love calendar sync in the next update."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Smooth Integration</h3>
                  <p className="text-sm text-gray-500 mb-1">Alex W. - Product Manager at Cortex</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"We've been using it daily for 3 months now. The Slack commands are intuitive and the whole team adopted it without any training."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Highly Recommend</h3>
                  <p className="text-sm text-gray-500 mb-1">Jamie R. - HR Director</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"We manage 12 conference rooms across 3 floors with this tool. The status updates and notification features alone are worth the subscription."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">Game Changer</h3>
                  <p className="text-sm text-gray-500 mb-1">David K. - CTO at Nimbus</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"After migrating from a web app to Slack, utilization jumped from 20% to nearly 90%. Almost every meeting is now properly scheduled."</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[360px]">
                  <h3 className="text-xl text-gray-700 font-bold mb-2">No More Conflicts</h3>
                  <p className="text-sm text-gray-500 mb-1">Priya M. - Operations Director</p>
                  <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
                  <p className="mt-3 text-gray-600">"Room double-booking disputes have completely disappeared. The notifications ensure everyone knows exactly where they need to be."</p>
                </div>
                <div className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-lg shadow-sm min-w-[200px]">
                  <span className="text-gray-500 font-medium">★ Reviews ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-24"
        style={{
          //Noise implementacione mi amigooo!
          background: `#f3f3f3 url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          borderTop: "1px solid #e5e5e5",
          borderBottom: "1px solid #e5e5e5",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.03)"
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-700">Key Features</h2>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Make it yours</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Manage all your shared resources</h3>
                <h3 className="text-2xl font-bold text-gray-700">in one place</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Customize your workspace with any resources your team shares - from</p>
                <p>meeting rooms to ping pong tables and beyond. Start with essential</p>
                <p>spaces and expand as your organization grows, creating a reservation</p>
                <p>system perfectly tailored to your company's unique needs.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/images/prints_reserver/Resource_groups-branco.png"
                width={860}
                height={700}
                alt="Picture of resource groups"
                className="w-full object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <Image
                src="/images/prints_reserver/Modal_reservation.png"
                width={400}
                height={300}
                alt="Picture of new reservation modal"
                className="w-full h-full object-cover rounded-md"
                priority
              />
            </div>
            <div className="md:w-1/2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Reserve.</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Project War Room?</h3>
                <h3 className="text-2xl font-bold text-gray-700">Important client meeting?</h3>
                <h3 className="text-2xl font-bold text-gray-700">No time to ask which rooms are available?</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Our seamless reservation system handles all your booking needs.</p>
                <p>Invite team members, set custom room statuses, schedule for hours</p>
                <p>or days, and personalize with creative titles - all without leaving</p>
                <p>Slack. Simple commands, powerful results, zero confusion.</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Late no more!</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Stop having people show up late -</h3>
                <h3 className="text-2xl font-bold text-gray-700">Have your coworkers notified!</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Our intelligent notification system keeps everyone on schedule,</p>
                <p>sending automatic alerts when meetings are created, shortly before</p>
                <p>they begin, and right at start time. No more waiting for latecomers</p>
                <p>or forgotten appointments - just punctual, productive meetings.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <Image
                src="/images/prints_reserver/Notification_message.png"
                width={400}
                height={300}
                alt="Picture of notification message"
                className="w-full h-full object-cover rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Boost your workspace's organisation</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 text-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start reserving</h2>
            <RotatingText
              texts={['Rooms', 'Offices', 'Equipment', 'Everything!']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-[#4A154B] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg text-3xl md:text-4xl font-bold"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            <h2 className="text-3xl md:text-4xl font-bold">?</h2>
          </div>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join hundreds of teams who have eliminated booking confusion with our Slack integration.</p>
          <SlackButton className="mb-12" />
        </div>
      </section>
    </main>
  );
}