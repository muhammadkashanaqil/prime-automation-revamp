import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_LIST } from "@/lib/services-data";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import ServiceCard from "@/components/marketing/ServiceCard";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import FAQAccordion from "@/components/marketing/FAQAccordion";
import CTASection from "@/components/marketing/CTASection";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  Bot,
  Workflow,
  Database,
  Lock,
  Sparkles,
  Activity,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise AI & Operational Automation Services | Prime Automation",
  description:
    "Explore Prime Automation's 6 core solutions: AI chatbots & virtual agents, n8n workflow automation, ETL data pipelines, custom AI models, system integrations, and AI audits.",
};

export default async function ServicesIndexPage() {
  const [featuredCaseStudies, servicesFaqs] = await Promise.all([
    getPublishedCaseStudies({ featuredOnly: true, limit: 3 }),
    getPublishedFAQs({ limit: 5 }),
  ]);

  return (
    <div className="space-y-20 py-8">
      {/* Breadcrumbs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Services" }]} />
      </div>

      {/* ============================================================
          HERO: Dark 65-75vh Hero
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" /> Full-Spectrum Autonomous Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Enterprise AI &amp; <br />
              <span className="text-prime-purple">Operational Automation</span>
            </h1>

            <p className="text-base sm:text-lg text-prime-gray leading-relaxed max-w-xl">
              We architect, build, and deploy production-grade autonomous systems that remove manual bottlenecks, accelerate speed-to-lead, and scale with verifiable ROI.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-prime-purple text-white font-bold text-sm shadow-accent hover:bg-prime-accent-hover hover:-translate-y-0.5 transition-all"
              >
                <span>Book a Free Automation Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BrowserFrame
              url="app.primeautomation.ai/services/matrix"
              title="Autonomous Capability Matrix"
            >
              <div className="p-6 bg-[#090D1A] space-y-4 text-xs font-mono">
                <div className="text-prime-purple font-bold text-[11px] uppercase tracking-wider">
                  Active Capabilities Registry:
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-white font-bold">🤖 Multi-Agent LLM Orchestrator</span>
                    <span className="text-emerald-400">ONLINE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-white font-bold">⚡ n8n Deterministic Logic</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-white font-bold">📊 Real-Time Kafka / Postgres ETL</span>
                    <span className="text-sky-400">STREAMING</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-white font-bold">🔒 Zero-Retention Privacy Shield</span>
                    <span className="text-prime-purple">ENFORCED</span>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </section>

      {/* Integration Marquee Strip */}
      <LogoMarquee />

      {/* ============================================================
          SIX CORE SERVICE MODULES (Alternating 2-column)
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
            <span>Detailed Service Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Six Modular Engineering Disciplines
          </h2>
          <p className="text-prime-gray text-base sm:text-lg">
            Every service is backed by production-tested code, deterministic policy contracts, and 24/7 telemetry monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* ============================================================
          DELIVERY STANDARDS (Light Editorial Surface)
          ============================================================ */}
      <section className="py-20 bg-[#f9e9fe] text-[#0C1322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-prime-purple uppercase tracking-wider">
              Engineering Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C1322] tracking-tight">
              How We Partner With Your Engineering &amp; Operations Teams
            </h2>
            <p className="text-[#6F7582] text-base sm:text-lg leading-relaxed">
              We never deliver fragile no-code black boxes. Every deployment includes clean architecture diagrams, typed API contracts, and full repository ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-prime-purple/15 text-prime-purple flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1322]">Sandbox Stress Testing</h3>
              <p className="text-xs sm:text-sm text-[#6F7582] leading-relaxed">
                We test workflows and LLM agent prompts against historical production payloads in isolated environments before live deployment.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-prime-purple/15 text-prime-purple flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1322]">Zero-Retention Security</h3>
              <p className="text-xs sm:text-sm text-[#6F7582] leading-relaxed">
                All LLM connections use zero-retention enterprise endpoints. Your customer data and intellectual property are never used for public training.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-prime-purple/15 text-prime-purple flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1322]">100% Code &amp; Data Ownership</h3>
              <p className="text-xs sm:text-sm text-[#6F7582] leading-relaxed">
                Built on open orchestrations (n8n) and PostgreSQL/Supabase. You retain full ownership with zero proprietary vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-prime-purple uppercase tracking-wider mb-2">
              Verified Proof
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Proven Case Studies Across Our Services
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-prime-purple hover:text-white transition-colors"
          >
            <span>View All Proof</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCaseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} caseStudy={cs} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      {servicesFaqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-prime-purple uppercase tracking-wider">
              Service Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions on Engagements
            </h2>
          </div>
          <FAQAccordion faqs={servicesFaqs} />
        </section>
      )}

      {/* Final CTA */}
      <CTASection
        title="Ready to Build Autonomous Systems for Your Business?"
        subtitle="Schedule a 45-minute technical audit with our Senior Automation Architect to assess your bottlenecks and map a fixed-scope ROI blueprint."
      />
    </div>
  );
}
