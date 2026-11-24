"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText, Ruler, Truck, Wrench } from "lucide-react";
import { steps } from "@/data/content";

const icons = { message: MessageSquareText, ruler: Ruler, wrench: Wrench, truck: Truck };

// "Sequential step animation":
// step 1 appears, its line draws, then step 2 appears, and so on.
// Change this number to make the animation faster or slower (seconds).
const GAP = 0.6;

export default function Process() {
  return (
    <section id="process" className="bg-soft overflow-hidden py-20">
      <div className="section-pad grid items-center gap-12 lg:grid-cols-[320px_1fr]">
        {/* left: heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-[2px] w-5 bg-brand" /> How It Works
          </span>
          <h2 className="mt-4 text-[34px] font-extrabold leading-[1.15] tracking-tight">
            From Inquiry to Installation in <span className="text-brand">4 Simple Steps</span>
          </h2>
          <a href="#faq" className="btn-navy mt-7 !py-3">
            Learn More <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* right: the 4 steps */}
        <ol className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-0">
          {steps.map((step, index) => {
            const Icon = icons[step.icon];
            const isLast = index === steps.length - 1;

            return (
              <li key={step.title} className="relative flex justify-center">
                {/* step card */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * GAP, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="glass-card relative flex h-[150px] w-[150px] flex-col items-center justify-center px-3 text-center"
                >
                  <span className="absolute -top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-orange">
                    {index + 1}
                  </span>
                  <Icon className="h-9 w-9" strokeWidth={1.7} />
                  <p className="mt-3 text-[12.5px] font-bold leading-snug">{step.title}</p>
                </motion.div>

                {/* line that draws to the next step */}
                {!isLast && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: index * GAP + 0.4, duration: 0.4 }}
                    style={{ originX: 0 }}
                    className="absolute left-[calc(50%+80px)] top-1/2 hidden h-[2px] w-[calc(100%-160px)] bg-gradient-to-r from-brand to-brand/30 md:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
