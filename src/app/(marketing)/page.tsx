import Link from "next/link";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import { getPublishedPosts } from "@/lib/cms/posts";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import { SERVICES_LIST } from "@/lib/services-data";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import ServiceCard from "@/components/marketing/ServiceCard";
import FeaturedStickyShowcase from "@/components/marketing/FeaturedStickyShowcase";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import PostCard from "@/components/marketing/PostCard";
import WorkflowNodeDiagram from "@/components/marketing/WorkflowNodeDiagram";
import FAQAccordion from "@/components/marketing/FAQAccordion";
import CTASection from "@/components/marketing/CTASection";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Clock,
  Terminal,
  Activity,
  ChevronDown,
  Database,
  Lock,
  Users, 
  Settings, 
  Layers3, 
  LineChart, 
  BrainCircuit, 
  Workflow
} from "lucide-react";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  const [featuredCaseStudies, latestPosts, featuredFaqs] = await Promise.all([
    getPublishedCaseStudies({ featuredOnly: true, limit: 3 }),
    getPublishedPosts({ limit: 3 }),
    getPublishedFAQs({ featuredOnly: true, limit: 6 }),
  ]);

  const metrics = [
    { value: "150+", label: "Pipelines & Agents Deployed", sub: "Production-grade enterprise systems" },
    { value: "68%", label: "Average Support Deflection", sub: "Autonomous, guardrail-bound resolution" },
    { value: "99.98%", label: "Data Pipeline Uptime", sub: "Fault-tolerant queue & ETL execution" },
    { value: "$1.4M+", label: "Client Operational Savings", sub: "Audited annualized client ROI" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discover & Audit",
      description:
        "We audit your manual workflows, inspect fragmented API touchpoints, and calculate exact operational ROI before drafting architecture.",
      deliverable: "Fixed-Scope Automation Roadmap",
    },
    {
      step: "02",
      title: "Architect & Guardrail",
      description:
        "We design deterministic schemas, prompt boundary policies, and secure database connections with zero public model training.",
      deliverable: "SOC2-Compliant Technical Specs",
    },
    {
      step: "03",
      title: "Build & Sandbox Stress Test",
      description:
        "We construct modular n8n orchestrations, fine-tune context retrieval vectors, and shadow-test against real historical payloads.",
      deliverable: "Tested Production Pipeline",
    },
    {
      step: "04",
      title: "Deploy & Telemetry SLA",
      description:
        "Zero-downtime cutover, team dashboard training, and 24/7 telemetry monitoring with continuous latency and accuracy optimization.",
      deliverable: "24/7 Monitored Live System",
    },
  ];

  return (
    <div className="space-y-0">
      {/* ============================================================
          SECTION 01: HERO — "Intelligence that moves your business"
          Full viewport dark hero fit to screen
          ============================================================ */}
      <section className="relative min-h-[calc(100svh-5rem)] sm:min-h-[calc(100svh-6rem)] flex flex-col justify-between pt-2 sm:pt-4 pb-6 overflow-hidden bg-prime-navy">
        {/* Background Grid Pattern & Radial Energy Glow */}
        <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-prime-purple/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10 py-2 sm:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-prime-purple text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-prime-purple animate-pulse" />
                <span>Modern AI &amp; Automation Agency</span>
              </div>

              {/* Large H1 (Max 3 lines on desktop) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-black text-white tracking-tight leading-[1.08]">
                Intelligence that moves <br className="hidden sm:inline" />
                <span className="text-prime-purple">your business forward.</span>
              </h1>

              {/* Supporting Subcopy */}
              <p className="text-sm sm:text-base text-prime-gray leading-relaxed max-w-xl">
                We engineer production-grade AI agents, intelligent multi-step workflows, and resilient data pipelines designed for measurable enterprise ROI.
              </p>

              {/* Two CTAs */}
              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-prime-purple text-white font-bold text-sm shadow-accent hover:bg-prime-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span>Book a Free Automation Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all"
                >
                  <span>Explore Capabilities</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-prime-gray/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Deterministic Guardrails</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-prime-purple" />
                  <span>Self-Hosted n8n Core</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Zero Public Model Training</span>
                </div>
              </div>
            </div>

            {/* Right Column: Abstract AI / Automation Visual Stage */}
            <div className="lg:col-span-5 relative">
              <BrowserFrame
                url="engine.primeautomation.ai/live"
                title="Prime Orchestration Kernel"
                className="shadow-accent-lg"
              >
                <div className="p-5 bg-[#090D1A] space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-white font-bold">STATE: INGESTION ACTIVE</span>
                    </div>
                    <span className="text-prime-purple font-semibold text-[10px]">100% Deterministic</span>
                  </div>

                  {/* Visual Node Flow Mock */}
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-prime-gray">
                      <span className="text-white">01. Webhook</span>
                      <span className="text-emerald-400 font-bold">24ms ACK</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-prime-purple/15 border border-prime-purple/40 flex items-center justify-between text-white">
                      <span>02. Claude 3.5 Reasoning</span>
                      <span className="text-prime-purple font-bold">Tool Call OK</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-prime-gray">
                      <span className="text-white">03. PostgreSQL Commit</span>
                      <span className="text-sky-400 font-bold">Atomic 200</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-prime-gray/60 flex items-center justify-between border-t border-white/5">
                    <span>Active SLA: 99.98%</span>
                    <span>No Hallucination Shield ON</span>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        {/* Desktop Scroll Indicator */}
        <div className="hidden lg:flex items-center justify-center gap-2 text-xs text-prime-gray/60 uppercase tracking-widest select-none">
          <ChevronDown className="w-4 h-4 text-prime-purple animate-bounce" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ============================================================
          SECTION 02: TRUSTED / PROOF STRIP
          Technology & capabilities badges in restrained monochrome
          ============================================================ */}
      <LogoMarquee />

      {/* ============================================================
          SECTION 03: AGENCY POSITIONING
          Light editorial section (#f9e9fe) on asymmetrical 7/5 grid
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-[#f9e9fe] text-[#0C1322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left 7 Cols: Huge Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1322]/5 text-prime-purple text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-prime-purple" />
                <span>Our Engineering Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-[#0C1322]">
                We do not build fragile prototypes. <br />
                We engineer <span className="text-prime-purple">resilient operational systems</span> that run autonomously.
              </h2>
              {/* Thin Purple Rule */}
              <div className="w-24 h-1 bg-prime-purple rounded-full" />
            </div>

            {/* Right 5 Cols: Editorial Narrative */}
            <div className="lg:col-span-5 space-y-4 text-base sm:text-lg text-[#6F7582] leading-relaxed pt-2">
              <p>
                Most business automation fails because generic tools break the moment edge cases occur. At Prime Automation, we combine open orchestration platforms with deterministic verification guardrails.
              </p>
              <p>
                Every agent and workflow is treated as mission-critical software: version-controlled, strictly permissioned, monitored with live telemetry, and bound to clear financial milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04: SERVICES — INTERACTIVE CAPABILITY CARDS
          Dark section with 6 core capability cards
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-prime-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Service Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Enterprise Solutions Built for <br className="hidden sm:inline" />
              <span className="text-prime-purple">Autonomous Operational Execution</span>
            </h2>
            <p className="text-prime-gray text-base sm:text-lg leading-relaxed">
              From multi-agent customer service deflectors to high-throughput data processing pipelines, we deliver end-to-end architectures that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05: FEATURED CASE STUDY — STICKY PRODUCT SHOWCASE
          YADEA-inspired browser/dashboard preview with 3 chapters
          ============================================================ */}
      <FeaturedStickyShowcase />

      {/* ============================================================
          SECTION 06: SELECTED WORK ARCHIVE
          Production case study cards from CMS
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-[#090D18] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Verified Client Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Architectures Delivered in Production
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-prime-purple hover:text-white transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCaseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07: HOW WE WORK
          Light section with 4-step numbered rail & vertical line
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-[#f9e9fe] text-[#0C1322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1322]/5 text-prime-purple text-xs font-bold uppercase tracking-wider">
              <span>Implementation Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0C1322]">
              A Rigorous, 4-Stage <br className="hidden sm:inline" />
              <span className="text-prime-purple">Engineering Process</span>
            </h2>
            <p className="text-[#6F7582] text-base sm:text-lg leading-relaxed">
              We eliminate guesswork with fixed timelines, transparent sandboxes, and verified ROI deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-card flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="text-2xl font-black text-prime-purple font-mono mb-3">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#0C1322] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F7582] leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 text-[11px] font-bold text-prime-purple">
                  Deliverable: {p.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08: AUTOMATION ARCHITECTURE / WORKFLOW DEMO
          Interactive node diagram with real-time description
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-prime-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Architecture Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              How Our Autonomous Systems Execute
            </h2>
            <p className="text-prime-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Click any stage below to inspect the underlying technologies, policy guardrails, and latency SLAs.
            </p>
          </div>

          <WorkflowNodeDiagram />
        </div>
      </section>

      {/* ============================================================
          SECTION 09: RESULTS / OUTCOMES
          Strong numeric / stat benefit grid
          ============================================================ */}
      <section className="py-20 bg-[#080B12] border-y border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-emerald-400 mb-1">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">{m.label}</div>
                <div className="text-xs text-prime-gray leading-relaxed">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10: INSIGHTS / LATEST POSTS
          Editorial 3-card grid from CMS
          ============================================================ */}
      {latestPosts.length > 0 && (
        <section className="py-24 lg:py-32 bg-prime-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Engineering Insights</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Technical Guides &amp; Blueprints
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-bold text-prime-purple hover:text-white transition-colors"
              >
                <span>Browse All Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 11: FAQ PREVIEW
          Accordion with top CMS FAQs and "View all FAQs"
          ============================================================ */}
      {featuredFaqs.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#090E1A] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Clear Answers on Engineering &amp; Timelines
              </h2>
            </div>

            <FAQAccordion faqs={featuredFaqs} />

            <div className="text-center pt-4">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-bold text-prime-purple hover:text-white transition-colors"
              >
                <span>Have more questions? View Complete Knowledge FAQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 12: FINAL CTA
          Large dark/navy section with bold statement and booking CTA
          ============================================================ */}
      <CTASection />
    </div>
  );
}
