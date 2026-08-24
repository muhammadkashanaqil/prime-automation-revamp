import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import CTASection from "@/components/marketing/CTASection";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import {
  ShieldCheck,
  Cpu,
  Workflow,
  Zap,
  Terminal,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Enterprise AI & Autonomous Engineering",
  description:
    "Prime Automation Pvt. Ltd. is an operational engineering agency building production-grade AI agents, workflow orchestrations via n8n, and real-time data pipelines.",
};

export default function AboutPage() {
  const principles = [
    {
      icon: Terminal,
      title: "Practical, Production-Tested Automation",
      description:
        "We reject fragile no-code toys that break when schemas shift. We construct typed, version-controlled systems on self-hosted n8n, robust PostgreSQL clusters, and modular Python/TypeScript workers.",
    },
    {
      icon: TrendingUp,
      title: "Audited Financial & Operational Outcomes",
      description:
        "Every deployment is bound to measurable milestones: reduced support overhead, accelerated speed-to-lead, eliminated manual entry hours, and verified 99.9%+ pipeline SLAs.",
    },
    {
      icon: ShieldCheck,
      title: "Maintainable & Self-Hosted Architectures",
      description:
        "You retain 100% ownership of your database records, workflow definitions, and prompts. We build with zero vendor lock-in and zero public model data retention.",
    },
    {
      icon: Award,
      title: "Long-Term Engineering Partnership",
      description:
        "Deployment is day one. We provide active telemetry monitoring, real-time error alerts, proactive schema migration, and prompt fine-tuning so systems never degrade silently.",
    },
  ];

  const capabilitiesMatrix = [
    { area: "Orchestration & Logic", tech: "Self-Hosted n8n, Custom State Machines, Queue Workers" },
    { area: "LLM & Vector Intelligence", tech: "Claude 3.5 Sonnet, GPT-4o, Pinecone Vector RAG, Deterministic Tool Calling" },
    { area: "Data Engineering & ETL", tech: "PostgreSQL, Supabase, Kafka Streams, Real-Time Webhooks" },
    { area: "Security & Compliance", tech: "Zero-Retention APIs, Scoped Role RBAC, SOC2 Compliant Storage" },
  ];

  return (
    <div className="space-y-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Engineering Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            We build autonomous systems for companies that{" "}
            <span className="text-prime-purple">refuse to run on manual bottlenecks.</span>
          </h1>
          <p className="text-base sm:text-lg text-prime-gray leading-relaxed max-w-3xl">
            Prime Automation Pvt. Ltd. was founded to bridge the divide between theoretical AI research and mission-critical enterprise operations. We build software that performs real work with deterministic reliability.
          </p>
        </div>
      </section>

      {/* 2-Column Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-prime-purple uppercase tracking-wider">
              The Problem We Solve
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Traditional Business Automation Fails
            </h2>
            <p className="text-prime-gray text-base leading-relaxed">
              Modern enterprises operate dozens of siloed tools. High-value knowledge workers waste upwards of 40% of their day copying data between CRMs, answering repetitive inquiries, and manually compiling reports.
            </p>
            <p className="text-prime-gray text-base leading-relaxed">
              Off-the-shelf chatbots hallucinate, while basic no-code tools crash on unexpected inputs. We engineer custom architectures with strict deterministic guardrails, structured database transactions, and self-hosted reliability.
            </p>
          </div>

          <div className="lg:col-span-6">
            <BrowserFrame
              url="app.primeautomation.ai/architecture/overview"
              title="Prime Autonomous Stack Architecture"
            >
              <div className="p-6 bg-[#090D1A] space-y-4 text-xs font-mono text-white">
                <div className="text-prime-purple font-bold text-[11px] uppercase tracking-wider">
                  Core Engineering Stack:
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>⚡ Orchestration Engine</span>
                    <span className="text-emerald-400 font-bold">n8n Cluster</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>🧠 AI Reasoning Model</span>
                    <span className="text-prime-purple font-bold">Claude 3.5 + Vector RAG</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>🗄️ Relational Database</span>
                    <span className="text-sky-400 font-bold">Supabase PostgreSQL</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>🛡️ Deterministic Guardrails</span>
                    <span className="text-emerald-400 font-bold">100% Policy Bound</span>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </section>

      {/* 4 Large Principle Blocks (Light Editorial Surface) */}
      <section className="py-24 bg-[#f9e9fe] text-[#0C1322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-prime-purple uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C1322] tracking-tight">
              The Standards Behind Every System We Deploy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-gray-200 shadow-card space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-prime-purple/15 text-prime-purple flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C1322]">{p.title}</h3>
                  <p className="text-sm text-[#6F7582] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-prime-purple uppercase tracking-wider">
            Technical Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Architecture &amp; Security Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilitiesMatrix.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 space-y-2"
            >
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-prime-purple" />
                <span>{item.area}</span>
              </div>
              <div className="text-xs text-prime-gray font-mono">{item.tech}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Partner with Prime Automation?"
        subtitle="Book a 45-minute technical audit with our Senior Automation Architect. Let's design your operational roadmap."
      />
    </div>
  );
}
