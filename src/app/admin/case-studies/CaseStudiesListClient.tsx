"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function CaseStudiesListClient({ initialCaseStudies }: { initialCaseStudies: any[] }) {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredItems = useMemo(() => {
    return caseStudies.filter((item) => {
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.clientName && item.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.industry.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [caseStudies, statusFilter, searchQuery]);

  const itemToDelete = caseStudies.find((item) => item.id === deletingId);

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/case-studies?id=${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete case study");

      setCaseStudies((prev) => prev.filter((item) => item.id !== deletingId));
      setDeletingId(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error deleting record");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-prime-gray mt-1">
            Manage published proof of work, challenge breakdowns, architecture solutions, and metrics.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white text-xs font-bold shadow-accent transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Case Study</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-prime-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, client, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-prime-gray">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-prime-navy border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prime-accent"
          >
            <option value="ALL">All Statuses ({caseStudies.length})</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Drafts</option>
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-prime-gray border-b border-white/10 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Case Study</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold text-white text-sm hover:text-prime-accent transition-colors">
                        <Link href={`/admin/case-studies/${item.id}/edit`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-[11px] text-prime-gray mt-0.5 flex items-center gap-2">
                        <span>Slug: /{item.slug}</span>
                        {item.clientName && <span>• Client: {item.clientName}</span>}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-white/90">
                      {item.industry}
                    </td>

                    <td className="py-4 px-4">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 text-prime-accent font-semibold">
                          <Sparkles className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="text-prime-gray">No</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {item.status === "PUBLISHED" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-prime-gray text-[11px]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        {item.status === "PUBLISHED" && (
                          <Link
                            href={`/case-studies/${item.slug}`}
                            target="_blank"
                            title="View Public Page"
                            className="p-1.5 rounded-lg text-prime-gray hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/case-studies/${item.id}/edit`}
                          title="Edit Record"
                          className="p-1.5 rounded-lg text-prime-gray hover:text-prime-accent hover:bg-prime-accent/10 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(item.id)}
                          title="Delete Record"
                          className="p-1.5 rounded-lg text-prime-gray hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-prime-gray">
                    No case studies match your query. Click &ldquo;Create Case Study&rdquo; to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="Delete Case Study"
        itemName={itemToDelete?.title || "this case study"}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
