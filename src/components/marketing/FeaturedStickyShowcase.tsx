"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import DashboardMockup from "@/components/marketing/DashboardMockup";
import { ArrowRight, Bot, CheckCircle2, Cpu, Database, Layers, Sparkles, TrendingUp } from "lucide-react";

interface CaseStudyChapter {
  id: string;
  category: string;
  client: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  variant: "retail" | "logistics" | "finance" | "workflow";
  slug: string;
}

const CHAPTERS: CaseStudyChapter[] = [
  {
    id: "omni-retail",
    category: "AI Chatbots & Agents",
    client: "OmniRetail Global",
    title: "Autonomous Tier-1 Customer Support Resolution Engine",
    problem:
      "Customer support was overwhelmed by 45,000+ monthly order tracking, returns, and catalog questions with a 14-hour average response time.",
    solution:
      "Engineered an autonomous multi-turn AI agent using Claude 3.5 Sonnet, self-hosted n8n workflows, and Shopify API webhooks with deterministic guardrails.",
    outcome:
      "Deflected 68% of inbound queries autonomously with an average resolution speed of 1.8 seconds and zero hallucinated return approvals.",
    metrics: [
      { label: "Support Deflection", value: "68%" },
      { label: "Avg Resolution", value: "1.8s" },
      { label: "Annualized Savings", value: "$420K" },
    ],
    variant: "retail",
    slug: "omni-retail-ai-agent",
  },
  {
    id: "nexus-logistics",
    category: "Data Pipeline & ETL",
    client: "Nexus Global Logistics",
    title: "Real-Time 15M+ Daily Telemetry Ingestion & Route Dispatch",
    problem:
      "Legacy batch processing delayed fleet rerouting by 3 hours, causing missed delivery windows and escalating diesel fuel costs.",
    solution:
      "Constructed a high-throughput event pipeline using Kafka, Python streaming workers, and PostgreSQL with automated n8n anomaly alerts.",
    outcome:
      "Reduced pipeline latency from 180 minutes to 420 milliseconds with 99.98% telemetry uptime across 1,200 active vehicles.",
    metrics: [
      { label: "Pipeline Latency", value: "420ms" },
      { label: "Daily Event Scale", value: "15M+" },
      { label: "Telemetry SLA", value: "99.98%" },
    ],
    variant: "logistics",
    slug: "nexus-logistics-data-pipeline",
  },
  {
    id: "finedge-capital",
    category: "Workflow Automation",
    client: "FinEdge Capital",
    title: "Automated Commercial Loan Document Processing Pipeline",
    problem:
      "Loan underwriters manually keyed financial statements and tax filings across 8 fragmented internal banking systems.",
    solution:
      "Architected an OCR extraction and deterministic underwriting validation pipeline with strict KYC compliance and automated audit trails.",
    outcome:
      "Accelerated loan approval turnaround from 4 business days to 35 minutes with 100% compliance audit trail integrity.",
    metrics: [
      { label: "Underwriting Time", value: "35 min" },
      { label: "Data Accuracy", value: "99.9%" },
      { label: "Throughput Surge", value: "4.2x" },
    ],
    variant: "finance",
    slug: "finedge-workflow-automation",
  },
];

export default function FeaturedStickyShowcase() {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section className="py-20 lg:py-28 bg-prime-navy relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[500px] h-[500px] bg-prime-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Featured Product Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Production AI &amp; Automations <br className="hidden sm:inline" />
            <span className="text-prime-purple">Engineered for Verifiable Scale</span>
          </h2>
          <p className="text-prime-gray text-base sm:text-lg leading-relaxed">
            Examine the actual architectures, deterministic workflows, and measurable business ROI we deploy for high-growth enterprises.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Chapters & Copy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Chapter Selector Tabs */}
            <div className="flex flex-col gap-2.5">
              {CHAPTERS.map((chapter, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      isActive
                        ? "bg-white/10 border-prime-purple/50 shadow-accent text-white"
                        : "bg-white/5 hover:bg-white/8 border-white/10 text-prime-gray hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className={isActive ? "text-prime-purple" : "text-prime-gray/70"}>
                        0{idx + 1}. {chapter.client}
                      </span>
                      <span className="text-[11px] font-normal text-prime-gray/60">
                        {chapter.category}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {chapter.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Details Card */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/15 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-prime-purple uppercase tracking-wider">
                  The Problem
                </span>
                <p className="text-xs sm:text-sm text-prime-gray leading-relaxed mt-1">
                  {activeChapter.problem}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Engineered Solution
                </span>
                <p className="text-xs sm:text-sm text-prime-gray leading-relaxed mt-1">
                  {activeChapter.solution}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                {activeChapter.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/5 text-center">
                    <div className="text-base sm:text-lg font-black text-white text-emerald-400">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-prime-gray mt-0.5 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={`/case-studies`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-prime-purple hover:text-white transition-colors"
                >
                  <span>Explore full case study breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Browser & Dashboard Preview */}
          <div className="lg:col-span-7">
            <BrowserFrame
              url={`app.primeautomation.ai/showcase/${activeChapter.id}`}
              title={`${activeChapter.client} Telemetry Console`}
            >
              <DashboardMockup variant={activeChapter.variant} />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
