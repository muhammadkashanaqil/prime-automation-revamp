"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { PageHero, FinalCTA, Reveal } from "@/components/prime/shared";

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

  return (
    <>
      <PageHero 
        label="INSIGHTS & IDEAS" 
        title={<>The thinking behind<br/><span className="accent">what comes next.</span></>} 
        description="Practical perspectives on AI, automation, and building systems that work."
      />

      <div className="wrap insights-list" style={{ paddingBottom: '80px' }}>
        {/* Filters & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
          <div className="relative" style={{ flex: '1 1 300px' }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-input border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-ring transition-colors"
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="article-grid">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link href={`/insights/${post.slug}`} className="article-card">
                  <div className={`article-art article-art-${i % 3}`}>
                    <span>{['ROI', 'DATA', 'AI'][i % 3]}</span>
                    <ArrowUpRight size={35} />
                  </div>
                  <div className="article-meta">
                    <span>{post.categoriesList?.[0] || 'Insight'}</span>
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="text-link">Read insight <ArrowUpRight size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No insights found matching your criteria.
          </div>
        )}
      </div>

      <FinalCTA />
    </>
  );
}
