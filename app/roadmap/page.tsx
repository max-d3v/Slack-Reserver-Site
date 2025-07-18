import { Calendar, MessageCircle, Check, Clock } from "lucide-react";
import Roadmap from "@/components/ui/roadmapFeatures";
import Script from "next/script";
import { Metadata } from "next";
import Head from 'next/head';

// Time estimation constants
const TIME_ESTIMATE = {
  SHORT: "1-2 weeks",
  MEDIUM: "1-2 months",
  LONG: "2-3 months",
};

export default function Page() {

  const roadmapItems = [
    {
      title: "Permission Management",
      description: "Advanced permission management for resources. Customizable access levels for different user roles.",
      status: "in-progress",
      timeEstimate: TIME_ESTIMATE.SHORT,
      icon: <Clock className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      title: "Quick Book",
      description: "One-day reservations with simplified resource selection. Search resources by name for faster booking process.",
      status: "upcoming",
      timeEstimate: TIME_ESTIMATE.SHORT,
      icon: <Clock className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      title: "Meeting Feedback System",
      description: "Post-meeting feedback collection from organizers. Automatic sharing of meeting summaries with all participants.",
      status: "upcoming",
      timeEstimate: TIME_ESTIMATE.MEDIUM,
      icon: <MessageCircle className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      title: "Confirm attendance",
      description: "Support for confirming participation in meetings. Automatic reminders for participants to confirm their attendance.",
      status: "upcoming",
      timeEstimate: TIME_ESTIMATE.SHORT,
      icon: <Check className="h-10 w-10 text-[#4A154B]" />,
    },
    {
      title: "Google Calendar Integration",
      description: "Seamless synchronization with Google Calendar. Import and export reservations between Slack Reserver and Google Calendar.",
      status: "planned",
      timeEstimate: TIME_ESTIMATE.LONG,
      icon: <Calendar className="h-10 w-10 text-[#4A154B]" />,
    },
  ];

  return (
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
  );
}