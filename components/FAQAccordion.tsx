"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = { readonly q: string; readonly a: string };

interface FAQAccordionProps {
  items: readonly FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={className} role="region" aria-label="Korduma kippuvad küsimused">
      <dl className="divide-y divide-slate-200">
        {items.map((item, i) => (
          <div key={i}>
            <dt>
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-slate-900 hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span>{item.q}</span>
                <span
                  className={`ml-2 shrink-0 text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.dd
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-slate-600">{item.a}</p>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        ))}
      </dl>
    </div>
  );
}
