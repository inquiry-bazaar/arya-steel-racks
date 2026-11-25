"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-soft py-20">
      <div className="section-pad grid gap-12 lg:grid-cols-[340px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-[2px] w-5 bg-brand" /> FAQ
          </span>
          <h2 className="mt-4 text-[36px] font-extrabold leading-[1.15] tracking-tight">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-navy/80">
            Everything you need to know about our display racks and trolleys. Can’t find your answer? Talk to our team.
          </p>
          <a href="#contact" className="btn-orange mt-7 !py-3">
            Contact Us
          </a>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className={`glass-card overflow-hidden ${isOpen ? "!border-brand/40 !bg-white" : ""}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15.5px] font-bold">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? "bg-brand text-white" : "bg-steel-100"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-navy/80">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
