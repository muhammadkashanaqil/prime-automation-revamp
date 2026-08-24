"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  Send,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

interface ContactFormClientProps {
  contactPhone?: string;
  contactEmail?: string;
  schedulingUrl?: string;
}

export default function ContactFormClient({
  contactPhone = "",
  contactEmail = "info@primeautomationpl.com",
  schedulingUrl = "https://cal.com/primeautomation/free-audit",
}: ContactFormClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build tel: href from prop
  const telHref = contactPhone ? `tel:+${contactPhone.replace(/\D/g, "")}` : "#";

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    website: "",
    phone: "",
    primaryNeed: "workflow" as "chatbot" | "workflow" | "data" | "ai_model" | "integration" | "ai_audit" | "other",
    message: "",
    budgetRange: "$10k - $25k",
    consent: true,
    websiteUrl_hp: "", // Honeypot
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hasStartedInteracting, setHasStartedInteracting] = useState(false);

  // Capture UTM parameters from URL on mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      utmSource: searchParams.get("utm_source") || "",
      utmMedium: searchParams.get("utm_medium") || "",
      utmCampaign: searchParams.get("utm_campaign") || "",
      utmContent: searchParams.get("utm_content") || "",
      utmTerm: searchParams.get("utm_term") || "",
    }));
  }, [searchParams]);

  const handleFieldChange = (field: string, value: any) => {
    if (!hasStartedInteracting) {
      setHasStartedInteracting(true);
      trackEvent({
        name: "contact_form_start",
        params: { page_path: "/contact" },
      });
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side quick checks
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim() || !formData.workEmail.includes("@")) {
      newErrors.workEmail = "Valid work email is required";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Please describe your bottleneck in at least 10 characters";
    }
    if (!formData.consent) {
      newErrors.consent = "You must agree to our privacy policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          const mapped: Record<string, string> = {};
          Object.entries(data.fieldErrors).forEach(([k, v]) => {
            mapped[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setErrors(mapped);
        }
        throw new Error(data.error || "Failed to submit request");
      }

      // Track conversion
      trackEvent({
        name: "contact_form_submit",
        params: {
          primary_need: formData.primaryNeed,
          page_path: "/contact",
        },
      });

      // Redirect to Thank You page
      router.push("/thank-you");
    } catch (err: any) {
      console.error("Submission error:", err);
      setServerError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleScheduleClick = () => {
    trackEvent({
      name: "schedule_click",
      params: { page_path: "/contact" },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Form (7 cols) */}
      <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-accent/15 border border-prime-accent/30 text-prime-accent text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> 45-Minute Technical Audit
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book a Free Automation Audit
          </h1>
          <p className="text-sm text-prime-gray leading-relaxed">
            Tell us about your current operational bottlenecks. Our Senior Automation Architect will review your workflows and provide an actionable ROI roadmap with zero commitment.
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteUrl_hp">Leave this empty</label>
            <input
              type="text"
              id="websiteUrl_hp"
              tabIndex={-1}
              value={formData.websiteUrl_hp}
              onChange={(e) => handleFieldChange("websiteUrl_hp", e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Full Name <span className="text-prime-accent">*</span>
              </label>
              <input
                type="text"
                placeholder="Sarah Jenkins"
                value={formData.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-prime-gray/60 focus:outline-none transition-colors ${
                  errors.fullName
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-white/10 focus:border-prime-accent"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Work Email <span className="text-prime-accent">*</span>
              </label>
              <input
                type="email"
                placeholder="sarah@company.com"
                value={formData.workEmail}
                onChange={(e) => handleFieldChange("workEmail", e.target.value)}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-prime-gray/60 focus:outline-none transition-colors ${
                  errors.workEmail
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-white/10 focus:border-prime-accent"
                }`}
              />
              {errors.workEmail && (
                <p className="text-xs text-rose-400 mt-1">{errors.workEmail}</p>
              )}
            </div>
          </div>

          {/* Company & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => handleFieldChange("company", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Website URL
              </label>
              <input
                type="url"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => handleFieldChange("website", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Primary Need & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Primary Automation Need <span className="text-prime-accent">*</span>
              </label>
              <select
                value={formData.primaryNeed}
                onChange={(e) => handleFieldChange("primaryNeed", e.target.value)}
                className="w-full bg-prime-navy border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-prime-accent"
              >
                <option value="chatbot">AI Chatbots & Virtual Agents</option>
                <option value="workflow">Workflow Automation (n8n & Custom)</option>
                <option value="data">Data Pipeline & Real-Time ETL</option>
                <option value="ai_model">Custom AI Model Development</option>
                <option value="integration">AI System & ERP Integration</option>
                <option value="ai_audit">AI Audit & Optimization</option>
                <option value="other">Other / Custom Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Estimated Project Budget
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => handleFieldChange("budgetRange", e.target.value)}
                className="w-full bg-prime-navy border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-prime-accent"
              >
                <option value="< $10k">&lt; $10k (Pilot / Discovery)</option>
                <option value="$10k - $25k">$10k - $25k (Standard Build)</option>
                <option value="$25k - $50k">$25k - $50k (Multi-System)</option>
                <option value="$50k+">$50k+ (Enterprise Infrastructure)</option>
              </select>
            </div>
          </div>

          {/* Message / Bottleneck */}
          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Describe Your Process or Bottleneck <span className="text-prime-accent">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="E.g., We spend 30 hours a week manually copy-pasting customer orders into our ERP and answering shipping status tickets..."
              value={formData.message}
              onChange={(e) => handleFieldChange("message", e.target.value)}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-prime-gray/60 focus:outline-none transition-colors ${
                errors.message
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-white/10 focus:border-prime-accent"
              }`}
            />
            {errors.message && (
              <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleFieldChange("consent", e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-prime-accent focus:ring-prime-accent"
              />
              <span className="text-xs text-prime-gray leading-relaxed">
                I agree to allow Prime Automation to process my submission in accordance with the{" "}
                <a href="/privacy" target="_blank" className="text-white underline hover:text-prime-accent">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-rose-400">{errors.consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-prime-accent text-white font-bold text-base shadow-accent-lg hover:bg-prime-accent-hover active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Validating & Scheduling...
              </span>
            ) : (
              <>
                <span>Submit for Free Automation Audit</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column: Contact Details, Direct Booking & Expectation Timeline (5 cols) */}
      <div className="lg:col-span-5 space-y-8">
        {/* Instant Booking Box */}
        <div className="rounded-3xl p-7 bg-gradient-to-br from-[#151F36] to-[#1E1233] border border-prime-accent/40 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-prime-accent/20 border border-prime-accent/40 flex items-center justify-center text-prime-accent">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Prefer to Book Instantly?
              </h3>
              <p className="text-xs text-prime-gray">Select an open slot on our live calendar</p>
            </div>
          </div>

          <p className="text-xs text-prime-gray leading-relaxed">
            Skip the form and pick an available 45-minute time slot directly on our lead architect's calendar.
          </p>

          <a
            href={schedulingUrl || "https://cal.com"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleScheduleClick}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-prime-accent" />
            <span>Open Scheduling Calendar</span>
          </a>
        </div>

        {/* Expectation Timeline: What Happens After Submission */}
        <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-4">
          <span className="text-xs font-bold text-prime-accent uppercase tracking-wider">
            Clear Timeline
          </span>
          <h3 className="text-lg font-bold text-white">
            What Happens After You Submit
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <div className="w-6 h-6 rounded-full bg-prime-accent/20 border border-prime-accent/40 flex items-center justify-center text-prime-accent font-bold shrink-0 text-xs">
                1
              </div>
              <div>
                <span className="font-bold text-white block">Audit Request Review</span>
                <span className="text-prime-gray text-xs">Our engineering lead reviews your submission within 2 hours.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <div className="w-6 h-6 rounded-full bg-prime-accent/20 border border-prime-accent/40 flex items-center justify-center text-prime-accent font-bold shrink-0 text-xs">
                2
              </div>
              <div>
                <span className="font-bold text-white block">Architecture Deep-Dive</span>
                <span className="text-prime-gray text-xs">We host a 45-minute Zoom call mapping your APIs and bottlenecks.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <div className="w-6 h-6 rounded-full bg-prime-accent/20 border border-prime-accent/40 flex items-center justify-center text-prime-accent font-bold shrink-0 text-xs">
                3
              </div>
              <div>
                <span className="font-bold text-white block">Actionable ROI Blueprint</span>
                <span className="text-prime-gray text-xs">We provide a fixed-scope technical roadmap and financial ROI model.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Contact Details */}
        <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-4 text-xs text-prime-gray">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Direct Engineering Inquiries
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-prime-accent" />
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors break-all">
                {contactEmail}
              </a>
            </div>
            {contactPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-prime-accent" />
                <a href={telHref} className="hover:text-white transition-colors">
                  {contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
