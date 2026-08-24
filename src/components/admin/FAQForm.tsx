"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2, Plus, X } from "lucide-react";

interface FAQFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function FAQForm({ initialData, isEdit = false }: FAQFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    category: initialData?.category || "Services & Scope",
    relatedServices: initialData?.relatedServicesList || [],
    featured: initialData?.featured || false,
    sortOrder: initialData?.sortOrder ?? 0,
    status: initialData?.status || "PUBLISHED",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories = [
    "Services & Scope",
    "Process & Timelines",
    "Chatbots & AI",
    "Pricing & ROI",
    "Security & Tech Stack",
    "General",
  ];

  const handleSave = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const url = "/api/admin/faqs";
      const method = isEdit ? "PUT" : "POST";
      const bodyData = isEdit ? { id: initialData.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save FAQ");
      }

      setSuccessMessage("FAQ saved successfully!");

      if (!isEdit && data.item?.id) {
        router.push(`/admin/faqs/${data.item.id}/edit`);
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
    <div className="space-y-8 max-w-3xl pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/faqs"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-prime-gray hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isEdit ? "Edit FAQ" : "Create New FAQ"}
            </h1>
            <p className="text-xs text-prime-gray">
              {isEdit ? "Update question, answer, and category" : "Add a question to knowledge base"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white text-xs font-bold shadow-accent transition-all active:scale-95 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save FAQ</span>
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

      {/* Main Form Fields */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Question *
          </label>
          <input
            type="text"
            required
            value={formData.question}
            onChange={(e) => setFormData((prev) => ({ ...prev, question: e.target.value }))}
            placeholder="How does Prime Automation work with our existing software stack?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full bg-prime-navy border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Answer Content *
          </label>
          <textarea
            rows={6}
            required
            value={formData.answer}
            onChange={(e) => setFormData((prev) => ({ ...prev, answer: e.target.value }))}
            placeholder="We never force you to replace tools that already work. We integrate directly with your existing platforms..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white leading-relaxed focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full bg-prime-navy border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Sort Order (Index)
            </label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-prime-accent focus:ring-prime-accent"
              />
              <span className="text-xs text-white font-semibold">
                Pin to Homepage FAQ
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
