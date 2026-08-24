import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getPublishedPosts } from "@/lib/cms/posts";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
import PostCard from "@/components/marketing/PostCard";
import CTASection from "@/components/marketing/CTASection";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag } from "lucide-react";

interface PostDetailProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PostDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle || `${post.title} | Insights`,
    description: post.seoDescription || post.excerpt,
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.ogImageUrl || post.coverImageUrl ? [{ url: post.ogImageUrl || post.coverImageUrl! }] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const allPosts = await getPublishedPosts({ limit: 4 });
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const coverImage =
    post.coverImageUrl ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: coverImage,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: post.author || "Prime Automation Pvt. Ltd.",
    },
    publisher: {
      "@type": "Organization",
      name: "Prime Automation Pvt. Ltd.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.primeautomationpl.com/brand/logo.svg",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />

      {/* Header Info */}
      <div className="space-y-6">
        {/* Categories */}
        {post.categoriesList && post.categoriesList.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categoriesList.map((cat: string, idx: number) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full bg-prime-accent/20 border border-prime-accent/40 text-prime-accent text-xs font-bold uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-prime-gray leading-relaxed">
          {post.excerpt}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-prime-gray">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-white font-medium">
              <User className="w-4 h-4 text-prime-accent" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-prime-accent" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-prime-accent" />
              {post.readingTime || "5 min read"}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src={coverImage}
          alt={post.coverImageAlt || post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Main Body */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl">
        <RichTextRenderer content={post.bodyJson || post.body} />
      </div>

      {/* In-Article CTA Box */}
      <div className="rounded-3xl p-8 bg-gradient-to-br from-[#151F36] via-[#111A2E] to-[#1E1233] border border-prime-accent/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">
            Want to implement this architecture in your business?
          </h3>
          <p className="text-xs sm:text-sm text-prime-gray">
            Book a complimentary 45-minute automation audit with our lead engineering team.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 rounded-xl bg-prime-accent hover:bg-prime-accent-hover text-white text-xs sm:text-sm font-bold shadow-accent transition-all shrink-0 active:scale-95"
        >
          Book Free Audit
        </Link>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Related Insights</h3>
            <Link href="/insights" className="text-xs sm:text-sm font-semibold text-prime-accent hover:text-white">
              View all articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
