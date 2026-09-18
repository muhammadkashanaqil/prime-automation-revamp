"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PageHero, FinalCTA } from "@/components/prime/shared";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface FAQDirectoryProps {
  initialFaqs: any[];
}

export default function FAQDirectory({ initialFaqs }: FAQDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialFaqs.forEach((faq) => {
      if (faq.category) set.add(faq.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialFaqs]);

  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  return (
    <>
      <PageHero 
        label="CLEAR ANSWERS" 
        title={<>Good systems start<br/>with <span className="accent">good questions.</span></>} 
        description="What we build, how we work, and what to expect when we work together."
      />
      
      <div className="wrap faq-page" style={{ paddingBottom: '100px' }}>
        {/* Filters & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
          <div className="relative" style={{ flex: '1 1 300px' }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics or keywords..."
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

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="faq-list">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem value={`faq-${i}`} key={i}>
                <AccordionTrigger>
                  <span className="faq-num">0{i + 1}</span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No questions found matching your query.
          </div>
        )}
      </div>

      <FinalCTA />
    </>
  );
}
