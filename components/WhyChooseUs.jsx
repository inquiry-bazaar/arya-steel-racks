"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Gem, Headset, Play, Settings, ShieldCheck, Users, Zap } from "lucide-react";
import MediaSlot from "./MediaSlot";
import VideoModal from "./VideoModal";
import { features, media } from "@/data/content";

const icons = { gem: Gem, settings: Settings, zap: Zap, headset: Headset };

const SHAPE = "28px 120px 28px 120px";
const EASE = [0.22, 1, 0.36, 1];
const VIEW = { once: true, amount: 0.1, margin: "0px 0px -40px 0px" };

const stagger = (gap = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const pop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 16 } },
};
const spinPop = {
  hidden: { opacity: 0, scale: 0, rotate: -120 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 160, damping: 14 } },
};
const fromBottomRight = {
  hidden: { opacity: 0, x: 60, y: 60, scale: 0.95 },
  show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};
const fromTopLeft = {
  hidden: { opacity: 0, x: -30, y: -30 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 160, damping: 16 } },
};
const word = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.4, ease: EASE } },
};
const cardV = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

function Parallax({ mx, my, depth = 20, className = "", children }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Float({ className = "", dur = 6, y = 14, rotate = 0, delay = 0, children }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -y, 0], rotate: [0, rotate, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

function Counter({ to = 1000, suffix = "+" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
  const controls = animate(0, to, {
  duration: 1.2,
  delay: 0.2,
  ease: "easeOut",
  onUpdate: (v) => setVal(Math.round(v)),
});
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}




function RotatingBadge() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-glass">
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <defs>
          <path id="why-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="#0f2557">
          <textPath href="#why-circle">ARYA DISPLAY RACK • NEW DELHI • </textPath>
        </text>
      </motion.svg>
      <span className="flex h-12 w-12 rotate-45 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-orange">
        <ShieldCheck className="-rotate-45 h-6 w-6" />
      </span>
    </div>
  );
}



function FeatureCard({ item, index }) {
  const Icon = icons[item.icon];

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 180, damping: 16 });
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 180, damping: 16 });
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${sx}px ${sy}px, rgba(249,115,22,0.2), transparent 70%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    px.set(x / r.width);
    py.set(y / r.height);
    sx.set(x);
    sy.set(y);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div variants={cardV} style={{ perspective: 900 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
       className="group relative rounded-2xl bg-white/70 p-[1.5px] shadow-glass transition-shadow duration-500"
      >
      
        <div className="relative flex items-center gap-4 overflow-hidden rounded-[15px] bg-white/90 p-4 backdrop-blur-sm">
          {/* cursor spotlight */}
          <motion.span
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* one-time shimmer sweep when the card appears */}
          <motion.span
            variants={{
              hidden: { x: "-140%" },
              show: { x: "380%", transition: { duration: 1.3, delay: 0.7 + index * 0.12, ease: "easeInOut" } },
            }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand/25 to-transparent"
          />

         
<span className="relative flex h-12 w-12 shrink-0 rotate-45 items-center justify-center rounded-xl bg-white shadow-glass ring-1 ring-navy/5 transition-all duration-500 group-hover:rotate-[225deg]">
+            <Icon className="h-5 w-5 -rotate-45 text-navy transition-all duration-500 group-hover:-rotate-[225deg]" />
          </span>

          <span className="relative">
            <span className="block text-[14px] font-bold leading-tight">{item.label}</span>
            <span className="mt-2 block h-[3px] w-5 rounded-full bg-brand/70 transition-all duration-500 group-hover:w-full" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const HEADING = ["Your", "Trusted", "Partner", "in", "Retail", "Storage", "Solutions"];

export default function WhyChooseUs() {
  const [videoOpen, setVideoOpen] = useState(false);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 50, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 50, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="why" onMouseMove={onMove} className="bg-soft relative overflow-hidden pb-32 pt-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,37,87,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,37,87,0.045) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

        

          <Parallax mx={mx} my={my} depth={34} className="absolute right-[5%] top-[12%] hidden xl:block">
            <Float dur={9} y={18} rotate={20}>
              <div className="h-28 w-28 rotate-45 rounded-[28px] border-2 border-navy/10" />
            </Float>
          </Parallax>
          <Parallax mx={mx} my={my} depth={-28} className="absolute bottom-16 right-[3%] hidden xl:block">
            <Float dur={7} y={16} rotate={-25}>
              <div className="h-16 w-16 rotate-45 rounded-2xl bg-brand/20" />
            </Float>
          </Parallax>
      
          <Parallax mx={mx} my={my} depth={-22} className="absolute bottom-[14%] left-[44%] hidden lg:block">
            <Float dur={8} y={14}>
              <div className="h-5 w-5 rounded-full border-2 border-navy/25" />
            </Float>
          </Parallax>
        </div>

        <div className="section-pad relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <motion.div
            variants={stagger(0.13)}
            initial="hidden"
            whileInView="show"
            viewport={VIEW}
            className="relative mx-auto w-full max-w-[660px] pb-14 pr-6 pt-6 sm:pr-10"
          >
            {/* slowly spinning dashed orbit */}
            <div className="pointer-events-none absolute -inset-[7%] hidden sm:block" aria-hidden="true">
              <motion.svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                preserveAspectRatio="none"
              >
                <ellipse cx="50" cy="50" rx="49" ry="49" fill="none" stroke="#0f2557" strokeOpacity="0.16" strokeWidth="0.35" strokeDasharray="1.2 2.4" vectorEffect="non-scaling-stroke" />
              </motion.svg>
            </div>

            {/* pulsing glow */}
            <motion.div
              className="absolute left-[8%] top-[8%] h-[72%] w-[72%] rounded-full bg-brand/25 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />

            {/* steel-striped navy block */}
            <motion.div
              variants={fromBottomRight}
              className="absolute bottom-0 right-0 h-[78%] w-[80%] shadow-glass"
              style={{
                borderRadius: SHAPE,
                background:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 16px), linear-gradient(135deg, #1a3a85, #0a1a3f)",
              }}
              aria-hidden="true"
            />
            {/* orange outline */}
            <motion.div
              variants={fromTopLeft}
              className="absolute -left-3 top-2 h-[62%] w-[62%] border-2 border-brand"
              style={{ borderRadius: SHAPE }}
              aria-hidden="true"
            />

        

            {/* main image: wipe-in reveal + slow zoom settle */}
            <motion.div
              variants={rise}
              className="relative aspect-[5/4] w-[90%] overflow-hidden bg-white shadow-glass ring-[6px] ring-white"
              style={{ borderRadius: SHAPE }}
            >
              <motion.div
                className="absolute inset-0"
                variants={{
                  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
                  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE, delay: 0.1 } },
                }}
              >
                <motion.div
                  className="h-full w-full"
                  variants={{
                    hidden: { scale: 1.35 },
                    show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
                  }}
                >
                  <MediaSlot src={media.whyPoster} alt="Why-us video poster" className="h-full w-full object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.button
                  variants={pop}
                  whileHover={{ scale: 1.14 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVideoOpen(true)}
                  aria-label="Play video"
                  className="pointer-events-auto relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-orange"
                >
                  <span className="absolute -inset-3 animate-ping rounded-full border-2 border-white/60" />
                  <span className="absolute -inset-1.5 rounded-full border border-white/70" />
                  <Play className="relative ml-1 h-7 w-7 fill-white" />
                </motion.button>
              </div>
            </motion.div>

            {/* round detail image */}
            <Parallax mx={mx} my={my} depth={-14} className="absolute bottom-2 right-0">
              <motion.div
                variants={pop}
                className="h-36 w-36 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-glass sm:h-44 sm:w-44"
              >
                <MediaSlot
                  src={media.whyPoster}
                  alt="Display rack detail"
                  className="h-full w-full scale-[1.8] object-cover object-[78%_60%]"
                />
              </motion.div>
            </Parallax>

            {/* rotating badge */}
            <Parallax mx={mx} my={my} depth={20} className="absolute right-0 top-0 hidden sm:block">
              <motion.div variants={spinPop}>
                <RotatingBadge />
              </motion.div>
            </Parallax>

       

            <Parallax mx={mx} my={my} depth={14} className="absolute bottom-0 left-4">
              <motion.div variants={slideLeft}>
                <Float dur={6.5} y={8} delay={0.6}>
                  <div className="glass-card flex items-center gap-3 py-3 pl-3 pr-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-orange">
                      <Users className="h-6 w-6" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[20px] font-extrabold tabular-nums">
                        <Counter to={60} />
                      </p>
                      <p className="text-[13px] font-medium text-navy/70">Display Products</p>
                    </div>
                  </div>
                </Float>
              </motion.div>
            </Parallax>
          </motion.div>

          <motion.div variants={stagger(0.14, 0.15)} initial="hidden" whileInView="show" viewport={VIEW}>
            <motion.span variants={rise} className="eyebrow">
              <motion.span
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: EASE } } }}
                style={{ originX: 0 }}
                className="h-[2px] w-5 bg-brand"
              />
              Why Choose Us
            </motion.span>

            <motion.h2
              variants={stagger(0.08)}
              className="mt-4 max-w-[600px] text-[34px] font-extrabold leading-[1.15] tracking-tight sm:text-[44px]"
            >
              {HEADING.map((w) =>
                w === "Retail" ? (
                  <motion.span key={w} variants={word} className="relative mr-[0.26em] inline-block">
                    <motion.span
                      className="inline-block bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 bg-clip-text text-transparent"
                      style={{ backgroundSize: "200% 100%" }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      {w}
                    </motion.span>
                    
                  </motion.span>
                ) : (
                  <motion.span key={w} variants={word} className="mr-[0.26em] inline-block">
                    {w}
                  </motion.span>
                )
              )}
            </motion.h2>

            <motion.p variants={rise} className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-navy/80">
              Established in 2021, we make display racks with high-quality raw material and test every range for rust resistance, finishing, strength and smoothness.
            </motion.p>

            <motion.div variants={stagger(0.13, 0.05)} className="mt-9 grid max-w-[620px] gap-4 sm:grid-cols-2">
              {features.map((item, index) => (
                <FeatureCard key={item.label} item={item} index={index} />
              ))}
            </motion.div>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#contact" className="btn-orange group relative overflow-hidden">
                <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[520%]" />
                <span className="relative">Get a Free Quote</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button onClick={() => setVideoOpen(true)} className="group flex items-center gap-3 text-[14px] font-bold">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-glass ring-1 ring-navy/5 transition group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-brand/50 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
                  <Play className="ml-0.5 h-4 w-4 fill-navy" />
                </span>
                Watch Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>

        <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} src={media.whyVideo} />
      </section>
    </MotionConfig>
  );
}