"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { steps } from "@/data/content";

const STAIR_SHIFT_DESKTOP = 9;
const STAIR_SHIFT_MOBILE = 8;
const ROW_GAP = "45vh";

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


function Connector() {
  const ref = useRef(null);
  const { scrollYProgress: t } = useScroll({
    target: ref,
    offset: ["start 80%", "end 88%"],
  });

  const a = useTransform(t, [0, 0.35], [0, 1]);
  const b = useTransform(t, [0.35, 0.7], [0, 1]); 
  const c = useTransform(t, [0.7, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute bottom-0 z-0 hidden lg:block"
      style={{
        left: "calc(var(--shift-d) + 40px)",
        width: `${STAIR_SHIFT_DESKTOP}%`,
        height: ROW_GAP,
      }}
    >
      <motion.div
        style={{ scaleY: a, originY: 0 }}
        className="absolute left-0 top-0 h-1/2 w-[3px] -translate-x-1/2 rounded-full bg-brand"
      />
      <motion.div
        style={{ scaleX: b, originX: 0 }}
        className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-brand"
      />
      <motion.div
        style={{ scaleY: c, originY: 0 }}
        className="absolute right-0 top-1/2 h-1/2 w-[3px] translate-x-1/2 rounded-full bg-brand"
      />
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


function StepRow({ step, index, isLast }) {
  const ref = useRef(null);
  const extra = EXTRA[index] ?? {};

  const tag = step.tag ?? extra.tag;
  const description = step.description ?? extra.description;
  const points = step.points ?? extra.points ?? [];
  const note = step.note ?? extra.note;
  const src = step.image ?? `/process/step-${index + 1}.jpg`;

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start 90%", "center 45%"],
  });

  const cardOpacity = useTransform(p, [0, 0.25], [0, 1]);
  const cardX = useTransform(p, [0, 0.3], [-160, 0]);
  const cardY = useTransform(p, [0, 0.3], [-80, 0]);
  const cardRotate = useTransform(p, [0, 0.3], [-8, 0]);
  const cardScale = useTransform(p, [0, 0.3], [0.85, 1]);

  const clip = useTransform(p, [0.05, 0.35], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const imgScale = useTransform(p, [0.05, 0.6], [1.35, 1]);

  const badgeScale = useTransform(p, [0.2, 0.38], [0, 1]);
  const badgeRotate = useTransform(p, [0.2, 0.38], [-180, 0]);

  const ghostY = useTransform(p, [0, 1], [80, -40]);
  const ghostOpacity = useTransform(p, [0.1, 0.5], [0, 1]);

  const lineScale = useTransform(p, [0.5, 0.7], [0, 1]);



  return (
    <li
      ref={ref}
      className="relative pb-10 lg:pb-[var(--gap)]"
      style={{
        "--gap": isLast ? "0px" : ROW_GAP,
        "--shift-m": `${(index % 2) * STAIR_SHIFT_MOBILE}%`,
        "--shift-d": `${index * STAIR_SHIFT_DESKTOP}%`,
      }}
    >
{!isLast && <Connector />}

      <div className="relative z-10 ml-[var(--shift-m)] flex w-full flex-col gap-8 lg:ml-[var(--shift-d)] lg:block lg:w-auto">
        <motion.div
          style={{ opacity: cardOpacity, x: cardX, y: cardY, rotate: cardRotate, scale: cardScale }}
          className="glass-card relative w-full max-w-[420px] overflow-hidden rounded-3xl shadow-xl lg:w-[390px]"
        >
<div className="relative h-[36vh] overflow-hidden">
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
          <div className="px-6 py-5">
            <p className="text-lg font-bold leading-snug lg:text-xl">{step.title}</p>
          </div>
        </motion.div>

        {/* DETAILS: beside the card on desktop (centered on it, doesn't add row height) */}
        <div className="relative max-w-xl lg:absolute lg:left-[calc(390px+3.5rem)] lg:top-1/2 lg:-translate-y-1/2">
          <motion.span
            style={{ y: ghostY, opacity: ghostOpacity }}
            className="pointer-events-none absolute -left-4 -top-16 select-none text-[9rem] font-black leading-none text-brand/10 lg:text-[11rem]"
            aria-hidden
          >
            0{index + 1}
          </motion.span>

          <div className="relative">
            <Reveal p={p} range={[0.3, 0.5]} x={-50} className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <span className="h-[2px] w-5 bg-brand" /> Step {index + 1}
              </span>
             
            </Reveal>

            <Reveal p={p} range={[0.35, 0.55]} x={-80} className="mt-3">
              <h3 className="text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
                {step.title}
              </h3>
              <motion.div
                style={{ scaleX: lineScale, originX: 0 }}
                className="mt-3 h-1 w-24 rounded-full bg-brand"
              />
            </Reveal>

            {description && (
              <Reveal p={p} range={[0.42, 0.62]} x={-60} className="mt-4">
                <p className="text-base leading-relaxed opacity-75">{description}</p>
              </Reveal>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {points.map((pt, i) => (
                <Reveal
                  key={pt}
                  p={p}
                  range={[0.5 + i * 0.07, 0.68 + i * 0.07]}
                  x={70}
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
              <Reveal p={p} range={[0.8, 0.98]} y={30} className="mt-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1f4b] px-5 py-2.5 text-sm font-semibold text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                  {note}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/* ---------- Section ---------- */

export default function Process() {
  return (
    <section id="process" className="bg-soft relative overflow-x-clip">
      <div className="section-pad mx-auto w-full max-w-[1400px]">
        <div className="sticky top-0 z-30 -mx-4 bg-soft/90 px-4 py-5 backdrop-blur sm:mx-0 sm:px-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="h-[2px] w-5 bg-brand" /> How It Works
              </span>
              <h2 className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
                From Enquiry to Delivery in{" "}
                <span className="text-brand">4 Simple Steps</span>
              </h2>
            </div>
            <a href="#faq" className="btn-navy !py-3 self-start lg:self-auto">
              Learn More <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

<ol className="pb-10 pt-[12vh]">
          {steps.map((step, i) => (
            <StepRow key={step.title} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}