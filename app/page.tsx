import { NextVideo } from "@/components/ui/videoDemo";
import { SlackButton } from "@/components/ui/slackButton";

import BlurText from "@/components/ui/BlurText/BlurText";
import CountUp from "@/components/ui/CountUp/CountUp";
import RotatingText from "@/components/ui/RotatingText/RotatingText";
import Image from 'next/image'
import NotificationWrapper from "@/components/notificationWrapper";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { success, error } = (await searchParams);


  return (
    <main className="min-h-[95hv] w-full">
      <section className="bg-white py-16 pt-[12vh] md:pt-[22vh] md:pb-10 mb-2 mt-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1" >Reservations directly in your slack</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-14 flex flex-wrap justify-center items-end text-gray-700">
            <span className="inline-flex items-end">
              <BlurText
                text="/reserve"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl font-bold inline-block mr-2 text-[#4A154B]"
              />
              <NotificationWrapper success={success as string | undefined} error={error as string | undefined} />
            </span>
            <span className="inline-block ml-2">& Organize your workspace</span>
          </h1>
          <p className="text-xl leading-tight md:text-1xl text-gray-600  ">Always fighting for rooms?, make things simple with resource managment right in your slack.</p>
          <p className="text-xl leading-tight md:text-1xl  text-gray-600 text-bold mb-36">Stop entering rooms nose first to find people already there</p>
          <SlackButton className="mb-4" />

          <div className="flex flex-col items-center justify-center space-x-1 text-amber-400">
            <span className="text-xl">★★★★★</span>
            <span className="text-gray-600 text-lg ml-2">Trusted by <CountUp
              from={0}
              to={500}
              separator=","
              direction="up"
              duration={8}
              className="count-up-text font-semibold"
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
              <NextVideo src={"videos/slack_reserver_editado.mp4"} />
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
                  <p className="text-sm text-gray-500 mb-1">Sarah T. - Office Manager</p>
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
                  <p className="text-sm text-gray-500 mb-1">Alex W. - Product Manager</p>
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
                  <p className="text-sm text-gray-500 mb-1">David K. - CTO</p>
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
                  <p className="text-sm text-gray-500 mb-1">Sarah T. - Office Manager</p>
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
                  <p className="text-sm text-gray-500 mb-1">Alex W. - Product Manager</p>
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
                  <p className="text-sm text-gray-500 mb-1">David K. - CTO</p>
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
                <p>Customize your workspace with any resources your team shares - from meeting rooms to ping pong tables and beyond. Using our resource and resource group system, you can start with essential spaces and expand as your organization grows, creating a reservation system perfectly tailored to your company's unique needs.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-full max-w-md mx-auto">
              <div className="bg-gray-200 rounded-lg overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center justify-center">
                <Image
                  src="/images/features/resource_groups.png"
                  width={400}
                  height={300}
                  alt="Picture of resource groups"
                  className="w-full h-full object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2 w-full max-w-md mx-auto md:order-1">
              <div className="bg-gray-200 rounded-lg overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center justify-center">
                <Image
                  src="/images/features/home.png"
                  width={400}
                  height={300}
                  alt="Picture of new reservation modal"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:w-1/2 md:order-2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Reserve.</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Project War Room?</h3>
                <h3 className="text-2xl font-bold text-gray-700">Important client meeting?</h3>
                <h3 className="text-2xl font-bold text-gray-700">No time to ask which rooms are available?</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Our seamless reservation system handles all your booking needs. Invite team members, set custom room statuses, schedule for hours or days, and personalize with creative titles - all without leaving Slack. Simple commands, powerful results, zero confusion.</p>
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
                <p>Our intelligent notification system keeps everyone on schedule, sending automatic alerts when meetings are created, shortly before they begin, and right at start time. No more waiting for latecomers or forgotten appointments - just punctual, productive meetings.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-full max-w-sm mx-auto">
              <div className="bg-gray-200 rounded-lg overflow-hidden  flex items-center justify-center">
                <Image
                  src="/images/features/notification.png"
                  width={400}
                  height={300}
                  alt="Picture of notification message"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-16 md:pt-24 pb-10 md:pb-18 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">The difference is clear</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">Why Slack beats traditional booking</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Teams using Slack-based reservations see 10x higher adherence rates compared to web portals and email systems</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">Traditional Booking</h3>
                <p className="text-red-600">Web portals, email chains, shared calendars</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-red-700">Low adherence rate</p>
                    <p className="text-sm text-red-600">People forget to check separate systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-red-700">5+ clicks to book</p>
                    <p className="text-sm text-red-600">Reserving usage suffocated under tabs and scrolls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-red-700">Missed notifications</p>
                    <p className="text-sm text-red-600">Email alerts get buried or ignored</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-red-700">Context switching</p>
                    <p className="text-sm text-red-600">Disrupts workflow by leaving main work environment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slack Method */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Slack Reservations</h3>
                <p className="text-green-600">Native integration in your daily workflow</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-green-700">High adherence rate</p>
                    <p className="text-sm text-green-600">Instant visibility where teams already work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-green-700">1 command to book</p>
                    <p className="text-sm text-green-600">Simple `/reserve` command gets it done</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-green-700">Impossible to miss</p>
                    <p className="text-sm text-green-600">Notifications appear in active workspace</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-green-700">Zero context switching</p>
                    <p className="text-sm text-green-600">Book rooms while discussing the meeting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-gray-50 py-16 md:py-24 border-t border-gray-200 ">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Boost your workspace's organisation</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 text-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start reserving</h2>
            <RotatingText
              texts={['Meeting Rooms', 'Auditoriums', 'Equipment', 'Everything!']}
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

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Tired of people forgetting reservations, avoiding slow web forms, or missing important notifications because they don't check their emails? Make room booking effortless.</p>          <SlackButton className="mb-12" />
        </div>
      </section>
    </main>
  );
}