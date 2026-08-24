import Link from "next/link";
import { SearchX, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onReset?: () => void;
}

export default function EmptyState({
  title = "No results found",
  description = "We couldn't find any items matching your criteria. Try adjusting your filters or search terms.",
  actionText = "Clear Filters",
  actionHref,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl p-12 text-center border border-dashed border-white/15 bg-white/[0.02] max-w-lg mx-auto my-8 space-y-4">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-prime-gray">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-prime-gray leading-relaxed">{description}</p>
      <div className="pt-2">
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent text-white text-sm font-semibold hover:bg-prime-accent-hover transition-colors"
          >
            <span>{actionText}</span>
          </button>
        ) : actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prime-accent text-white text-sm font-semibold hover:bg-prime-accent-hover transition-colors"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
