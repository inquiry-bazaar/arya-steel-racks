"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import QuoteModal from "./QuoteModal";

const IMAGES = {
  main: "/products/wall-mounted-garment-retail-display-rack.webp",
  side: "/products/28.webp",
};

const PROCESS_HREF = "#process";

const POINTS = [
  "CRC turret punch press",
  "NC press brakes",
  "In-house welding shop",
  "Tank phosphating and powder coating",
  "Tested for strength and rust resistance",
  "Custom sizes for any store",
];

const STATS = [
  { to: 15, suffix: "+", label: "Years of manufacturing" },
  { to: 5000, suffix: "+", label: "Stores and shops equipped" },
  { to: 25, suffix: "+", label: "States delivered to" },
  { text: "7 to 10", label: "Days typical delivery" },
];

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

/* Drawn rack scene shown until a real photo loads */
function RackArt() {
  const xs = [30, 70, 110, 150, 190, 230, 270, 310];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="ab-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ecf8" />
          <stop offset="1" stopColor="#b3bdd1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ab-bg)" />
      <rect y="250" width="400" height="50" fill="#929cb0" />
      {[22, 140, 258, 376].map((x) => (
        <rect key={x} x={x - 5} y="26" width="10" height="240" fill="#1d4ed8" />
      ))}
      {[92, 160, 228].map((y) => (
        <g key={y}>
          {xs.map((x, i) => (
            <rect
              key={x}
              x={x}
              y={y - 30 + (i % 3) * 3}
              width={26 + (i % 2) * 7}
              height={30 - (i % 3) * 3}
              fill="#cfa877"
              stroke="#a67f4e"
              strokeWidth="1.2"
            />
          ))}
          <rect x="17" y={y} width="366" height="7" fill="#f97316" />
        </g>
      ))}
    </svg>
  );
}

function Photo({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#dfe6f5] ${className}`}>
      <RackArt />
      {!broken && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/* ---------- Section ---------- */

export default function AboutUs() {
  const reduce = useReducedMotion();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const fromLeft = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  });

  const fromRight = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  });

  return (
    <section id="about" className="relative overflow-x-clip bg-white py-10 lg:py-18">
      <div className="section-pad mx-auto w-full max-w-[1400px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-20">
          {/* ---------- photo collage ---------- */}
          <div className="relative mx-auto w-full max-w-[560px] pb-14 pr-6 sm:pr-10 lg:mx-0">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-[62%] w-[62%] rounded-[2rem] bg-brand"
            />

            <motion.div {...fromLeft(0)} className="relative w-[84%]">
              <Photo
                src={IMAGES.main}
                alt="Racks being made in our manufacturing unit"
                className="aspect-[4/5] rounded-[2rem] shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 right-0 w-[56%]"
            >
              <Photo
                src={IMAGES.side}
                alt="Finished racks ready for dispatch"
                className="aspect-[4/3] rounded-3xl border-[6px] border-white shadow-2xl"
              />
            </motion.div>

            <div className="absolute right-1 top-8 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#0f1f4b] text-white shadow-xl ring-4 ring-white sm:right-3 sm:h-32 sm:w-32">
              <span className="text-3xl font-extrabold leading-none sm:text-4xl">
                {STATS[0].to}
                <span className="text-brand">{STATS[0].suffix}</span>
              </span>
              <span className="mt-1 text-xs font-semibold text-white/80">Years of craft</span>
            </div>
          </div>

          {/* ---------- copy ---------- */}
          <motion.div {...fromRight(0.1)}>
            <span className="eyebrow">
              <span className="h-[2px] w-5 bg-brand" /> About Us
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[42px]">
              Racks built in our own unit, <span className="text-brand">made to fit your store</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed opacity-75">
              We design and manufacture storage and display racks for retail stores, warehouses and
              showrooms across India. Every rack is punched, bent, welded and powder coated in our own
              unit, so quality stays in our hands from the first drawing to the final dispatch.
            </p>
            <p className="mt-4 text-base leading-relaxed opacity-75">
              We work with you on the right size, shelf count, material and finish, share a clear
              itemised quote, and deliver in about 7 to 10 days, with easy assembly on site and
              support for reorders.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {POINTS.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="btn-orange !py-3.5"
              >
                Get a free quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={PROCESS_HREF}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0f1f4b] underline decoration-brand decoration-2 underline-offset-[6px] transition-colors hover:text-brand"
              >
                See how we work
              </a>
            </div>
          </motion.div>
        </div>

        {/* ---------- stats band ---------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-[#0f1f4b] px-6 py-9 text-white lg:mt-24 lg:px-12 lg:py-12"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
          <dl className="grid grid-cols-2 gap-y-9 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col px-2 text-center lg:px-8">
                <dt className="order-2 mt-2 text-sm font-medium text-white/70">{s.label}</dt>
                <dd className="order-1 text-4xl font-extrabold leading-none tracking-tight lg:text-5xl">
                  {s.text ? s.text : <CountUp to={s.to} suffix={s.suffix} />}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </section>
  );
}