import React from "react";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function BrowserFrame({
  url = "app.primeautomation.ai/orchestrator",
  children,
  className = "",
  title,
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-2xl lg:rounded-3xl border border-white/15 bg-prime-navy-dark overflow-hidden shadow-2xl ${className}`}
    >
      {/* Top Browser Bar */}
      <div className="px-4 py-3 bg-[#0A0F1D] border-b border-white/10 flex items-center justify-between gap-3 select-none">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* URL Pill */}
        <div className="flex-1 max-w-sm mx-auto bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[11px] text-prime-gray/80 font-mono truncate text-center flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>https://{url}</span>
        </div>

        {/* Window Title or Placeholder */}
        <div className="text-[11px] text-prime-gray/50 font-medium hidden sm:block shrink-0">
          {title || "Prime AI Engine v2.6"}
        </div>
      </div>

      {/* Frame Body */}
      <div className="relative overflow-hidden bg-prime-navy">{children}</div>
    </div>
  );
}
