"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/marketing/PostCard";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import EmptyState from "@/components/marketing/EmptyState";
import CTASection from "@/components/marketing/CTASection";
import { Search, Sparkles, Terminal, Calendar, Clock, ArrowRight } from "lucide-react";

interface InsightsDirectoryProps {
  initialPosts: any[];
}

export default function InsightsDirectory({ initialPosts }: InsightsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((post) => {
      if (post.categoriesList) {
        post.categoriesList.forEach((c: string) => set.add(c));
      }
    });
    return ["All", ...Array.from(set)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (post.categoriesList && post.categoriesList.includes(selectedCategory));
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Insights" }]} />

      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-purple/15 border border-prime-purple/30 text-prime-purple text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" /> Engineering &amp; Architecture Hub
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
          Engineering guides &amp; <br />
          <span className="text-prime-purple">technical blueprints.</span>
        </h1>
        <p className="text-base sm:text-lg text-prime-gray leading-relaxed">
          In-depth technical guides on self-hosted n8n orchestrations, multi-agent LLM systems, and high-throughput data pipeline architectures.
        </p>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-prime-purple text-white shadow-accent"
                    : "bg-white/5 hover:bg-white/10 text-prime-gray hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-prime-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-prime-gray/70 focus:outline-none focus:border-prime-purple"
          />
        </div>
      </div>

      {/* Featured 7/5 Split Post */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <div className="glass-card rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols Visual */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-prime-navy-dark">
              <Image
                src={
                  featuredPost.coverImageUrl ||
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                }
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-navy/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-lg bg-prime-purple text-white text-xs font-bold shadow-accent">
                  Featured Blueprint
                </span>
              </div>
            </div>

            {/* Right 5 Cols Copy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3 text-xs text-prime-gray">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-prime-purple" />
                  {featuredPost.publishedAt
                    ? new Date(featuredPost.publishedAt).toLocaleDateString()
                    : "Recent"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-prime-purple" />
                  {featuredPost.readingTime || "6 min read"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-prime-gray leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/insights/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-prime-purple text-white text-xs font-bold shadow-accent hover:bg-prime-accent-hover transition-all"
                >
                  <span>Read Full Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-Column Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === "All" && !searchQuery ? remainingPosts : filteredPosts).map(
            (post) => (
              <PostCard key={post.id} post={post} />
            )
          )}
        </div>
      ) : (
        <EmptyState
          title="No articles match your search"
          description="Try broadening your category or clearing your search term."
          onReset={() => {
            setSelectedCategory("All");
            setSearchQuery("");
          }}
        />
      )}

      {/* Final CTA */}
      <CTASection
        title="Ready to Implement These Architectures in Production?"
        subtitle="Schedule a free 45-minute technical audit. We'll examine your workflows and design a custom automation roadmap."
      />
    </div>
  );
}
