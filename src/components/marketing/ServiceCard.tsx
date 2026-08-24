import Link from "next/link";
import { ServiceDetail } from "@/lib/services-data";
import { Bot, Workflow, Database, Cpu, Layers, Gauge, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Bot,
  Workflow,
  Database,
  Cpu,
  Layers,
  Gauge,
};

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: ServiceDetail;
  index?: number;
}) {
  const IconComponent = ICON_MAP[service.iconName] || Bot;
  const numString = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${service.slug}`}
      className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-white/10 relative overflow-hidden transition-all duration-300"
    >
      {/* Top accent rule */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-prime-purple/20 to-transparent group-hover:via-prime-purple transition-all" />

      <div>
        {/* Number & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-prime-purple/15 border border-prime-purple/30 flex items-center justify-center text-prime-purple group-hover:bg-prime-purple group-hover:text-white transition-all duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-prime-gray/60 group-hover:text-prime-purple transition-colors">
            {numString}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-prime-purple transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-prime-gray leading-relaxed mb-5">
          {service.shortDescription}
        </p>

        {/* Outcomes list */}
        <div className="space-y-1.5 pt-3 border-t border-white/10 mb-4">
          {service.expectedOutcomes.slice(0, 2).map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-prime-gray/90">
              <span className="w-1.5 h-1.5 rounded-full bg-prime-purple mt-1.5 shrink-0" />
              <span className="truncate">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore link */}
      <div className="flex items-center justify-between text-xs font-bold text-prime-purple group-hover:text-white transition-colors pt-2">
        <span>Explore Architecture</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}
