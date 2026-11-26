"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Users } from "lucide-react";
import MediaSlot from "./MediaSlot";
import { media } from "@/data/content";
import QuoteModal from "./QuoteModal";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const HERO_IMG = "/hero.webp";
const LEFT_ART = "/hero-left.jpg"; 

const SLANT = "polygon(33% 0, 100% 0, 100% 100%, 0 100%)";
const SWOOSH = "polygon(40.5% 0, 27% 0, 0 92%, 0 103%)";

export default function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => {
    setMega(false);
    setMenuOpen(false);
    setQuoteOpen(true);
  };

  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#eef3fb] to-[#e3ebf8] pt-[84px]"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[48%] bg-gradient-to-r from-white/70 to-transparent lg:block"
        style={{ clipPath: "polygon(0 0, 100% 0, 78% 100%, 0 100%)" }}
      />
      <img
        src={LEFT_ART}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[7.5%] object-cover object-left lg:block"
        style={{
          WebkitMaskImage: "linear-gradient(to right, #000 55%, transparent)",
          maskImage: "linear-gradient(to right, #000 55%, transparent)",
        }}
      />

      <div className="section-pad relative z-10 flex min-h-[640px] items-center pb-16 pt-8">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-[84px] bottom-0 hidden lg:block"
          style={{ left: "max(51%, 600px)", right: "calc(50% - 50vw)" }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-brand via-brand/70 to-brand/10"
            style={{ clipPath: SWOOSH }}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: SLANT }}>
            <div className="relative h-full w-full">
              <MediaSlot
                src={media.heroImage || HERO_IMG}
                alt="Hero image"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-white/80 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 max-w-[720px]">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[13px] font-semibold shadow-sm"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            Manufacturer from New Delhi · Since 2021
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[40px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[52px] lg:text-[58px]"
          >
            Retail Display Racks <br className="hidden lg:block" />
            for a More <span className="text-brand">Organized</span> <br className="hidden lg:block" />
            &amp; <span className="text-brand">Productive</span> Space
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-[17px] font-bold">
            Durable. Customizable. Made in India.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-1 max-w-[420px] text-[16px] leading-relaxed">
            Supermarket racks, garment stands, counters and trolleys, built for strength and a perfect finish.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-6">
            <a href="/products" className="btn-navy">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </a>
 <button
            type="button"
            onClick={openQuote}
            className="btn-orange !py-3"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-pad relative pb-12 lg:hidden">
        <div className="aspect-[4/3.1] overflow-hidden rounded-[36px] shadow-glass">
          <MediaSlot src={media.heroImage || HERO_IMG} alt="Hero image" className="h-full w-full object-cover" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-4 top-[26%] z-20 lg:right-10 lg:top-[24%]"
      >
        <div className="glass-card flex animate-float items-center gap-3 px-5 py-3">
          <ShieldCheck className="h-8 w-8 fill-navy/10" />
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold">Built to Last</p>
            <p className="text-[10px] font-medium text-navy/60">Long-Term Strength</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[22%] right-4 z-20 lg:bottom-[18%] lg:right-10"
      >
        <div className="glass-card flex animate-float items-center gap-3 px-5 py-3">
          <Users className="h-8 w-8" />
          <div className="leading-tight">
            <p className="text-[17px] font-extrabold">60+</p>
            <p className="text-[12px] font-medium text-navy/70">Display Products</p>
          </div>
        </div>
      </motion.div>

     <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </section>
  );
}