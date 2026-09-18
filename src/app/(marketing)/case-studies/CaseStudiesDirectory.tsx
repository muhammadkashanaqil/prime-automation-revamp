"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { PageHero, FinalCTA, Reveal } from "@/components/prime/shared";
import { Dashboard } from "@/components/prime/home";

interface CaseStudiesDirectoryProps {
  initialCaseStudies: any[];
}

export default function CaseStudiesDirectory({ initialCaseStudies }: CaseStudiesDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialCaseStudies.forEach((cs) => {
      if (cs.industry) set.add(cs.industry);
    });
    return ["All", ...Array.from(set)];
  }, [initialCaseStudies]);

  const filteredCaseStudies = useMemo(() => {
    return initialCaseStudies.filter((cs) => {
      const matchesCategory = selectedCategory === "All" || cs.industry === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cs.clientName && cs.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialCaseStudies, selectedCategory, searchQuery]);

  return (
    <>
      <PageHero 
        label="SELECTED WORK" 
        title={<>Behind every result,<br/><span className="accent">a better system.</span></>} 
        description="Explore how connected workflows, AI agents, and data engineering remove friction from real business operations."
      />

      <div className="wrap work-list" style={{ paddingBottom: '80px' }}>
        {/* Filters & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
          <div className="relative" style={{ flex: '1 1 300px' }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search case studies..."
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

        {/* Case Studies Grid */}
        {filteredCaseStudies.length > 0 ? (
          <div className="project-grid">
            {filteredCaseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.06}>
                <Link className="project-card" href={`/case-studies/${cs.slug}`}>
                  <div 
                    className="project-card-visual" 
                    style={{ 
                      padding: 0, 
                      overflow: 'hidden', 
                      position: 'relative', 
                      height: i === 0 ? '440px' : '300px',
                      background: '#151e2e',
                      borderRadius: '14px',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    {cs.heroImageUrl ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={cs.heroImageUrl}
                          alt={cs.heroImageAlt || cs.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
                          className="card-image-hover"
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(12, 19, 34, 0.88) 0%, rgba(12, 19, 34, 0.25) 55%, transparent 100%)',
                            pointerEvents: 'none'
                          }}
                        />
                        {cs.featuredResult && (
                          <div 
                            style={{
                              position: 'absolute',
                              bottom: '16px',
                              left: '16px',
                              zIndex: 2,
                              padding: '6px 14px',
                              borderRadius: '9999px',
                              background: 'rgba(200, 42, 239, 0.35)',
                              border: '1px solid rgba(200, 42, 239, 0.6)',
                              backdropFilter: 'blur(8px)',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#ffffff'
                            }}
                          >
                            {cs.featuredResult}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ padding: '20px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Dashboard kind={cs.industry?.toLowerCase().includes('fin') ? 'finance' : cs.industry?.toLowerCase().includes('log') ? 'logistics' : 'retail'} />
                      </div>
                    )}
                  </div>
                  <div className="project-card-meta">
                    <span>{cs.industry || "Case Study"}</span>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>
                    {cs.title} <ArrowUpRight size={22} />
                  </h3>
                  <p>
                    {cs.clientName || "Client"} <span>—</span> {cs.excerpt || "Read how we solved this problem."}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No case studies found matching your criteria.
          </div>
        )}
      </div>

      <FinalCTA />
    </>
  );
}
