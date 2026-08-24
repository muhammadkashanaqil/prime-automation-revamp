import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/cms/case-studies";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import CTASection from "@/components/marketing/CTASection";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Workflow,
  Clock,
} from "lucide-react";

interface CaseStudyDetailProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: CaseStudyDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: cs.seoTitle || `${cs.title} | Case Study`,
    description: cs.seoDescription || cs.excerpt,
    robots: cs.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      images: cs.ogImageUrl || cs.heroImageUrl ? [{ url: cs.ogImageUrl || cs.heroImageUrl! }] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Get related case studies
  const allCaseStudies = await getPublishedCaseStudies({ limit: 4 });
  const relatedStudies = allCaseStudies
    .filter((cs) => cs.slug !== caseStudy.slug)
    .slice(0, 2);

  const heroImage =
    caseStudy.heroImageUrl ||
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: caseStudy.title },
        ]}
      />

      {/* Case Study Header Banner */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-prime-accent/20 border border-prime-accent/40 text-prime-accent text-xs font-bold uppercase tracking-wider">
            {caseStudy.industry}
          </span>
          {caseStudy.clientName && (
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">
              Client: {caseStudy.clientName}
            </span>
          )}
          {caseStudy.featuredResult && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {caseStudy.featuredResult}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {caseStudy.title}
        </h1>

        <p className="text-lg sm:text-xl text-prime-gray leading-relaxed">
          {caseStudy.excerpt}
        </p>

        {/* Services Badges */}
        {caseStudy.servicesList && caseStudy.servicesList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-prime-gray font-semibold mr-1">Services:</span>
            {caseStudy.servicesList.map((srv: string, idx: number) => (
              <Link
                key={idx}
                href={`/services/${srv}`}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                {srv.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Hero Image */}
      <div className="relative h-[320px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src={heroImage}
          alt={caseStudy.heroImageAlt || caseStudy.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-prime-navy via-transparent to-transparent opacity-70" />
      </div>

      {/* Key Metrics Grid */}
      {caseStudy.metricsList && caseStudy.metricsList.length > 0 && (
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10">
          <div className="text-xs font-bold text-prime-accent uppercase tracking-wider mb-6">
            Audited Performance Metrics
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.metricsList.map((m: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white gradient-text-purple">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-white">{m.label}</div>
                {m.note && <div className="text-xs text-prime-gray">{m.note}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structured Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Narrative (2 cols) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Section 1: The Challenge */}
          <section className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              The Operational Bottleneck
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Challenge
            </h2>
            <RichTextRenderer content={caseStudy.challenge} />
          </section>

          {/* Section 2: Solution & Architecture */}
          <section className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-accent/15 border border-prime-accent/30 text-prime-accent text-xs font-bold uppercase tracking-wider">
              Architecture & Strategy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Solution
            </h2>
            <RichTextRenderer content={caseStudy.solution} />
          </section>

          {/* Section 3: Implementation & Process */}
          {caseStudy.implementation && (
            <section className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Engineering Execution
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Implementation & Timeline
              </h2>
              <RichTextRenderer content={caseStudy.implementation} />
            </section>
          )}

          {/* Section 4: Results & Business Impact */}
          <section className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Verified ROI
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Results & Impact
            </h2>
            <RichTextRenderer content={caseStudy.results} />
          </section>
        </div>

        {/* Sidebar Info (1 col) */}
        <div className="space-y-8">
          {/* Client Testimonial Box */}
          {caseStudy.testimonialObj && (
            <div className="glass-card rounded-3xl p-7 border border-prime-accent/30 space-y-4 relative overflow-hidden">
              <div className="text-prime-accent text-3xl font-serif">“</div>
              <p className="text-sm text-white/95 leading-relaxed italic">
                {caseStudy.testimonialObj.quote}
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-white">
                  {caseStudy.testimonialObj.name}
                </div>
                <div className="text-xs text-prime-gray">
                  {caseStudy.testimonialObj.role},{" "}
                  <span className="text-white/80">{caseStudy.testimonialObj.company}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          {caseStudy.technologiesList && caseStudy.technologiesList.length > 0 && (
            <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                Technologies & APIs Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologiesList.map((t: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Consultation CTA */}
          <div className="rounded-3xl p-7 bg-gradient-to-br from-prime-accent/20 via-prime-navy to-[#151F36] border border-prime-accent/40 space-y-4">
            <h4 className="text-lg font-bold text-white">
              Facing similar operational bottlenecks?
            </h4>
            <p className="text-xs text-prime-gray leading-relaxed">
              Our Senior Automation Architect can review your architecture and provide an ROI estimate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-prime-accent text-white text-xs font-bold shadow-accent hover:bg-prime-accent-hover transition-all"
            >
              <span>Book a Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Related Case Studies</h3>
              <p className="text-xs text-prime-gray mt-1">Explore other production systems we've engineered</p>
            </div>
            <Link href="/case-studies" className="text-xs sm:text-sm font-semibold text-prime-accent hover:text-white">
              View all case studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}
