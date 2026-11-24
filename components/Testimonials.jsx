"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Quote, Star } from "lucide-react";

const SCROLL_PER_REVIEW = 90; // vh of scrolling for each review

const DEFAULT_ITEMS = [
  {
    name: "Priya Sharma",
    place: "Gurugram",
    project: "Living room sliding windows",
    rating: 5,
    gif: "/testimonials/guy-1.gif",
    image: "/testimonials/projects/priya-living-room.jpg", // shaded project photo (optional)
    avatar: "/testimonials/people/priya.jpg", // customer photo (optional)
    review:
      "They measured everything on site and the windows fit perfectly. The sound from the road outside has dropped a lot and the team cleaned up after themselves.",
    say: "Priya from Gurugram loved her new sliding windows. The fit was perfect and her living room is much quieter. Thank you, {name}!",
  },
  {
    name: "Rahul Mehta",
    place: "Noida",
    project: "Full home UPVC windows",
    rating: 5,
    gif: "/testimonials/guy-2.gif",
    image: "/testimonials/projects/rahul-home.jpg",
    avatar: "/testimonials/people/rahul.jpg",
    review:
      "The design drawing was approved in two days, and delivery came exactly on the date they promised. Finishing is better than what I saw in showrooms.",
    say: "Rahul got his whole home done and the delivery landed right on the promised date. Thank you so much, {name}!",
  },
  {
    name: "Anita Verma",
    place: "Delhi",
    project: "Balcony doors",
    rating: 5,
    gif: "/testimonials/guy-3.gif",
    image: "/testimonials/projects/anita-balcony.jpg",
    avatar: "/testimonials/people/anita.jpg",
    review:
      "I had many questions and they answered every one without any pressure. The balcony doors close smoothly and feel very solid.",
    say: "Anita had a lot of questions and we were happy to answer each one. Her balcony doors are working beautifully. Thanks, {name}!",
  },
  {
    name: "Sanjay Kapoor",
    place: "Faridabad",
    project: "Office glass partitions",
    rating: 5,
    gif: "/testimonials/guy-3.gif",
    image: "/testimonials/projects/sanjay-office.jpg",
    avatar: "/testimonials/people/sanjay.jpg",
    review:
      "Installation took a single day and nobody had to stop working. A few months later everything still looks and works like new.",
    say: "Sanjay's office was fitted in one day with zero downtime. Months later it still looks new. Thank you, {name}!",
  },
];

/* ---------- Typewriter ---------- */

function Typewriter({ text }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 22);
    return () => clearInterval(id);
  }, [text, reduce]);

  return (
    <>
      {text.slice(0, n)}
      {n < text.length && (
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-brand align-middle" />
      )}
    </>
  );
}

/* ---------- Cracker burst around the guy ---------- */

const CONFETTI_COLORS = [
  "#f97316",
  "#fbbf24",
  "#0f1f4b",
  "#ec4899",
  "#22c55e",
  "#38bdf8",
];

function Confetti({ burstKey }) {
  const reduce = useReducedMotion();
  const [pieces, setPieces] = useState([]);

  // generated in an effect so server and client HTML never mismatch
  useEffect(() => {
    if (reduce) return;
    const count = 40;
    setPieces(
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const dist = 110 + Math.random() * 150;
        return {
          id: `${burstKey}-${i}`,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          rotate: Math.random() * 720 - 360,
          size: 6 + Math.random() * 7,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          round: Math.random() > 0.6,
          delay: Math.random() * 0.15,
        };
      })
    );
  }, [burstKey, reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[45%] z-20 h-0 w-0"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            borderRadius: p.round ? "9999px" : 2,
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 70], // burst out, then fall with gravity
            opacity: [1, 1, 0],
            scale: [0, 1, 1],
            rotate: p.rotate,
          }}
          transition={{
            duration: 1.5,
            delay: p.delay,
            ease: "easeOut",
            times: [0, 0.55, 1],
          }}
        />
      ))}
    </div>
  );
}

/* ---------- The 2D guy: one GIF per review, crossfaded ---------- */

function Guy({ item, index }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          // new key = new <img>, so every GIF starts from its first frame
          key={index}
          src={item.gif}
          alt={`Presenter talking about ${item.name}'s review`}
          draggable={false}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 h-full w-full select-none object-contain object-bottom"
        />
      </AnimatePresence>
    </div>
  );
}

/* ---------- One review card ---------- */

function ReviewCard({ item, index, active }) {
  const depth = active - index; // <0 not yet shown, 0 current, >0 already passed
  const state =
    depth < 0
      ? { opacity: 0, y: 120, scale: 0.92, rotate: 3, x: 40 }
      : depth === 0
      ? { opacity: 1, y: 0, scale: 1, rotate: 0, x: 0 }
      : {
          opacity: Math.max(0, 1 - depth * 0.4),
          y: -depth * 22,
          scale: 1 - depth * 0.05,
          rotate: depth % 2 ? -1.5 : 1.5,
          x: 0,
        };

  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  // fades the photo out toward the top-left, where the text lives
  const fade = "linear-gradient(to top left, black 25%, transparent 78%)";

  return (
    <motion.article
      initial={false}
      animate={state}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      style={{ zIndex: index + 1 }}
      className="glass-card absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-xl sm:p-8"
      aria-hidden={depth !== 0}
    >
      {/* ---- shaded project photo ---- */}
      {item.image && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[78%] w-[68%] opacity-70 sm:opacity-100"
          style={{ WebkitMaskImage: fade, maskImage: fade }}
        >
          <motion.img
            src={item.image}
            alt=""
            draggable={false}
            initial={false}
            animate={{ scale: depth === 0 ? 1 : 1.15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
          {/* brand colour tint so every photo matches the site */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 via-brand/10 to-transparent mix-blend-multiply" />
        </div>
      )}

      {/* soft orange glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl"
      />

      <Quote className="absolute right-6 top-6 z-10 h-16 w-16 text-brand/10" />

      {/* ---- content (above the photo) ---- */}
      <div className="relative z-10">
        <div
          className="flex gap-1"
          aria-label={`${item.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < item.rating ? "fill-brand text-brand" : "text-black/15"
              }`}
            />
          ))}
        </div>
        <p className="mt-5 text-lg font-semibold leading-relaxed sm:text-xl">
          “{item.review}”
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-4 border-t border-black/5 pt-5">
        {/* avatar: offset orange shape behind a white-ringed photo */}
        <div className="relative shrink-0">
          <span className="absolute -bottom-1.5 -right-1.5 h-14 w-14 rounded-full bg-brand/30" />
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              draggable={false}
              className="relative h-14 w-14 rounded-full object-cover shadow-orange ring-4 ring-white"
            />
          ) : (
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-orange">
              {initials}
            </span>
          )}
        </div>
        <div>
          <p className="text-base font-bold">{item.name}</p>
          <p className="text-sm opacity-70">
            {item.project}, {item.place}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Section ---------- */

export default function Testimonials({ items = DEFAULT_ITEMS }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // preload every GIF and project photo so switching reviews never flashes
  useEffect(() => {
    items.forEach((it) => {
      if (it.gif) new window.Image().src = it.gif;
      if (it.image) new window.Image().src = it.image;
      if (it.avatar) new window.Image().src = it.avatar;
    });
  }, [items]);

  // scroll position -> which review is showing
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(
      total - 1,
      Math.max(0, Math.floor(v * (total + 0.4)))
    );
    setActive(next);
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const current = items[active];
  const firstName = current.name.split(" ")[0];
  const line = current.say.replaceAll("{name}", firstName);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="bg-soft relative"
      style={{ height: `${(total + 1) * SCROLL_PER_REVIEW}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="section-pad mx-auto w-full max-w-[1300px]">
          {/* heading */}
          <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="h-[2px] w-5 bg-brand" /> Happy Customers
              </span>
              <h2 className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
                Hear it from the people we’ve worked with
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">
                {active + 1} / {total}
              </span>
              <div className="h-[3px] w-40 overflow-hidden rounded-full bg-black/10">
                <motion.div
                  style={{ scaleX: barScale, originX: 0 }}
                  className="h-full w-full bg-brand"
                />
              </div>
            </div>
          </div>

          <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            {/* LEFT: the guy (GIF) + his speech bubble */}
            <div className="relative flex flex-col items-center lg:flex-row lg:items-end lg:justify-center">
              {/* GIF - full size, sits BEHIND the bubble (z-10) */}
              <div className="relative z-10 h-[28vh] w-[20vh] shrink-0 sm:h-[36vh] sm:w-[28vh] lg:h-[60vh] lg:w-[48vh]">
                <Guy item={current} index={active} />
                <Confetti burstKey={active} />
              </div>

              {/* Speech bubble - ABOVE the GIF (z-30), pulled over its empty side space */}
              <div className="relative z-30 order-first mb-3 w-full max-w-[360px] lg:order-none lg:mb-[22vh] lg:-ml-[16vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl rounded-bl-md bg-[#0f1f4b] p-5 text-white shadow-xl"
                  >
                    <p className="min-h-[5.5rem] text-sm leading-relaxed sm:text-base">
                      <Typewriter text={line} />
                    </p>
                    <p className="mt-3 text-xs font-bold text-brand">
                      {current.name}, {current.place}
                    </p>
                    {/* bubble tail */}
                    <span className="absolute -bottom-2 left-6 hidden h-4 w-4 rotate-45 bg-[#0f1f4b] lg:block" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: review cards appear one by one */}
            <div className="relative h-[40vh] min-h-[300px] w-full lg:h-[52vh] lg:min-h-[380px]">
              {items.map((item, i) => (
                <ReviewCard
                  key={item.name}
                  item={item}
                  index={i}
                  active={active}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}