import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Calendar } from "lucide-react";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    coverImageUrl?: string | null;
    coverImageAlt?: string | null;
    author: string;
    readingTime?: string | null;
    publishedAt?: Date | string | null;
    categoriesList?: string[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  const coverImage =
    post.coverImageUrl ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <article className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group transition-all duration-300">
      <div>
        {/* Cover Image 16:10 */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-prime-navy-dark">
          <Image
            src={coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prime-navy via-transparent to-transparent opacity-70" />

          {/* Primary Category Badge */}
          {post.categoriesList && post.categoriesList.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-lg bg-prime-navy/90 backdrop-blur-md border border-white/15 text-prime-purple text-xs font-bold">
                {post.categoriesList[0]}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-prime-gray mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-prime-purple" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-prime-purple" />
              {post.readingTime || "5 min read"}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-prime-purple group-hover:underline transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-prime-gray leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-1">
        <Link
          href={`/insights/${post.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-prime-purple group-hover:text-white transition-colors"
        >
          <span>Read Technical Guide</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
