import { Navbar } from "@/components/ui/navbar";
import BlurText from "@/components/ui/BlurText/BlurText";
import CountUp from "@/components/ui/CountUp/CountUp";
import { VideoDemo } from "@/components/ui/videoDemo";
import RotatingText from "@/components/ui/RotatingText/RotatingText";
import { SlackButton } from "@/components/ui/slackButton";
export default function Home() {


  return (
    <main className="min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20 pt-[15vh] md:pt-[25vh] md:pb-20 h-[95  vh]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-14 flex flex-wrap justify-center items-end text-gray-700">
            <span className="inline-flex items-end">
              <BlurText
                text="/reserve"
                delay={350}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-7xl font-bold inline-block mr-2 text-[#4A154B]"
              />
            </span>
            <span className="inline-block ml-2">directly in your slack</span>
          </h1>
          <p className="text-xl md:text-1xl text-gray-600 text-bold ">Always fighting for rooms?, make things simple with reservations right in your slack.</p>
          <p className="text-xl md:text-1xl text-gray-600 text-bold mb-36">Stop entering rooms nose first to find people already there</p>
          <SlackButton />

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

      {/* Video Demo Section */}
      <section className="bg-white py-16 md:py-24">
        <div className=" mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600 mb-2">Watch reserver in action</p>
            <h2 className="text-5xl md:text-6xl text-gray-700 font-bold">How does it work?</h2>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <VideoDemo></VideoDemo>
            </div>
          </div>

          {/* Testimonials */}
          <div className="w-5/6 grid grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl text-gray-700 font-bold mb-2">Lovely Experience</h3>
              <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
              <p className="mt-3 text-gray-600">"This tool saved us so much time!"</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl text-gray-700 font-bold mb-2">Game Changer</h3>
              <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ☆</div>
              <p className="mt-3 text-gray-600">"No more booking conflicts!"</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl text-gray-700 font-bold mb-2">Super Awesome</h3>
              <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
              <p className="mt-3 text-gray-600">"We use it every day now."</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl text-gray-700 font-bold mb-2">Super Awesome</h3>
              <div className="text-amber-400 tracking-wider">★ ★ ★ ★ ★</div>
              <p className="mt-3 text-gray-600">"We use it every day now."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-24"
        style={{
          //Noise implementacion!
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
                <p>Customize your workspace: From meeting rooms</p>
                <p>to ping pong tables, add any resource group your team shares.</p>
                <p>Start with meeting rooms and expand to fit your</p>
                <p>company's unique needs.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Feature Image</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Feature Image</span>
            </div>
            <div className="md:w-1/2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Invite</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Collaborate effortlessly -</h3>
                <h3 className="text-2xl font-bold text-gray-700">invite your team members with a single click!</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Seamless team coordination:  when creating a reservation</p>
                <p>Invite participants easily with few clicks and </p>
                <p>let our smart notifications handle the rest.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="md:w-1/2">
              <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Manage states</p>
              <div className="space-y-0 leading-tight mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Room Under Maintenance?</h3>
                <h3 className="text-2xl font-bold text-gray-700">Project War Room?</h3>
                <h3 className="text-2xl font-bold text-gray-700">Keep Everyone Informed!</h3>
              </div>

              <div className="text-lg text-gray-600" >
                <p>Block rooms instantly with clear status updates</p>
                <p>and custom descriptions. From maintenance periods</p>
                <p>to dedicated project spaces, keep your team informed</p>
                <p>of any resource's availability.</p>
              </div>
            </div>
            <div className="md:w-1/2 w-2/3 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Feature Image</span>
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 text-gray-700">
            <p className="font-bold text-[#4A154B] text-sm uppercase tracking-wider mb-1">Boost your workspace's organisation</p>
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
          <SlackButton />
        </div>
      </section>
    </main>
  );
}