"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import { SERVICES_LIST } from "@/lib/services-data";
import {
  Save,
  ArrowLeft,
  Eye,
  Trash2,
  Plus,
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Layers,
  MessageSquareQuote,
  CheckSquare,
} from "lucide-react";

interface CaseStudyFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CaseStudyForm({ initialData, isEdit = false }: CaseStudyFormProps) {
  const router = useRouter();

  // Helper to parse challenge/solution/implementation/results whether string or object
  const parseSection = (val: any) => {
    if (!val) return "";
    if (typeof val === "object") {
      try {
        return JSON.stringify(val, null, 2);
      } catch {
        return String(val);
      }
    }
    return String(val);
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    status: initialData?.status || "DRAFT",
    clientName: initialData?.clientName || "",
    industry: initialData?.industry || "E-Commerce & Retail",
    services: initialData?.servicesList || ["workflow-automation"],
    excerpt: initialData?.excerpt || "Comprehensive architectural case study outlining system design, automated workflows, and measurable ROI.",
    heroImageUrl: initialData?.heroImageUrl || "",
    heroImageAlt: initialData?.heroImageAlt || "",
    featured: initialData?.featured || false,
    featuredResult: initialData?.featuredResult || "",
    metrics: initialData?.metricsList || [
      { label: "Labor Time Saved", value: "65%", note: "Tier-1 queries deflected" },
      { label: "Response Latency", value: "12 sec", note: "Down from 4 hours" },
    ],
    challenge: parseSection(initialData?.challenge) || "{\n  \"summary\": \"Describe the client's operational bottleneck...\",\n  \"bulletPoints\": [\n    \"High support wait times during peak hours\",\n    \"Fragmented legacy databases\"\n  ]\n}",
    solution: parseSection(initialData?.solution) || "{\n  \"summary\": \"Describe the architecture and system deployed...\",\n  \"bulletPoints\": [\n    \"Self-hosted n8n workflow cluster\",\n    \"Custom RAG vector database\"\n  ]\n}",
    implementation: parseSection(initialData?.implementation) || "{\n  \"summary\": \"Phased rollout and testing plan...\",\n  \"bulletPoints\": [\n    \"Week 1-2: Discovery & Audit\",\n    \"Week 3-4: Build & Sandbox Testing\"\n  ]\n}",
    results: parseSection(initialData?.results) || "{\n  \"summary\": \"Measurable ROI and outcomes achieved...\",\n  \"bulletPoints\": [\n    \"68% ticket deflection\",\n    \"$180,000 annual operational savings\"\n  ]\n}",
    technologies: initialData?.technologiesList || ["n8n", "OpenAI GPT-4o", "PostgreSQL", "Supabase"],
    testimonial: initialData?.testimonialObj || {
      quote: "",
      name: "",
      role: "",
      company: "",
    },
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    ogImageUrl: initialData?.ogImageUrl || "",
    noindex: initialData?.noindex || false,
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-generate slug from title on creation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEdit
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : prev.slug,
    }));
  };

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      const nextServices = exists
        ? prev.services.filter((s: string) => s !== slug)
        : [...prev.services, slug];
      return {
        ...prev,
        services: nextServices.length > 0 ? nextServices : [slug],
      };
    });
  };

  const handleMetricChange = (index: number, field: string, val: string) => {
    const updated = [...formData.metrics];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, metrics: updated }));
  };

  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: "New Metric", value: "99%", note: "" }],
    }));
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
    }
    setTechInput("");
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t: string) => t !== tech),
    }));
  };

  const handleSave = async (publishStatus?: "DRAFT" | "PUBLISHED") => {
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);
    setIsSubmitting(true);

    // Clean up testimonial if empty
    const testimonialPayload =
      formData.testimonial?.quote && formData.testimonial.quote.trim().length > 0
        ? formData.testimonial
        : null;

    // Ensure title and slug exist
    const finalTitle = formData.title?.trim() || "Untitled Case Study";
    const finalSlug =
      formData.slug?.trim() ||
      finalTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `case-study-${Date.now()}`;

    const payload = {
      ...formData,
      title: finalTitle,
      slug: finalSlug,
      excerpt:
        formData.excerpt?.trim() ||
        `${finalTitle} - Enterprise operational case study by Prime Automation.`,
      status: publishStatus || formData.status,
      testimonial: testimonialPayload,
    };

    try {
      const url = "/api/admin/case-studies";
      const method = isEdit ? "PUT" : "POST";
      const bodyData = isEdit ? { id: initialData.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          const flat: Record<string, string> = {};
          Object.entries(data.details).forEach(([k, v]) => {
            flat[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setFieldErrors(flat);
        }
        throw new Error(data.error || "Failed to save case study");
      }

      setSuccessMessage(
        publishStatus === "PUBLISHED"
          ? "Case study published successfully!"
          : "Draft saved successfully!"
      );

      if (!isEdit && data.item?.id) {
        router.push(`/admin/case-studies/${data.item.id}/edit`);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/case-studies"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-prime-gray hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isEdit ? "Edit Case Study" : "Create New Case Study"}
            </h1>
            <p className="text-xs text-prime-gray">
              {isEdit ? `Editing: ${formData.title}` : "Fill in the architecture breakdown below"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isEdit && formData.status === "PUBLISHED" && (
            <Link
              href={`/case-studies/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Live</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSave("DRAFT")}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("PUBLISHED")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white text-xs font-bold shadow-accent transition-all active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Case Study</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">{error}</div>
            {Object.keys(fieldErrors).length > 0 && (
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {Object.entries(fieldErrors).map(([field, msg]) => (
                  <li key={field}>
                    <strong className="capitalize">{field}:</strong> {msg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Content & Narrative */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Basic Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Case Study Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Autonomous Multi-Channel Support & Intelligent Lead Routing"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-prime-accent"
              />
              {isEdit && formData.status === "PUBLISHED" && (
                <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Changing the slug of a published page will change its public URL.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Client / Project Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="OmniRetail Global"
                  value={formData.clientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E-Commerce & Retail"
                  value={formData.industry}
                  onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
                />
              </div>
            </div>

            {/* Related Services Selector */}
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Related Services (Select one or more) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {SERVICES_LIST.map((srv) => {
                  const isChecked = formData.services.includes(srv.slug);
                  return (
                    <button
                      key={srv.slug}
                      type="button"
                      onClick={() => toggleService(srv.slug)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all ${
                        isChecked
                          ? "bg-prime-accent/20 border-prime-accent text-white"
                          : "bg-white/5 border-white/10 text-prime-gray hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isChecked ? "bg-prime-accent border-prime-accent" : "border-white/30"
                        }`}
                      >
                        {isChecked && <CheckSquare className="w-3 h-3 text-white" />}
                      </span>
                      <span className="truncate">{srv.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Card & Meta Excerpt * (~140-180 chars)
              </label>
              <textarea
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="How a high-volume e-commerce brand reduced first-response time from 4 hours to 12 seconds..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Key Metrics Manager */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Audited Performance Metrics (1-4 Items)
              </h3>
              <button
                type="button"
                onClick={handleAddMetric}
                className="inline-flex items-center gap-1 text-xs text-prime-accent hover:text-white font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.metrics.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="Value (e.g. 68%)"
                    value={m.value}
                    onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                    className="w-full sm:w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Ticket Deflection)"
                    value={m.label}
                    onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                    className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                  />
                  <input
                    type="text"
                    placeholder="Note (optional)"
                    value={m.note || ""}
                    onChange={(e) => handleMetricChange(idx, "note", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="p-1.5 rounded-lg text-prime-gray hover:text-rose-400 hover:bg-rose-500/10 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Content Sections */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Architecture Narrative (JSON or Freeform Text)
            </h3>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                1. The Challenge *
              </label>
              <textarea
                rows={5}
                required
                value={formData.challenge}
                onChange={(e) => setFormData((prev) => ({ ...prev, challenge: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                2. The Solution *
              </label>
              <textarea
                rows={5}
                required
                value={formData.solution}
                onChange={(e) => setFormData((prev) => ({ ...prev, solution: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                3. Implementation & Timeline (Optional)
              </label>
              <textarea
                rows={4}
                value={formData.implementation}
                onChange={(e) => setFormData((prev) => ({ ...prev, implementation: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                4. Results & ROI Impact *
              </label>
              <textarea
                rows={5}
                required
                value={formData.results}
                onChange={(e) => setFormData((prev) => ({ ...prev, results: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-prime-accent" />
              <span>Client Testimonial (Optional)</span>
            </h3>

            <div>
              <label className="block text-[11px] text-prime-gray mb-1">Quote</label>
              <textarea
                rows={3}
                placeholder="Prime Automation built a system that fundamentally transformed how we operate..."
                value={formData.testimonial?.quote || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    testimonial: { ...prev.testimonial, quote: e.target.value },
                  }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-prime-gray mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="Elena Rostova"
                  value={formData.testimonial?.name || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: { ...prev.testimonial, name: e.target.value },
                    }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                />
              </div>
              <div>
                <label className="block text-[11px] text-prime-gray mb-1">Role / Title</label>
                <input
                  type="text"
                  placeholder="VP Operations"
                  value={formData.testimonial?.role || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: { ...prev.testimonial, role: e.target.value },
                    }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                />
              </div>
              <div>
                <label className="block text-[11px] text-prime-gray mb-1">Company</label>
                <input
                  type="text"
                  placeholder="OmniRetail"
                  value={formData.testimonial?.company || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: { ...prev.testimonial, company: e.target.value },
                    }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Settings, Media, Tech & SEO */}
        <div className="space-y-6">
          {/* Status & Homepage Pinning */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Publish Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Current Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full bg-prime-navy border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prime-accent"
              >
                <option value="DRAFT">DRAFT (Hidden from public)</option>
                <option value="PUBLISHED">PUBLISHED (Live on site)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded text-prime-accent focus:ring-prime-accent"
                />
                <span className="text-xs text-white font-semibold">
                  Pin to Homepage (Featured)
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Featured Result Badge
              </label>
              <input
                type="text"
                placeholder="68% Ticket Deflection"
                value={formData.featuredResult}
                onChange={(e) => setFormData((prev) => ({ ...prev, featuredResult: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <ImageUploader
              value={formData.heroImageUrl}
              altValue={formData.heroImageAlt}
              onChange={(url) => setFormData((prev) => ({ ...prev, heroImageUrl: url }))}
              onAltChange={(alt) => setFormData((prev) => ({ ...prev, heroImageAlt: alt }))}
              label="Hero Image"
            />
          </div>

          {/* Technologies Stack Tags */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Technologies Stack
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tech (e.g. n8n)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-2 rounded-xl bg-prime-accent text-white text-xs font-bold shrink-0"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {formData.technologies.map((t: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(t)}
                    className="text-prime-gray hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Overrides */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              SEO Overrides
            </h3>
            <div>
              <label className="block text-[11px] text-prime-gray mb-1">SEO Title Override</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
              />
            </div>
            <div>
              <label className="block text-[11px] text-prime-gray mb-1">SEO Meta Description</label>
              <textarea
                rows={2}
                value={formData.seoDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
