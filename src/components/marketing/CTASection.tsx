"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function CTASection({
  title = "Ready to Eliminate Bottlenecks with Autonomous AI Systems?",
  subtitle = "Schedule a complimentary 45-minute technical audit with our Senior Automation Architect. We will assess your existing pipelines, identify automation targets, and map a fixed-scope ROI blueprint.",
  primaryCtaText = "Book a Free Automation Audit",
  primaryCtaHref = "/contact",
  secondaryCtaText = "Explore Case Studies",
  secondaryCtaHref = "/case-studies",
}: CTASectionProps) {
  const handlePrimaryClick = () => {
    trackEvent({
      name: "cta_click",
      params: {
        cta_name: "cta_section_primary",
        page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      },
    });
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-prime-navy">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-prime-purple/12 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#0B1020] border border-prime-purple/30 shadow-card-dark text-center space-y-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/35 text-prime-purple text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> High-Impact Engineering
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-prime-gray leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryCtaHref}
              onClick={handlePrimaryClick}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-prime-purple text-white font-bold text-sm sm:text-base shadow-accent hover:bg-prime-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {secondaryCtaText && (
              <Link
                href={secondaryCtaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/15 transition-all"
              >
                <span>{secondaryCtaText}</span>
              </Link>
            )}
          </div>

          {/* Trust points */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-prime-gray">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 45-Minute Live Technical Deep Dive
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Actionable ROI &amp; Schema Blueprint
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero-Commitment Consultation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
