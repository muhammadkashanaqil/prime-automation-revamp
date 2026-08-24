import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: {
    title: string;
    slug: string;
    clientName?: string | null;
    industry: string;
    excerpt: string;
    heroImageUrl?: string | null;
    heroImageAlt?: string | null;
    featuredResult?: string | null;
    metricsList?: Array<{ label: string; value: string; note?: string }>;
    servicesList?: string[];
  };
  featured?: boolean;
}

export default function CaseStudyCard({
  caseStudy,
  featured = false,
}: CaseStudyCardProps) {
  const coverImage =
    caseStudy.heroImageUrl ||
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop";

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={`glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group transition-all duration-300 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div>
        {/* Browser Top Window Simulation */}
        <div className="px-4 py-2.5 bg-[#090E1B] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] font-mono text-prime-gray/60 truncate max-w-[200px]">
            {caseStudy.clientName || caseStudy.industry}
          </span>
          <span className="text-[10px] text-prime-purple font-semibold">Verified</span>
        </div>

        {/* 16:10 Visual Stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-prime-navy-dark">
          <Image
            src={coverImage}
            alt={caseStudy.heroImageAlt || caseStudy.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prime-navy via-prime-navy/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Industry Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-prime-navy/90 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold">
              {caseStudy.industry}
            </span>
          </div>

          {/* Featured Result Pill */}
          {caseStudy.featuredResult && (
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-prime-purple/90 backdrop-blur-md text-white text-xs font-bold shadow-accent truncate max-w-full">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{caseStudy.featuredResult}</span>
              </span>
            </div>
          )}
        </div>

        {/* Card Metadata */}
        <div className="p-6">
          {caseStudy.clientName && (
            <div className="text-[11px] font-bold text-prime-purple uppercase tracking-wider mb-1.5">
              {caseStudy.clientName}
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-prime-purple transition-colors line-clamp-2">
            {caseStudy.title}
          </h3>

          <p className="text-xs sm:text-sm text-prime-gray leading-relaxed mb-4 line-clamp-2">
            {caseStudy.excerpt}
          </p>

          {/* Metrics Pill Grid */}
          {caseStudy.metricsList && caseStudy.metricsList.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
              {caseStudy.metricsList.slice(0, 2).map((m, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-base font-black text-emerald-400">{m.value}</div>
                  <div className="text-[10px] text-prime-gray truncate">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 pb-6 pt-1 flex items-center justify-between text-xs font-bold text-prime-purple group-hover:text-white transition-colors">
        <span>View Case Study</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}
