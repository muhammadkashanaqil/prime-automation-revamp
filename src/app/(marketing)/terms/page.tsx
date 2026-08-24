import type { Metadata } from "next";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Prime Automation Pvt. Ltd. Terms and Conditions.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-prime-gray">Last updated: August 2026</p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 text-prime-gray text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Prime Automation website, submitting audit requests, or interacting with our automated systems, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Engineering Engagements & Audits</h2>
          <p>
            Informational consultations, free audits, and ROI estimates provided on this website are for discovery and architectural planning purposes only. Formal engineering scopes, guarantees, and service level agreements (SLAs) are governed exclusively by executed Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
          <p>
            All website materials, branding, proprietary schemas, and case study narratives remain the intellectual property of Prime Automation Pvt. Ltd. Client deliverables and custom workflows developed under paid engagements are assigned to the client according to specific MSA terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable laws without regard to conflict of law principles.
          </p>
        </section>
      </div>
    </div>
  );
}
