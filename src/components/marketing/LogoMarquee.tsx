import React from "react";

const TECH_ITEMS = [
  "Self-Hosted n8n",
  "OpenAI GPT-4o",
  "Anthropic Claude 3.5",
  "PostgreSQL & Supabase",
  "Pinecone Vector RAG",
  "Python ETL Workers",
  "Docker & Kubernetes",
  "Kafka Streams",
  "LangChain & LlamaIndex",
];

export default function LogoMarquee() {
  return (
    <section className="py-8 border-y border-white/10 bg-prime-navy-dark/90 overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-prime-navy-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-prime-navy-dark to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
        <p className="text-[11px] uppercase font-bold tracking-widest text-prime-gray/70 text-center">
          Verified Enterprise Technologies &amp; Architecture Standards
        </p>
      </div>

      <div className="flex overflow-x-hidden group">
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {TECH_ITEMS.concat(TECH_ITEMS).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-prime-gray hover:text-white hover:border-prime-purple/40 hover:bg-prime-purple/10 transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-prime-purple" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
