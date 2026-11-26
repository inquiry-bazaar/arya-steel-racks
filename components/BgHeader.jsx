"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { ChevronRight } from "lucide-react";
import MediaSlot from "./MediaSlot";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const FALLBACK_IMG = "/hero.webp";
const LEFT_ART = "/hero-left.jpg";

const SLANT = "polygon(33% 0, 100% 0, 100% 100%, 0 100%)";
const SWOOSH = "polygon(40.5% 0, 27% 0, 0 92%, 0 103%)";

// Positions for the floating cards (first = top, second = bottom)
const CARD_POSITIONS = [
  "right-3 top-4 lg:right-10 lg:top-[24%]",
  "bottom-4 right-3 lg:bottom-[18%] lg:right-10",
];

// Keeps the highlighted words where they sit in the title
function splitTitle(title, highlight) {
  const clean = title.trim();

  if (highlight) {
    const start = clean.indexOf(highlight);
    if (start === -1) return [`${clean} `, highlight, ""];
    return [clean.slice(0, start), highlight, clean.slice(start + highlight.length)];
  }

  const words = clean.split(/\s+/);
  if (words.length < 2) return [clean, "", ""];
  const last = words.pop();
  return [`${words.join(" ")} `, last, ""];
}

function FloatingCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: index === 0 ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + index * 0.2 }}
      className={`absolute z-20 ${CARD_POSITIONS[index]}`}
    >
      <div className="glass-card flex animate-float items-center gap-3 px-4 py-2.5 motion-reduce:animate-none lg:px-5 lg:py-3">
        {card.icon}
        <div className="leading-tight">
          <p className="text-[17px] font-extrabold text-navy lg:text-[19px]">{card.title}</p>
          {card.subtitle && <p className="text-[13px] font-medium lg:text-[14px] text-navy/70">{card.subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default function BgHeader({
  title = "",
  text,
  backgroundImage,
  eyebrow,
  highlight,
  accent,
  breadcrumbs = [],
  cards = [], 
}) {
  const [before, accentText, after] = splitTitle(title, highlight);
  const image = backgroundImage || FALLBACK_IMG;
  const accentColor = accent ? { color: accent } : undefined;
  const accentBg = accent ? { backgroundColor: accent } : undefined;
  const floating = cards.slice(0, 2).map((card, i) => <FloatingCard key={i} card={card} index={i} />);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#eef3fb] to-[#e3ebf8] pt-[84px]">
        {/* Soft light panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-[48%] bg-gradient-to-r from-white/70 to-transparent lg:block"
          style={{ clipPath: "polygon(0 0, 100% 0, 78% 100%, 0 100%)" }}
        />

        {/* Left illustration */}
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

        <div className="section-pad relative z-10 flex items-center pb-12 pt-8 lg:min-h-[566px] lg:pb-16">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -top-[84px] bottom-0 hidden lg:block"
            style={{ left: "max(51%, 600px)", right: "calc(50% - 50vw)" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-brand via-brand/70 to-brand/10"
              style={{
                clipPath: SWOOSH,
                ...(accent && { backgroundImage: `linear-gradient(to bottom, ${accent}, transparent)` }),
              }}
            />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: SLANT }}>
              <MediaSlot src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-white/80 to-transparent" />
            </div>
            {floating}
          </motion.div>

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full max-w-[640px] lg:max-w-[520px] xl:max-w-[600px]"
          >
            {breadcrumbs.length > 0 && (
              <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-[15px] font-medium">
                  {breadcrumbs.map((item, i) => {
                    const isLast = i === breadcrumbs.length - 1;

                    return (
                      <li key={i} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-navy/40" aria-hidden="true" />}
                        {isLast || !item.href ? (
                          <span
                            className="font-semibold text-navy/90"
                            aria-current={isLast ? "page" : undefined}
                          >
                            {item.label}
                          </span>
                        ) : (
                          <Link href={item.href} className="text-navy/55 transition hover:text-brand">
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </motion.nav>
            )}


            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[44px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[60px] lg:text-[62px] xl:text-[70px]"
            >
              {before}
              {accentText && (
                <span className="text-brand" style={accentColor}>
                  {accentText}
                </span>
              )}
              {after}
            </motion.h1>

            {text && (
              <motion.p variants={fadeUp} className="mt-6 max-w-[500px] text-[18px] leading-relaxed text-navy/80 lg:text-[20px]">
                {text}
              </motion.p>
            )}
            
            {/* {eyebrow && (
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[15px] font-semibold text-navy shadow-sm mt-4"
              >
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" style={accentBg} />
                {eyebrow}
              </motion.span>
            )} */}
          </motion.div>
        </div>

        {/* Mobile / tablet image */}
        <div className="section-pad relative pb-12 lg:hidden">
          <div className="relative">
            <div className="aspect-[4/3.1] overflow-hidden rounded-[36px] shadow-glass">
              <MediaSlot src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            {floating}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}