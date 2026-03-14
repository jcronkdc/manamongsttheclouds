"use client";

import { useState } from "react";
import { faqs } from "@/app/lib/faq-data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          Questions & Answers
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-light tracking-wide text-center mb-4">
          Frequently Asked Questions
        </h2>
        <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mb-12" />

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#1a1a1a]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-5 flex items-start justify-between gap-4 group cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <h3 className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#ededed] group-hover:text-[#c9a84c] transition-colors duration-300 leading-snug">
                  {faq.q}
                </h3>
                <span
                  className={`font-[family-name:var(--font-sans)] text-[#c9a84c]/50 text-lg mt-0.5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}
              >
                <p className="font-[family-name:var(--font-serif)] text-sm text-[#c4beb4] leading-[1.8]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
