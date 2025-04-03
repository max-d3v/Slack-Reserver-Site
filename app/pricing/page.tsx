import { CalendarCheck } from 'lucide-react'
import React from 'react'

const Pricing = () => {
    return (
        <main className="min-h-screen w-full bg-gray-100"
            style={{
                //Noise implementacion!
                background: `#f3f3f3 url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.03)"
            }}>
            <div className='container mt-12 mx-auto px-4 py-16'>
                <div className='text-center max-w-3xl mx-auto mb-20'>
                    <h1 className="text-6xl text-gray-700 font-bold mb-4">Pricing</h1>
                    <p className="text-gray-600 text-lg">
                        Simple pricing for all use cases.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                    <div className="border rounded-lg bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:h-[90%] md:self-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Team</h2>
                            <p className="mt-2 text-gray-600">For small teams that want to reserve a limited amount of rooms</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">$10 <span className="text-gray-500 text-lg font-normal">/month</span></h1>
                            <div className="mt-2 inline-flex items-center">
                                <span className="text-sm font-medium text-green-600">✓ 7-day free trial</span>
                            </div>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4">
                                <button className="w-full py-3 px-4 bg-[#4A154B] text-white font-medium rounded-md hover:bg-[#3e1240] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-sm">
                                    Get Started
                                </button>
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-4 flex-grow text-gray-800">
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Room reservation</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 15 reservations per month</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-[#4A154B] rounded-xl p-8 shadow-lg bg-white md:scale-103 z-10 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4A154B] text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md">
                            Most Popular
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Company</h2>
                            <p className="mt-2 text-gray-600">Transform your workspace to be more professional</p>
                            <p className="text-gray-600">No more excel sheets and one sided reservations</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">$20 <span className="text-gray-500 text-lg font-normal">/month</span></h1>
                            <div className="mt-2 inline-flex items-center">
                                <span className="text-sm font-medium text-green-600">✓ 7-day free trial</span>
                            </div>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4">
                                <a href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fexample.com&amp;client_id=8320946706706.8320960407410">
                                <button className="w-full py-3 px-4 bg-[#4A154B] text-white font-medium rounded-md hover:bg-[#3e1240] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-sm">
                                    Get Started
                                </button>
                                </a>
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-3 flex-grow text-gray-800">
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Room reservation</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Up to 100 reservations per month</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Unlimited resource types</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Email notifications</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Daily reservations and usage info</p>
                            </div>
                        </div>
                    </div>

                    <div className="border bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:h-[90%] md:self-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Enterprise</h2>
                            <p className="mt-2 text-gray-600">For custom inquiries.</p>
                            <h1 className="text-3xl font-bold mt-4 text-gray-800">Custom</h1>
                        </div>
                        <div className="mt-8 -mx-8">
                            <div className="px-8 py-2 border-t border-gray-200"></div>
                            <div className="px-8 py-4">
                                <button className="w-full py-3 px-4 bg-white text-[#4A154B] border border-[#4A154B] font-medium rounded-md hover:bg-[#f9f5f9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-opacity-50 shadow-sm">
                                    Contact Us
                                </button>
                            </div>
                            <div className="px-8 py-2 border-b border-gray-200"></div>
                        </div>
                        <div className="mt-6 space-y-4 flex-grow text-gray-800">
                            <div className="flex items-center ">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Everything from Company</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Custom requests</p>
                            </div>
                            <div className="flex items-center">
                                <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
                                <p>Dedicated support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Pricing