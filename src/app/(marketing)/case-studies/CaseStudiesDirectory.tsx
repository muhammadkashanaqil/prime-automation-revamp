"use client";

import { useState, useMemo } from "react";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import EmptyState from "@/components/marketing/EmptyState";
import CTASection from "@/components/marketing/CTASection";
import { Search, Sparkles, Layers } from "lucide-react";

interface CaseStudiesDirectoryProps {
  initialCaseStudies: any[];
}

const CATEGORY_TABS = [
  "All Systems",
  "AI Chatbots",
  "Workflow Automation",
  "Data Pipelines",
  "Custom AI Models",
  "System Integration",
];

export default function CaseStudiesDirectory({
  initialCaseStudies,
}: CaseStudiesDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Systems");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCaseStudies = useMemo(() => {
    return initialCaseStudies.filter((cs) => {
      const matchesCategory =
        selectedCategory === "All Systems" ||
        cs.industry?.toLowerCase() === selectedCategory.toLowerCase() ||
        (cs.servicesList &&
          cs.servicesList.some((s: string) =>
            s.toLowerCase().includes(selectedCategory.toLowerCase().replace(/s$/, ""))
          ));

      const matchesSearch =
        !searchQuery.trim() ||
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cs.clientName && cs.clientName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialCaseStudies, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("All Systems");
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Case Studies" }]} />

      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Proven System Deliveries
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
          Selected systems we have <br />
          <span className="text-prime-purple">architected &amp; deployed.</span>
        </h1>
        <p className="text-base sm:text-lg text-prime-gray leading-relaxed">
          Real telemetry benchmarks, multi-agent orchestrations, and measurable financial ROI achieved across enterprise production environments.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-prime-purple text-white shadow-accent"
                    : "bg-white/5 hover:bg-white/10 text-prime-gray hover:text-white border border-white/10"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-prime-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, technology, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-prime-gray/70 focus:outline-none focus:border-prime-purple"
          />
        </div>
      </div>

      {/* 2-Column Alternating Grid */}
      {filteredCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCaseStudies.map((cs, idx) => (
            <CaseStudyCard
              key={cs.id}
              caseStudy={cs}
              featured={idx % 3 === 0 && idx !== 0}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No case studies match your filters"
          description="Try selecting a different system category or clear your search term."
          onReset={handleResetFilters}
        />
      )}

      {/* Final CTA */}
      <CTASection
        title="Have a Similar Operational Workflow to Automate?"
        subtitle="Book a 45-minute technical audit with our Senior Automation Architect. We'll map your bottlenecks and calculate your expected ROI."
      />
    </div>
  );
}
