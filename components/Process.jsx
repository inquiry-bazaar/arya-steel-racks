"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { steps } from "@/data/content";

const STAIR_BASE = 13; // left gap so row 1 also has room for the speed streaks
const STAIR_SHIFT_DESKTOP = 3;
const HEADER_OFFSET = 230; // px: rendered height of the sticky header, adjust if the content overlaps it

const EXTRA = [
  {
    tag: "Enquiry",
    description:
      "Tell us what you need: rack type, size, number of shelves, material and finish. Share it by call, WhatsApp or email, whichever is easiest for you.",
    points: [
      "Free consultation with our team",
      "Rack types for your store category",
      "Clear idea of options and budget",
      "We send you the price immediately",
    ],
    note: "Quick response to every enquiry",
  },
  {
    tag: "Design",
    description:
      "We turn your requirements into the right size and layout with a transparent quotation. You review it, ask for changes, and approve only when you're happy.",
    points: [
      "Custom sizes and shelf counts",
      "Material and finish recommendations",
      "Itemised quote with no surprises",
      "Changes before approval",
    ],
    note: "Design approved by you",
  },
  {
    tag: "Production",
    description:
      "Once approved, production begins in our own unit with CRC turret punch press, NC press brakes, welding shop and powder coating plant, then every rack is quality checked before dispatch.",
    points: [
      "Punching, bending and welding in-house",
      "Tank phosphating and powder coating",
      "Tested for rust resistance and strength",
      "Finishing and smoothness checks",
    ],
    note: "Quality tested before dispatch",
  },
  {
    tag: "Delivery",
    description:
      "We dispatch by road across India. Typical delivery time listed for our racks is 7 to 10 days, and the racks are assembled easily on site.",
    points: [
      "Shipment by road across India",
      "Delivery in about 7 to 10 days",
      "Easy assembly on site",
      "Support for reorders and add-ons",
    ],
    note: "Delivered across India",
  },
];

// free Unsplash photos, one per step (Enquiry, Design, Production, Delivery)
const STEP_IMAGES = [
  "https://unsplash.com/photos/tdEjTjdLyuE/download?force=true&w=900",
  "https://unsplash.com/photos/fteR0e2BzKo/download?force=true&w=900",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJAaY5YrEhhYXPlNh-l4Q2HMLxTq6ZhrUFDlVP_CJnQ&s=10",
  "https://unsplash.com/photos/JJda_SHp67M/download?force=true&w=900",
];

const STREAKS = [
  { top: 6, w: 90, h: 2, gap: 18, dur: 1.3, dist: 90, navy: true },
  { top: 15, w: 150, h: 4, gap: 6, dur: 1.0, dist: 130 },
  { top: 26, w: 110, h: 2, gap: 26, dur: 1.5, dist: 100, navy: true },
  { top: 36, w: 170, h: 5, gap: 4, dur: 0.9, dist: 150 },
  { top: 47, w: 120, h: 2, gap: 20, dur: 1.4, dist: 110 },
  { top: 57, w: 160, h: 4, gap: 8, dur: 1.1, dist: 140, navy: true },
  { top: 68, w: 100, h: 3, gap: 14, dur: 1.2, dist: 100 },
  { top: 78, w: 175, h: 5, gap: 4, dur: 0.95, dist: 160 },
  { top: 88, w: 95, h: 2, gap: 22, dur: 1.6, dist: 90, navy: true },
  { top: 96, w: 135, h: 3, gap: 10, dur: 1.15, dist: 120 },
];

/* ---------- Helpers ---------- */

// Pinned animation only on screens that are wide AND tall enough
function useIsPinned() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px) and (min-height: 700px)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return pinned;
}

function Streak({ s, i, run, reduce }) {
  return (
    <motion.span
      initial={{ opacity: 0, scaleX: 0.2, x: 0 }}
      animate={
        run && !reduce
          ? { opacity: [0, 1, 0], scaleX: [0.2, 1, 0.5], x: [0, -s.dist * 0.4, -s.dist] }
          : { opacity: reduce && run ? 0.45 : 0, scaleX: 1, x: 0 }
      }
      transition={
        run && !reduce
          ? { duration: s.dur, delay: i * 0.09, repeat: Infinity, repeatDelay: 0.25, ease: "easeOut" }
          : { duration: 0.4 }
      }
      style={{ top: `${s.top}%`, width: s.w, height: s.h, right: s.gap, originX: 1 }}
      className={`absolute rounded-full ${
        s.navy
          ? "bg-gradient-to-r from-transparent to-navy/45"
          : "bg-gradient-to-r from-transparent via-brand/60 to-brand"
      }`}
    />
  );
}

function Dash({ top, right, delay, run, reduce }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: 0 }}
      animate={run && !reduce ? { opacity: [0, 1, 0], x: [0, -90, -180] } : { opacity: 0, x: 0 }}
      transition={
        run && !reduce
          ? { duration: 1.4, delay, repeat: Infinity, repeatDelay: 0.3, ease: "easeOut" }
          : { duration: 0.3 }
      }
      style={{ top: `${top}%`, right }}
      className="absolute h-[5px] w-[5px] rounded-full bg-brand"
    />
  );
}

function SpeedLines() {
  const ref = useRef(null);
  const run = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute right-full top-0 mr-1 hidden h-[calc(36vh+72px)] w-[210px] lg:block"
    >
      {STREAKS.map((s, i) => (
        <Streak key={i} s={s} i={i} run={run} reduce={reduce} />
      ))}
      <Dash top={10} right={20} delay={0.0} run={run} reduce={reduce} />
      <Dash top={42} right={12} delay={0.3} run={run} reduce={reduce} />
      <Dash top={64} right={24} delay={0.15} run={run} reduce={reduce} />
      <Dash top={84} right={10} delay={0.45} run={run} reduce={reduce} />
    </div>
  );
}

function Reveal({ p, range, x = 0, y = 0, className, children }) {
  const opacity = useTransform(p, range, [0, 1]);
  const tx = useTransform(p, range, [x, 0]);
  const ty = useTransform(p, range, [y, 0]);
  return (
    <motion.div style={{ opacity, x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

function CardImage({ src, alt, number }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/30 via-brand/15 to-brand/5">
        <span className="text-7xl font-black text-brand/40">{number}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

/* ---------- One step row ---------- */

function StepRow({ step, index, isLast }) {
  const ref = useRef(null);
  const pinned = useIsPinned();
  const extra = EXTRA[index] ?? {};

  const description = step.description ?? extra.description;
  const points = step.points ?? extra.points ?? [];
  const note = step.note ?? extra.note;
  const src = step.image ?? STEP_IMAGES[index] ?? `/process/step-${index + 1}.jpg`;

  const { scrollYProgress: raw } = useScroll({
    target: ref,
    offset: pinned
      ? [`start ${HEADER_OFFSET}px`, "end end"]
      : ["start 85%", "center 45%"],
  });

  const p = useTransform(raw, pinned ? [0, 0.6] : [0, 1], [0, 1]);

  // Large sideways movement only in the pinned layout
  const move = (value) => (pinned ? value : 0);

  const cardOpacity = useTransform(p, [0, 0.25], [0, 1]);
  const cardX = useTransform(p, [0, 0.3], [move(-160), 0]);
  const cardY = useTransform(p, [0, 0.3], [pinned ? -80 : 40, 0]);
  const cardRotate = useTransform(p, [0, 0.3], [move(-8), 0]);
  const cardScale = useTransform(p, [0, 0.3], [pinned ? 0.85 : 0.95, 1]);

  const clip = useTransform(p, [0.05, 0.35], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const imgScale = useTransform(p, [0.05, 0.6], [1.35, 1]);

  const badgeScale = useTransform(p, [0.2, 0.38], [0, 1]);
  const badgeRotate = useTransform(p, [0.2, 0.38], [-180, 0]);

  const ghostY = useTransform(p, [0, 1], [pinned ? 80 : 20, pinned ? -40 : 0]);
  const ghostOpacity = useTransform(p, [0.1, 0.5], [0, 1]);

  const lineScale = useTransform(p, [0.2, 0.4], [0, 1]);

  return (
    <li
      ref={ref}
      className={`relative ${
        pinned ? (isLast ? "h-[190vh]" : "h-[230vh]") : "pb-16 sm:pb-20"
      }`}
    >
      {/* pinned stage on large screens, normal flow elsewhere */}
      <div
        className={pinned ? "sticky flex items-center" : ""}
        style={
          pinned
            ? { top: HEADER_OFFSET, height: `calc(100vh - ${HEADER_OFFSET}px)` }
            : undefined
        }
      >
        <div
          className={
            pinned
              ? "relative z-10 min-w-0 flex-1"
              : "relative z-10 mx-auto grid w-full max-w-xl gap-12 md:max-w-none md:grid-cols-2 md:items-center md:gap-8 lg:gap-14"
          }
          style={
            pinned
              ? { marginLeft: `${STAIR_BASE + index * STAIR_SHIFT_DESKTOP}%` }
              : undefined
          }
        >
          {/* speed streaks trailing behind the card */}
          {pinned && <SpeedLines />}

          <motion.div
            style={{ opacity: cardOpacity, x: cardX, y: cardY, rotate: cardRotate, scale: cardScale }}
            className={`glass-card relative w-full overflow-hidden rounded-3xl shadow-xl ${
              pinned ? "max-w-[390px]" : "mx-auto max-w-[480px]"
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                pinned ? "h-[36vh]" : "h-56 sm:h-72"
              }`}
            >
              <motion.div style={{ clipPath: clip }} className="absolute inset-0">
                <motion.div style={{ scale: imgScale }} className="h-full w-full">
                  <CardImage src={src} alt={step.title} number={index + 1} />
                </motion.div>
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              <motion.span
                style={{ scale: badgeScale, rotate: badgeRotate }}
                className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-orange"
              >
                {index + 1}
              </motion.span>
            </div>
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-lg font-bold leading-snug xl:text-xl">{step.title}</p>
            </div>
          </motion.div>

          {/* DETAILS */}
          <div
            className={
              pinned
                ? "absolute left-[calc(390px+3.5rem)] right-0 top-1/2 max-w-xl -translate-y-1/2"
                : "relative min-w-0"
            }
          >
            <motion.span
              style={{ y: ghostY, opacity: ghostOpacity }}
              className={`pointer-events-none absolute -left-1 select-none font-black leading-none text-brand/10 ${
                pinned ? "-top-16 text-[11rem]" : "-top-10 text-8xl sm:text-9xl"
              }`}
              aria-hidden
            >
              0{index + 1}
            </motion.span>

            <div className="relative">
              <Reveal p={p} range={[0, 0.3]} x={move(-50)}>
                <span className="eyebrow">
                  <span className="h-[2px] w-5 bg-brand" /> Step {index + 1}
                </span>
              </Reveal>

              <Reveal p={p} range={[0, 0.3]} x={move(-80)} className="mt-3">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl xl:text-4xl">
                  {step.title}
                </h3>
                <motion.div
                  style={{ scaleX: lineScale, originX: 0 }}
                  className="mt-3 h-1 w-24 rounded-full bg-brand"
                />
              </Reveal>

              {description && (
                <Reveal p={p} range={[0, 0.3]} x={move(-60)} className="mt-4">
                  <p className="text-sm leading-relaxed opacity-75 sm:text-base">
                    {description}
                  </p>
                </Reveal>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {points.map((pt, i) => (
                  <Reveal
                    key={pt}
                    p={p}
                    range={[0.3 + i * 0.08, 0.47 + i * 0.08]}
                    x={move(70)}
                    y={pinned ? 0 : 20}
                    className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold leading-snug">{pt}</span>
                  </Reveal>
                ))}
              </div>

              {note && (
                <Reveal p={p} range={[0.75, 0.95]} y={30} className="mt-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1f4b] px-4 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5 sm:text-sm">
                    <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-brand" />
                    {note}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ---------- Section ---------- */

export default function Process() {
  const pinned = useIsPinned();

  return (
    <section id="process" className="bg-soft relative overflow-x-clip">
      <div
        className={`z-30 w-full border-b border-navy/5 bg-soft backdrop-blur-md ${
          pinned ? "sticky top-0 pb-6 pt-20" : "relative py-6 sm:py-10"
        }`}
      >
        <div className={`section-pad mx-auto w-full max-w-[1400px] ${pinned ? "py-5" : ""}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="h-[2px] w-5 bg-brand" /> How It Works
              </span>
              <h2 className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
                From Enquiry to Delivery in{" "}
                <span className="text-brand">4 Simple Steps</span>
              </h2>
            </div>
            <a href="#faq" className="btn-navy !py-3 shrink-0 self-start sm:self-auto">
              Learn More <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="section-pad mx-auto w-full max-w-[1400px]">
        <ol className="pb-4 pt-12 xl:pt-[4vh]">
          {steps.map((step, i) => (
            <StepRow
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}