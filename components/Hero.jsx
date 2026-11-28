"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
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

// White veil over the mobile background image: strong behind the text, fading out
// at the bottom so the photo shows clearly behind the stat cards.
const MOBILE_VEIL =
  "linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 50%, rgba(255,255,255,0.2) 100%)";

/* Stat cards are used twice: pinned over the image on desktop,
   and in a row at the bottom of the hero on phones. */
function BuiltCard() {
  return (
    <div className="glass-card flex animate-float items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
      <ShieldCheck className="h-6 w-6 shrink-0 fill-navy/10 sm:h-8 sm:w-8" />
      <div className="leading-tight">
        <p className="text-[13px] font-extrabold sm:text-[15px]">Built to Last</p>
        <p className="text-[10px] font-medium text-navy/60">Long-Term Strength</p>
      </div>
    </div>
  );
}

function CountCard() {
  return (
    <div className="glass-card flex animate-float items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
      <Users className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
      <div className="leading-tight">
        <p className="text-[15px] font-extrabold sm:text-[17px]">100+</p>
        <p className="text-[11px] font-medium text-navy/70 sm:text-[12px]">Display Products</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  // (the old version called setMega / setMenuOpen, which only exist in Navbar and would crash on click)
  const openQuote = () => setQuoteOpen(true);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const heroSrc = media.heroImage || HERO_IMG;

  return (
    <section
      id="home"
      className="relative flex min-h-[660px] flex-col overflow-hidden bg-gradient-to-br from-white via-[#eef3fb] to-[#e3ebf8] pt-[124px] sm:min-h-[720px] lg:block lg:min-h-0 lg:pt-[84px]"
    >
      {/* ============ MOBILE / TABLET: image as full background ============ */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <MediaSlot
          src={heroSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: MOBILE_VEIL }} />
      </div>

      {/* ============ DESKTOP decorations (unchanged) ============ */}
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

      {/* ============ Content ============ */}
      <div className="section-pad relative z-10 flex items-center pb-6 pt-2 sm:pt-6 lg:min-h-[640px] lg:pb-16 lg:pt-8">
        {/* Desktop slanted image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-[84px] bottom-0 hidden lg:block"
          style={{ left: "max(60%, 600px)", right: "calc(50% - 50vw)" }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-brand via-brand/70 to-brand/10"
            style={{ clipPath: SWOOSH }}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: SLANT }}>
            <div className="relative h-full w-full">
              <MediaSlot
                src={heroSrc}
                alt="Hero image"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-white/80 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-[720px]"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[12px] font-semibold shadow-sm sm:px-4 sm:py-2 sm:text-[13px]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand sm:h-2.5 sm:w-2.5" />
            Manufacturer from New Delhi · Since 2021
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-[32px] font-extrabold leading-[1.12] tracking-tight text-navy sm:mt-6 sm:text-[48px] lg:text-[58px] lg:leading-[1.1]"
          >
            Retail Display Racks <br className="hidden lg:block" />
            for a More <span className="text-brand">Organized</span> <br className="hidden lg:block" />
            &amp; <span className="text-brand">Productive</span> Space
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 text-[16px] font-bold sm:mt-6 sm:text-[17px]">
            Durable. Customizable. Made in India.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-1 max-w-[420px] text-[15px] leading-relaxed sm:text-[16px]"
          >
            Supermarket racks, garment stands, counters and trolleys, built for strength and a perfect finish.
          </motion.p>

          {/* Buttons: stacked and full-width on phones, side by side from sm */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
          >
            <a href="/products" className="btn-navy w-full justify-center sm:w-auto">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={openQuote}
              className="btn-orange w-full justify-center !py-3 sm:w-auto"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ MOBILE: stat cards over the clear part of the image ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="section-pad relative z-10 mt-auto flex items-end gap-3 pb-6 pt-24 sm:pb-8 sm:pt-32 lg:hidden"
      >
        <BuiltCard />
        <CountCard />
      </motion.div>

      {/* ============ DESKTOP: floating cards (unchanged positions) ============ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-10 top-[24%] z-20 hidden lg:block"
      >
        <BuiltCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[18%] right-10 z-20 hidden lg:block"
      >
        <CountCard />
      </motion.div>

      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </section>
  );
}