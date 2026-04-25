"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DiscontinuedBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-[9999] w-full bg-amber-100 border-b border-amber-300 text-amber-900">
      <div className="container mx-auto flex items-center gap-2 px-4 py-2 text-xs sm:text-sm">
        <div className="flex flex-1 items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Service discontinued.</strong> Slack Reserver is no longer available — this site is preserved for reference only.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss banner"
          className="ml-2 flex-shrink-0 rounded-full p-1 transition-colors hover:bg-amber-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
