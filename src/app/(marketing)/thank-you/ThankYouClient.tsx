"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, Calendar, ArrowRight, BookOpen, Layers } from "lucide-react";

interface ThankYouClientProps {
  schedulingUrl?: string;
}

export default function ThankYouClient({ schedulingUrl = "" }: ThankYouClientProps) {
  useEffect(() => {
    // Fire lead conversion analytics event once
    trackEvent({
      name: "contact_form_submit",
      params: {
        primary_need: "confirmed_audit",
        page_path: "/thank-you",
      },
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-10">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-2xl animate-in zoom-in-50 duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Main Success Heading */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
          Request Received Successfully
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Your Free Automation Audit is Confirmed!
        </h1>
        <p className="text-base sm:text-lg text-prime-gray leading-relaxed">
          Our Senior Automation Architect is reviewing your submission and will reach out via email within 2 business hours.
        </p>
      </div>

      {/* Next Step Box */}
      <div className="glass-card rounded-3xl p-8 border border-prime-accent/30 max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
          <Calendar className="w-5 h-5 text-prime-accent" />
          <span>Want to pick an exact time right now?</span>
        </div>
        <p className="text-xs sm:text-sm text-prime-gray leading-relaxed">
          You can lock in a direct 45-minute Zoom consultation instantly on our calendar.
        </p>
        <a
          href={schedulingUrl || "https://cal.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white font-bold text-sm shadow-accent transition-all active:scale-95"
        >
          <span>Select a Time on Our Calendar</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Next Discovery Links */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <h3 className="text-sm font-semibold text-prime-gray uppercase tracking-wider">
          While you wait, explore our engineering architectures:
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all"
          >
            <Layers className="w-4 h-4 text-prime-accent" />
            <span>Read Client Case Studies</span>
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all"
          >
            <BookOpen className="w-4 h-4 text-prime-accent" />
            <span>Browse Automation Guides</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
