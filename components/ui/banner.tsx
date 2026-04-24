import { AlertTriangle } from "lucide-react";

export default function DiscontinuedBanner() {
  return (
    <div className="sticky top-0 z-[9999] w-full bg-amber-100 border-b border-amber-300 text-amber-900">
      <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>
          <strong>Service discontinued.</strong> Slack Reserver is no longer available — this site is preserved for reference only.
        </span>
      </div>
    </div>
  );
}
