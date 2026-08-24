"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Globe,
  Share2,
} from "lucide-react";

export default function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: initialSettings?.businessName || "Prime Automation Pvt. Ltd.",
    email: initialSettings?.email || "info@primeautomationpl.com",
    phone: initialSettings?.phone || "+1 (800) 555-AUTO",
    schedulingUrl: initialSettings?.schedulingUrl || "https://cal.com/primeautomation/free-audit",
    socialLinks: {
      linkedin: initialSettings?.socialLinks?.linkedin || "https://linkedin.com/company/prime-automation",
      twitter: initialSettings?.socialLinks?.twitter || "https://x.com/primeautomation",
      github: initialSettings?.socialLinks?.github || "https://github.com/prime-automation",
      youtube: initialSettings?.socialLinks?.youtube || "https://youtube.com/@primeautomation",
    },
    defaultSeoTitle: initialSettings?.defaultSeoTitle || "Prime Automation | Custom AI & Operational Automation Systems",
    defaultSeoDescription: initialSettings?.defaultSeoDescription || "Prime Automation builds enterprise-grade AI chatbots, automated workflows, data pipelines, and custom AI integrations that scale your operations.",
    footerText: initialSettings?.footerText || "Enterprise-grade AI systems, intelligent workflows, and data pipelines engineered for measurable ROI.",
    chatbotWelcomeMessage: initialSettings?.chatbotWelcomeMessage || "👋 Hello! Welcome to Prime Automation. I can help answer questions about our AI services, explain our automation process, or help you book a free audit. How can I assist you today?",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update settings");
      }

      setSuccessMessage("Site settings saved and revalidated successfully!");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Site & Global Settings
          </h1>
          <p className="text-xs sm:text-sm text-prime-gray mt-1">
            Configure company contact info, default SEO tags, scheduling calendar, and chatbot welcome copy.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white text-xs font-bold shadow-accent transition-all active:scale-95 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm">
          {successMessage}
        </div>
      )}

      {/* General Company Info */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-prime-accent" />
          <span>Company & Contact Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Primary Contact Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Cal.com / Calendly Scheduling URL
            </label>
            <input
              type="url"
              value={formData.schedulingUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, schedulingUrl: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Footer Tagline
          </label>
          <input
            type="text"
            value={formData.footerText}
            onChange={(e) => setFormData((prev) => ({ ...prev, footerText: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Chatbot Settings */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-prime-accent" />
          <span>Chatbot Widget Configuration</span>
        </h2>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Initial Welcome Message *
          </label>
          <textarea
            rows={3}
            required
            value={formData.chatbotWelcomeMessage}
            onChange={(e) => setFormData((prev) => ({ ...prev, chatbotWelcomeMessage: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Default SEO Defaults */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-prime-accent" />
          <span>Default Site SEO Defaults</span>
        </h2>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Default Site Title Template *
          </label>
          <input
            type="text"
            required
            value={formData.defaultSeoTitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, defaultSeoTitle: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Default Meta Description *
          </label>
          <textarea
            rows={3}
            required
            value={formData.defaultSeoDescription}
            onChange={(e) => setFormData((prev) => ({ ...prev, defaultSeoDescription: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4 text-prime-accent" />
          <span>Social Media Profiles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-prime-gray mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-[11px] text-prime-gray mb-1">Twitter / X URL</label>
            <input
              type="url"
              value={formData.socialLinks.twitter}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-[11px] text-prime-gray mb-1">GitHub Organization URL</label>
            <input
              type="url"
              value={formData.socialLinks.github}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, github: e.target.value },
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label className="block text-[11px] text-prime-gray mb-1">YouTube URL</label>
            <input
              type="url"
              value={formData.socialLinks.youtube}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, youtube: e.target.value },
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
