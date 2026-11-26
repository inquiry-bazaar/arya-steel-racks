"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { industries as INDUSTRIES } from "@/data/content";

const STAT_ICONS = {
  briefcase: Briefcase,
  globe: Globe,
  shield: ShieldCheck,
  chart: TrendingUp,
};

/* ---------- settings you may want to tweak ---------- */

// "contain" = cut-out rack artwork (nothing gets cropped)
// "cover"   = real photos that fill the card
// A single item can override this with `fit: "cover"` in your data.
const IMAGE_FIT = "contain";
const CTA_HREF = "#contact";
const STAGGER = 0.18; // seconds between each card starting
const PERSPECTIVE = 1600;

const EASE_OUT = [0.16, 1, 0.3, 1];

/* ---------- glass-cube reveal (corner cards only) ----------
   The four corner cards are covered by a wall of small mirror-glass cubes.
   1. Cubes come from BEHIND the screen (deep in z, small, tumbling) and
      lock together into a wall. No sideways sliding.
   2. The card fades in underneath, visible through the glass.
   3. Cubes flip away in a diagonal wave.
   4. When the animation ends the whole cube layer is removed from the DOM,
      so not a single cube is left on the page.
   The other cards simply rise out of the background (also from depth). */

// Glass: translucent white, blurred backdrop, bright rim, soft shadow
const GLASS =
  "relative h-full w-full overflow-hidden rounded-[8px] border border-white/70 " +
  "bg-gradient-to-br from-white/60 via-white/15 to-white/5 backdrop-blur-[2px] " +
  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-8px_12px_rgba(255,255,255,0.18),0_10px_22px_rgba(20,30,50,0.20)]";

// diagonal mirror streak across each cube
const SHEEN =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_28%,rgba(255,255,255,0.65)_46%,rgba(255,255,255,0.08)_56%,transparent_70%)]";

// deterministic pseudo-random number in [0, 1) so the layout is stable between renders
const rnd = (a, b, s) => {
  const x = Math.sin(a * 127.1 + b * 311.7 + s * 74.7) * 43758.5453;
  return x - Math.floor(x);
};

const srcOf = (image) => (typeof image === "string" ? image : image?.src);
const pad = (n) => String(n).padStart(2, "0");

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const CUBE_DURATION = 2.3; // seconds each cube's whole animation lasts

/** The wall of glass cubes that covers one corner card. Never blocks clicks. */
function CubeField({ show, delay, seed, size }) {
  const ref = useRef(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  // Measure the card to decide how many cubes fit. Stops once the animation
  // has started, so a window resize can't replay it.
  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const cols = Math.max(2, Math.round(width / size));
      const rows = Math.max(2, Math.round(height / size));
      setGrid((g) => (g.cols === cols && g.rows === rows ? g : { cols, rows }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size, show]);

  const cells = useMemo(() => {
    const { cols: C, rows: R } = grid;
    if (!C) return [];
    const out = [];
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        out.push({
          c,
          r,
          order: c + r,
          frac: (c + r) / (C + R),
          // start deep behind the screen, only a little off-centre
          sx: (rnd(c, r, seed + 1) - 0.5) * 120,
          sy: (rnd(c, r, seed + 2) - 0.5) * 120,
          sz: -900 - rnd(c, r, seed + 3) * 700,
          rx: (rnd(c, r, seed + 4) - 0.5) * 300,
          ry: (rnd(c, r, seed + 5) - 0.5) * 300,
          rz: (rnd(c, r, seed + 6) - 0.5) * 120,
        });
      }
    }
    return out;
  }, [grid, seed]);

  const hidden = (k) => ({
    opacity: 0,
    x: k.sx,
    y: k.sy,
    z: k.sz,
    rotateX: k.rx,
    rotateY: k.ry,
    rotateZ: k.rz,
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {grid.cols > 0 && (
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {cells.map((k) => (
            <div key={`${k.r}-${k.c}`} className="p-[1.5px]">
              <motion.div
                className={GLASS}
                style={{ transformPerspective: 700 }}
                initial={hidden(k)}
                animate={
                  show
                    ? {
                        opacity: [0, 1, 1, 0],
                        x: [k.sx, 0, 0, 0],
                        y: [k.sy, 0, 0, 0],
                        z: [k.sz, 0, 0, 160],
                        rotateX: [k.rx, 0, 0, -100],
                        rotateY: [k.ry, 0, 0, 100],
                        rotateZ: [k.rz, 0, 0, 0],
                      }
                    : hidden(k)
                }
                transition={{
                  duration: CUBE_DURATION,
                  delay: delay + k.order * 0.018,
                  // flip-away starts later for cubes further down-right: a diagonal wave
                  times: [0, 0.36, 0.5 + k.frac * 0.3, 1],
                  ease: ["easeOut", "linear", "easeIn"],
                }}
              >
                <span className={SHEEN} />
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * One bento card.
 * `step`  : order the cards start (0 = first).
 * `cubes` : true on the four corner cards. They get the glass-cube reveal.
 *           Other cards rise out of the background instead (from depth, no sliding).
 * `seed`  : changes the random scatter of the cubes.
 * `size`  : cube size in px.
 * The outer div never moves, so scroll detection stays reliable.
 */
function Tile({ step, seed = 1, size = 44, cubes = false, gridInView, desktop, className = "", children }) {
  const ref = useRef(null);
  const selfInView = useInView(ref, { once: true, amount: 0.2 });
  // Desktop: the whole grid plays as one wave. Mobile: each card on scroll.
  const show = desktop ? gridInView : selfInView;
  const delay = desktop ? step * STAGGER : 0;

  // once the cube animation is over, remove the cube layer completely
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!cubes || !show) return;
    const total = (delay + CUBE_DURATION + 0.8) * 1000; // 0.8s covers the per-cube wave offset
    const t = setTimeout(() => setGone(true), total);
    return () => clearTimeout(t);
  }, [cubes, show, delay]);

  // cube tiles: the card fades in under the glass wall
  // other tiles: the card itself rises from behind
  const hiddenCard = cubes
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.8, z: -400, rotateX: 14 };
  const shownCard = cubes ? { opacity: 1 } : { opacity: 1, scale: 1, z: 0, rotateX: 0 };
  const cardDelay = cubes ? delay + 1.0 : delay;

  return (
    <div
      ref={ref}
      className={`relative min-h-0 min-w-0 ${className}`}
      style={cubes ? undefined : { perspective: PERSPECTIVE }}
    >
      <motion.div
        className="h-full w-full"
        initial={hiddenCard}
        animate={show ? shownCard : hiddenCard}
        transition={
          cubes
            ? { duration: 0.8, ease: EASE_OUT, delay: cardDelay }
            : {
                opacity: { duration: 0.5, ease: "easeOut", delay: cardDelay },
                default: { type: "spring", stiffness: 90, damping: 16, delay: cardDelay },
              }
        }
      >
        {children}
      </motion.div>
      {cubes && !gone && <CubeField show={show} delay={delay} seed={seed} size={size} />}
    </div>
  );
}

function Picture({ item, className = "" }) {
  const src = srcOf(item.image);
  const [failedSrc, setFailedSrc] = useState(null);
  const fit = item.fit || IMAGE_FIT;

  if (!src || failedSrc === src) {
    return (
      <div className="flex h-full w-full items-center justify-center px-3 text-center text-sm font-bold uppercase tracking-widest opacity-30">
        {item.name}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={item.name}
      draggable={false}
      onError={() => setFailedSrc(src)}
      className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
        fit === "cover" ? "object-cover" : "object-contain p-4"
      } ${className}`}
    />
  );
}

function ImageCard({ item, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Show ${item.name}`}
      className={`group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#d8cdb8] to-[#a8987c] text-[#23221e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23221e] ${
        active ? "ring-2 ring-inset ring-[#c9a45c]" : ""
      }`}
    >
      <span className="absolute inset-0 pb-8">
        <Picture item={item} />
      </span>
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8 text-left text-xs font-bold uppercase tracking-[0.12em] text-white">
        <span className="truncate">{item.name}</span>
        <ArrowRight className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

// Hero turns like a cube face. `dir` is +1 when moving forward, -1 backward,
// so the old face leaves one way and the new face arrives from the other.
const heroVariants = {
  enter: (dir) => ({ opacity: 0, rotateY: dir * 80, scale: 0.9 }),
  center: { opacity: 1, rotateY: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, rotateY: dir * -80, scale: 0.9 }),
};

function HeroCard({ item, dir }) {
  const cover = (item.fit || IMAGE_FIT) === "cover";

  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_25%,#f3dfb4_0%,#9c8157_38%,#2d271d_82%)] text-white"
      style={{ perspective: PERSPECTIVE }}
    >
      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={item.name}
          custom={dir}
          variants={heroVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <div className={cover ? "absolute inset-0" : "absolute inset-x-[4%] bottom-[30%] top-[3%]"}>
            <Picture item={item} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-5 text-center md:pb-7">
            <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-[0.18em] text-white md:text-3xl xl:text-4xl">
              {item.name}
            </h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {(item.stats || []).map((s) => {
                const Icon = STAT_ICONS[s.icon] || Briefcase;
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    <b className="tabular-nums">{s.value}</b>
                    <span className="opacity-75">{s.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const creamCard =
  "flex h-full w-full flex-col justify-between gap-3 overflow-hidden rounded-2xl bg-[#f1ebdf] p-5 text-[#2b2823] xl:p-6";
const label = "text-[0.65rem] font-semibold uppercase tracking-[0.18em] opacity-60";
const heading = "text-xl font-bold uppercase leading-tight xl:text-2xl";
const body = "text-[0.8rem] leading-relaxed opacity-75";

/**
 * Category deck (the dark card).
 * - Prev / next buttons step through the store types in order.
 * - A progress line shows how far through the list you are.
 * - The category chips share ONE highlight that glides from chip to chip.
 * - Left / right arrow keys work while the card has focus.
 */
function CategoryDeck({ industries, active, onSelect }) {
  const N = industries.length;
  const current = industries[active];
  const go = (delta) => onSelect((active + delta + N) % N);

  return (
    <div
      className="flex h-full w-full flex-col gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#33312b] to-[#1c1b17] p-5 text-[#f1ebdf] xl:p-6"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className={`${label} tabular-nums`}>
          {pad(active + 1)} / {pad(N)}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous store type"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-white/70 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next store type"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-white/70 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-white/15">
        <motion.div
          className="h-full bg-[#c9a45c]"
          animate={{ width: `${((active + 1) / N) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />
      </div>

      <div className="min-h-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3 className={`${heading} text-[#f1ebdf]`}>{current.name}</h3>
            <p className={`${body} mt-1.5 line-clamp-2`}>{current.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-auto flex max-h-[4.75rem] flex-wrap gap-1.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {industries.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={on}
              className={`relative cursor-pointer whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                on ? "border-transparent text-[#23221e]" : "border-white/25 hover:border-white/60"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="category-highlight"
                  className="absolute inset-0 rounded-full bg-[#f1ebdf]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Industries({
  industries = INDUSTRIES,
  eyebrow = "Store Types",
  title = (
    <>
      Racks for <span className="text-brand">Every Store Type</span>
    </>
  ),
  subtitle = "Pick a store type to see it up close.",
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.25 });
  const desktop = useMediaQuery("(min-width: 1024px)");

  const N = industries.length;
  if (!N) return null;

  // every selection goes through here so the hero knows which way to turn
  const select = (i) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  const current = industries[active] || industries[0];
  // The four small image cards (repeats if you have fewer than 4)
  const picks = [0, 1, 2, 3].map((i) => i % N);
  const reveal = { gridInView, desktop };

  const imageCard = (slot) => (
    <ImageCard
      item={industries[picks[slot]]}
      active={active === picks[slot]}
      onSelect={() => select(picks[slot])}
    />
  );

  return (
    <MotionConfig reducedMotion="user">
      <section id="industries" className="bg-soft relative overflow-x-clip py-8 md:py-10">
        <div className="mx-auto w-full max-w-[1620px] px-4 sm:px-6 lg:px-8">
          <header className="mb-6">
            <span className="eyebrow">
              <span className="h-[2px] w-5 bg-brand" /> {eyebrow}
            </span>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-sm opacity-70">{subtitle}</p>}
          </header>

          {/* Mobile: 2-column grid. Desktop: top row + bottom row.
              Corner cards (cubes) = top-left cream, top-right image, bottom-left image, bottom-right image. */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3 lg:flex lg:flex-col"
          >
            {/* ---------- TOP ROW ---------- */}
            <div className="contents lg:grid lg:h-[clamp(440px,38vw,540px)] lg:grid-cols-[173fr_410fr_170fr] lg:grid-rows-[minmax(0,1fr)] lg:gap-3">
              {/* left column */}
              <div className="contents lg:grid lg:min-h-0 lg:grid-rows-[188fr_216fr] lg:gap-3">
                {/* CORNER: top-left */}
                <Tile {...reveal} cubes step={1} seed={1} className="order-2 col-span-2 lg:order-none lg:col-span-1">
                  <div className={creamCard}>
                    <p className={label}>{eyebrow}</p>
                    <h3 className={heading}>
                      Beyond
                      <br />
                      the shelf
                    </h3>
                    <p className={body}>
                      Display racks planned around the way each store sells.
                    </p>
                    <p className={label}>{pad(N)} store types</p>
                  </div>
                </Tile>
                <Tile {...reveal} step={1} className="order-3 h-40 sm:h-52 lg:order-none lg:h-auto">
                  {imageCard(0)}
                </Tile>
              </div>

              {/* centre hero */}
              <Tile {...reveal} step={2} className="order-1 col-span-2 h-[340px] sm:h-[400px] lg:order-none lg:col-span-1 lg:h-auto">
                <HeroCard item={current} dir={dir} />
              </Tile>

              {/* right column */}
              <div className="contents lg:grid lg:min-h-0 lg:grid-rows-[225fr_178fr] lg:gap-3">
                {/* CORNER: top-right */}
                <Tile {...reveal} cubes step={3} seed={4} className="order-4 h-40 sm:h-52 lg:order-none lg:h-auto">
                  {imageCard(1)}
                </Tile>
                <Tile {...reveal} step={4} className="order-5 col-span-2 lg:order-none lg:col-span-1">
                  <div className={creamCard}>
                    <p className={label}>Purposeful design</p>
                    <h3 className={heading}>
                      Function
                      <br />
                      meets form
                    </h3>
                    <p className={body}>
                      Every rack is shaped to hold, show and sell your products.
                    </p>
                    <a href={CTA_HREF} className={`${label} group inline-flex items-center gap-2 !opacity-100`}>
                      Get a quote
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </Tile>
              </div>
            </div>

            {/* ---------- BOTTOM ROW ---------- */}
            <div className="contents lg:grid lg:h-[clamp(210px,16.5vw,240px)] lg:grid-cols-[205fr_315fr_232fr] lg:grid-rows-[minmax(0,1fr)] lg:gap-3">
              {/* CORNER: bottom-left */}
              <Tile {...reveal} cubes step={0} seed={6} className="order-6 h-40 sm:h-52 lg:order-none lg:h-auto">
                {imageCard(2)}
              </Tile>

              <Tile {...reveal} step={3} className="order-8 col-span-2 lg:order-none lg:col-span-1">
                <CategoryDeck industries={industries} active={active} onSelect={select} />
              </Tile>

              {/* CORNER: bottom-right */}
              <Tile {...reveal} cubes step={2} seed={8} className="order-7 h-40 sm:h-52 lg:order-none lg:h-auto">
                {imageCard(3)}
              </Tile>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}