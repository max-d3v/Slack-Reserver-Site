import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 p-8 rounded-lg shadow-xl border border-slate-300 bg-white text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-6 w-6 text-amber-700" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign-in disabled</h1>
        <p className="text-muted-foreground">
          Slack Reserver has been discontinued. Account features and authentication are no longer available.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4A154B] text-white hover:bg-[#3b113c] px-4 py-2 rounded-md text-sm font-medium"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
