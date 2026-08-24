import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA, SERVICES_LIST } from "@/lib/services-data";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import FAQAccordion from "@/components/marketing/FAQAccordion";
import CTASection from "@/components/marketing/CTASection";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Workflow,
  Bot,
  Database,
  Layers,
  Gauge,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Enterprise Automation Solutions`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Prime Automation`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const [matchedCaseStudies, matchedFaqs] = await Promise.all([
    getPublishedCaseStudies({ serviceSlug: slug, limit: 2 }),
    getPublishedFAQs({ serviceSlug: slug, limit: 4 }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-prime-navy-card via-prime-navy to-[#1E1233] border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-prime-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prime-accent/20 border border-prime-accent/40 text-prime-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Enterprise Service Specification
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {service.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-prime-gray leading-relaxed">
            {service.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-prime-accent text-white font-bold text-sm shadow-accent-lg hover:bg-prime-accent-hover active:scale-[0.98] transition-all"
            >
              <span>Book a Free Audit for {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Statement & Core Use Cases */}
      <div className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Problem & Application
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Operational Bottlenecks We Solve
          </h2>
          <p className="text-sm sm:text-base text-prime-gray leading-relaxed">
            {service.problemStatement}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.useCases.map((uc, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-prime-accent px-2 py-0.5 rounded bg-prime-accent/15">
                  Use Case {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{uc.title}</h3>
                <p className="text-xs sm:text-sm text-prime-gray leading-relaxed">
                  {uc.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-emerald-400">
                Target Benchmark: {uc.metrics}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities & Concrete Deliverables */}
      <div className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Technical Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What We Build and Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-prime-accent/20 border border-prime-accent/40 flex items-center justify-center text-prime-accent font-bold">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold text-white">{cap.title}</h3>
              <p className="text-xs sm:text-sm text-prime-gray leading-relaxed">
                {cap.description}
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Deliverables:
                </div>
                {cap.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-prime-gray">
                    <CheckCircle2 className="w-3.5 h-3.5 text-prime-accent shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typical Integrations & Tech Stack */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Ecosystem Integration
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Typical Technologies & APIs Used
          </h3>
          <p className="text-xs sm:text-sm text-prime-gray mt-1">
            We adapt directly to your existing infrastructure, avoiding brittle custom glue code.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {service.typicalIntegrations.map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Model & Timeline */}
      <div className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-accent/15 border border-prime-accent/30 text-prime-accent text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" /> Timeline: {service.engagementModel.duration}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Structured Engagement Model
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.engagementModel.phases.map((ph, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 space-y-3"
            >
              <span className="text-2xl font-black text-prime-accent/70">{ph.step}</span>
              <h4 className="text-base font-bold text-white">{ph.title}</h4>
              <p className="text-xs text-prime-gray leading-relaxed">{ph.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Business Outcomes */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Expected Business Outcomes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.expectedOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-prime-accent shrink-0 mt-0.5" />
              <span className="text-sm text-white/90 font-medium">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Matched Case Studies (if any) */}
      {matchedCaseStudies.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
                Related Proof of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Case Studies in {service.title}
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="text-xs sm:text-sm font-semibold text-prime-accent hover:text-white"
            >
              View all case studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedCaseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      )}

      {/* Matched FAQs */}
      {matchedFaqs.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold text-white text-center">
            {service.title} FAQs
          </h3>
          <FAQAccordion items={matchedFaqs} />
        </div>
      )}

      {/* Final CTA */}
      <CTASection
        title={`Ready to Build Your ${service.title} Architecture?`}
        subtitle="Schedule a free 45-minute audit with our lead automation engineer. We'll map your bottlenecks and calculate your expected ROI."
      />
    </div>
  );
}
