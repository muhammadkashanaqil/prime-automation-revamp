"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import FAQAccordion from "@/components/marketing/FAQAccordion";
import EmptyState from "@/components/marketing/EmptyState";
import CTASection from "@/components/marketing/CTASection";
import { Search, HelpCircle, ArrowRight } from "lucide-react";

interface FAQDirectoryProps {
  initialFaqs: any[];
}

export default function FAQDirectory({ initialFaqs }: FAQDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialFaqs.forEach((faq) => {
      if (faq.category) set.add(faq.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialFaqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      {/* 2-Column Desktop Layout (Sticky Left Index + Right Accordion) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Sticky Column (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-prime-gray leading-relaxed">
              Clear technical answers on our self-hosted architectures, deployment timelines, SLAs, and security standards.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-prime-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-prime-gray/70 focus:outline-none focus:border-prime-purple"
            />
          </div>

          {/* Category Filter Vertical List */}
          <div className="space-y-1 pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-prime-gray/70 mb-2">
              Browse by Category:
            </div>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-prime-purple text-white shadow-accent"
                      : "text-prime-gray hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Column: Accordions (8 Cols) */}
        <div className="lg:col-span-8">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion faqs={filteredFaqs} />
          ) : (
            <EmptyState
              title="No questions found"
              description="We couldn't find any FAQs matching your query. Try another keyword or clear your filter."
              onReset={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            />
          )}
        </div>
      </div>

      {/* Final CTA */}
      <CTASection
        title="Have a Specific Question About Your Workflow?"
        subtitle="Schedule a 45-minute technical audit with our Senior Automation Architect to discuss your exact architecture requirements."
      />
    </div>
  );
}
