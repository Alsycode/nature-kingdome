"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const half = Math.ceil(items.length / 2);

  const renderItem = (item: FaqItem, index: number) => {
    const isOpen = openIndex === index;
    return (
      <div key={index} className="border-b border-on-surface/10">
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          aria-expanded={isOpen}
          className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        >
          <span className="font-sans font-medium text-sm sm:text-base text-on-surface/80 leading-snug group-hover:text-[#e9c349] transition-colors duration-300">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            className="flex-shrink-0 mt-0.5 text-[#e9c349]/60 text-xl font-light leading-none select-none"
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={`a-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              className="overflow-hidden"
            >
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-relaxed pb-6 pr-8">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 w-full bg-[#0a0a0a] relative border-t border-on-surface/5"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] font-semibold text-[#e9c349] uppercase block font-sans mb-4">
            Common Questions
          </span>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-tight font-medium">
            Before You Arrive.
          </h2>
          <p className="font-sans font-light text-sm sm:text-base text-on-surface/45 leading-relaxed mt-4 max-w-md">
            Everything you need to know about planning your stay at Nature Kingdom.
          </p>
        </motion.div>

        {/* Accordion — two columns on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 xl:gap-x-28 gap-y-0"
        >
          <div className="border-t border-on-surface/10">
            {items.slice(0, half).map((item, i) => renderItem(item, i))}
          </div>
          <div className="border-t border-on-surface/10">
            {items.slice(half).map((item, i) => renderItem(item, i + half))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
