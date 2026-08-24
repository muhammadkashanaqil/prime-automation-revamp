import type { Metadata } from "next";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Prime Automation Pvt. Ltd. Privacy Policy and data protection standards.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-prime-gray">Last updated: August 2026</p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 text-prime-gray text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p>
            Prime Automation Pvt. Ltd. (&ldquo;Prime Automation&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy and security of your personal and business data. This Privacy Policy outlines how we collect, use, and safeguard information submitted through our website (<a href="https://www.primeautomationpl.com" className="text-prime-accent underline">primeautomationpl.com</a>), contact audit forms, and live AI assistant widgets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Contact Form & Audit Submissions</h2>
          <p>
            When you submit an automation audit request or contact inquiry, we collect your name, business email address, company name, phone number (if provided), project details, and UTM campaign attribution data. This information is utilized solely to evaluate your technical requirements, prepare audit blueprints, and communicate with you regarding engineering consultations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. AI Chatbot & Messaging Data Handling</h2>
          <p>
            Our website includes an interactive AI assistant widget. Messages sent to the assistant are routed securely through our server endpoints to evaluate your questions and provide automated recommendations. We enforce strict data handling rules:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not sell, rent, or trade conversation transcripts to third parties.</li>
            <li>We use zero-data-retention enterprise API endpoints where inputs are not used to train public foundation models.</li>
            <li>Session IDs are stored temporarily in your browser&apos;s local storage to provide multi-turn conversation continuity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Data Security & Storage</h2>
          <p>
            All data in transit is encrypted using modern TLS 1.3 encryption. Backend database records are stored in secure PostgreSQL instances adhering to industry-standard access control and isolation policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contact Us</h2>
          <p>
            If you have questions regarding this policy or wish to request the deletion of your contact records, please contact our data compliance officer at:
          </p>
          <p className="font-semibold text-white">
            Prime Automation Pvt. Ltd.<br />
            Email: <a href="mailto:info@primeautomationpl.com" className="text-prime-accent underline">info@primeautomationpl.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
