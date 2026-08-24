import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-prime-navy text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-block">
          <Logo />
        </div>

        <div className="space-y-2">
          <div className="text-7xl font-black text-prime-accent gradient-text-purple">
            404
          </div>
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-sm text-prime-gray leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-prime-accent text-white font-bold text-sm shadow-accent hover:bg-prime-accent-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
