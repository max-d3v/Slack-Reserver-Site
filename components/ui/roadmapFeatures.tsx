"use client"

import { ArrowRight, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Roadmap = ({ roadmapItems }: { roadmapItems: any[] }) => {
    const [activeTab, setActiveTab] = useState("all");
    const router = useRouter();

    const filteredItems = roadmapItems.filter((item) => {
        if (activeTab === "all") return true;
        if (activeTab === "upcoming") return item.status === "upcoming";
        if (activeTab === "in-progress") return item.status === "in-progress";
        if (activeTab === "planned") return item.status === "planned";
        return false;
    });

    return (
        <>
            {/* Tab navigation */}
            < div className="flex flex-wrap justify-center mb-12 gap-2" >
                <button
                    onClick={() => setActiveTab("all")}
                    className={`px-6 py-2 rounded-full font-medium ${activeTab === "all"
                        ? "bg-[#4A154B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition duration-300`}
                >
                    All Features
                </button>
                <button
                    onClick={() => setActiveTab("in-progress")}
                    className={`px-6 py-2 rounded-full font-medium ${activeTab === "in-progress"
                        ? "bg-[#4A154B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition duration-300`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-6 py-2 rounded-full font-medium ${activeTab === "upcoming"
                        ? "bg-[#4A154B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition duration-300`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("planned")}
                    className={`px-6 py-2 rounded-full font-medium ${activeTab === "planned"
                        ? "bg-[#4A154B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition duration-300`}
                >
                    Planned
                </button>
            </div >

            {/* Timeline */}
            < div className="relative" >
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>

                {/* Timeline items */}
                <div className="space-y-16">
                    {filteredItems.map((item, index) => (
                        <div key={item.id} className={`relative z-10`}>
                            <div
                                className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    } items-center`}
                            >
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md bg-[#4A154B]"></div>

                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                                    <div
                                        className={`p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${item.status === "in-progress"
                                            ? "border-l-4 border-l-[#4A154B]"
                                            : ""
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-gray-50 p-3 rounded-lg">{item.icon}</div>
                                            <div className="flex items-center">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${item.status === "in-progress"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : item.status === "upcoming"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-amber-100 text-amber-800"
                                                        }`}
                                                >
                                                    {item.status === "in-progress"
                                                        ? "In Progress"
                                                        : item.status === "upcoming"
                                                            ? "Coming Soon"
                                                            : "Planned"}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>Estimated time: {item.timeEstimate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            {/*Feature reques*/}
            < div className="mt-24 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] rounded-2xl p-8 text-white text-center" >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a feature suggestion?</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    We're always looking to improve. Let us know what you'd like to see next in Slack Reserver!
                </p>
                <button
                    onClick={() => router.push("/contact?flavor=featureRequest&inputHighlight=message")}
                    className="bg-white text-[#4A154B] px-6 py-3 rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
                >
                    Submit Feature Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div >
        </>

    )
}

export default Roadmap