"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  faqs?: FAQItem[];
}

export default function FAQAccordion({ items, faqs }: FAQAccordionProps) {
  const faqList = items || faqs || [];
  const [openId, setOpenId] = useState<string | null>(faqList[0]?.id || null);

  // Check URL hash on load for deep linking
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const matched = faqList.find(
        (item) =>
          item.id === hashId ||
          item.question.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(hashId)
      );
      if (matched) {
        setOpenId(matched.id);
      }
    }
  }, [faqList]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!faqList || faqList.length === 0) {
    return (
      <div className="text-center py-12 text-prime-gray">
        No FAQs available in this category.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {faqList.map((item, index) => {
        const isOpen = openId === item.id;
        const slugAnchor = item.question
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 40);

        return (
          <div
            key={item.id}
            id={slugAnchor}
            className={`min-h-[64px] rounded-2xl transition-all duration-200 border ${
              isOpen
                ? "bg-[#111A2E] border-prime-purple/50 shadow-card"
                : "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 min-h-[64px] flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-prime-purple rounded-2xl cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="text-base sm:text-lg font-semibold text-white flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-prime-purple px-2 py-0.5 rounded bg-prime-purple/15 shrink-0">
                  0{index + 1}
                </span>
                <span>{item.question}</span>
              </span>
              <div
                className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isOpen
                    ? "bg-prime-purple text-white rotate-180"
                    : "text-prime-gray bg-white/5"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-6 pb-6 pt-2 text-sm sm:text-base text-prime-gray leading-relaxed border-t border-white/5 animate-in fade-in-50 duration-200"
              >
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
