"use client"

import { useState } from 'react';
import { X, Rocket, Clock } from 'lucide-react';

export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] text-white py-6 px-4 z-[9999] sticky overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>
      
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-yellow-300 animate-bounce" />
            <Clock className="h-4 w-4 text-blue-300" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <p className="font-semibold text-sm sm:text-base">
              🚀 Final Development Stage
            </p>
            <p className="text-xs sm:text-sm text-white/90">
              Slack Reserver is in the final steps of Slack Marketplace approval and almost ready for launch!
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200 flex-shrink-0"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}