"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Globe,
  Plus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const INDUSTRIES = [
  {
    name: "Healthcare",
    image: "/industries/healthcare.jpg",
    desc: "Secure care platforms that put patients first.",
    stats: [
      { icon: "shield", value: "60+", label: "clinics" },
      { icon: "globe", value: "9", label: "countries" },
      { icon: "chart", value: "99.9%", label: "uptime" },
    ],
  },
  {
    name: "Finance",
    image: "/industries/finance.jpg",
    desc: "Faster, safer money movement at scale.",
    stats: [
      { icon: "briefcase", value: "80+", label: "projects" },
      { icon: "globe", value: "12", label: "countries" },
      { icon: "shield", value: "100%", label: "compliant" },
    ],
  },
  {
    name: "E-commerce",
    image: "/industries/ecommerce.jpg",
    desc: "Connecting businesses with customers, faster.",
    stats: [
      { icon: "briefcase", value: "120+", label: "projects" },
      { icon: "globe", value: "15", label: "countries" },
      { icon: "shield", value: "98%", label: "retention" },
    ],
  },
  {
    name: "Education",
    image: "/industries/education.jpg",
    desc: "Learning that adapts to every student.",
    stats: [
      { icon: "briefcase", value: "45+", label: "projects" },
      { icon: "globe", value: "8", label: "countries" },
      { icon: "chart", value: "92%", label: "completion" },
    ],
  },
  {
    name: "Manufacturing",
    image: "/industries/manufacturing.jpg",
    desc: "Smarter factories with less downtime.",
    stats: [
      { icon: "briefcase", value: "70+", label: "projects" },
      { icon: "globe", value: "11", label: "countries" },
      { icon: "chart", value: "35%", label: "less downtime" },
    ],
  },
  {
    name: "Logistics",
    image: "/industries/logistics.jpg",
    desc: "Live visibility from dock to doorstep.",
    stats: [
      { icon: "briefcase", value: "90+", label: "projects" },
      { icon: "globe", value: "18", label: "countries" },
      { icon: "chart", value: "2x", label: "faster routes" },
    ],
  },
  {
    name: "Real Estate",
    image: "/industries/real-estate.jpg",
    desc: "Listings and leasing, made effortless.",
    stats: [
      { icon: "briefcase", value: "55+", label: "projects" },
      { icon: "globe", value: "7", label: "countries" },
      { icon: "shield", value: "97%", label: "retention" },
    ],
  },
  {
    name: "Travel",
    image: "/industries/travel.jpg",
    desc: "Journeys planned and booked in minutes.",
    stats: [
      { icon: "briefcase", value: "65+", label: "projects" },
      { icon: "globe", value: "24", label: "countries" },
      { icon: "chart", value: "4.8", label: "avg rating" },
    ],
  },
];

const STAT_ICONS = {
  briefcase: Briefcase,
  globe: Globe,
  shield: ShieldCheck,
  chart: TrendingUp,
};

const C = {
  ink: "#0f2557",
  blue: "#1f5cff",
  yellow: "#ffc21a",
  muted: "#b3bbd2",
  muted2: "#8e98b8",
};

const EASE_OUT = [0.16, 1, 0.3, 1];
const SCROLL_PER_ITEM_VH = 70;
const pad = (n) => String(n).padStart(2, "0");
const srcOf = (image) => (typeof image === "string" ? image : image?.src);

const CHIP_POS = [
  "left-[-6%] top-[20%] after:left-6",
  "right-[-2%] top-[15%] after:left-6",
  "right-[-5%] top-[52%] after:right-[30px]",
];

const chipsGroup = {
  hidden: {},
  show: { transition: { delayChildren: 1.15, staggerChildren: 0.12 } },
};

const pop = {
  hidden: { scale: 0.4, y: 12, opacity: 0 },
  show: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 420, damping: 18 },
  },
};

const ARCH_FROM = {
  opacity: 0.4,
  scale: 0.9,
  y: 16,
  borderRadius: "30% 30% 40px 40px / 28% 28% 40px 40px",
};

const ARCH_TO = {
  opacity: 1,
  scale: 1,
  y: 0,
  borderRadius: "50% 50% 28px 28px / 44% 44% 28px 28px",
};

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

function useViewportScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () =>
      setScale(Math.min(1.1, Math.max(0.78, window.innerHeight / 820)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

function wavePath({ len, period, amp, mid, vertical = false, close = "" }) {
  const pt = (along, cross) =>
    vertical ? `${cross} ${along}` : `${along} ${cross}`;
  let d = `M${pt(0, mid)}`;
  for (let x = 0; x < len; x += period) {
    d += ` C${pt(x + period * 0.25, mid - amp)} ${pt(
      x + period * 0.75,
      mid + amp
    )} ${pt(x + period, mid)}`;
  }
  return `${d} ${close}`.trim();
}

const H_CLOSE = "L2400 100 L0 100Z";
const WAVES = {
  fillA: wavePath({
    len: 2400,
    period: 420,
    amp: 16,
    mid: 52,
    close: H_CLOSE,
  }),
  fillB: wavePath({
    len: 2400,
    period: 580,
    amp: 12,
    mid: 64,
    close: H_CLOSE,
  }),
  lineA: wavePath({ len: 2400, period: 320, amp: 12, mid: 38 }),
  lineB: wavePath({ len: 2400, period: 420, amp: 16, mid: 58 }),
  vFill: wavePath({
    len: 2400,
    period: 420,
    amp: 9,
    mid: 50,
    vertical: true,
    close: "L0 2400 L0 0Z",
  }),
  vLine: wavePath({
    len: 2400,
    period: 420,
    amp: 9,
    mid: 64,
    vertical: true,
  }),
};

const WAVE_FILL = "#e6ebf8";
const WAVE_LINE = "#cfd8ee";

function HWave({ d, fill, stroke, dur, reverse = false, opacity = 1 }) {
  return (
    <motion.svg
      viewBox="0 0 2400 100"
      preserveAspectRatio="none"
      className="absolute left-0 top-0 h-full w-[200%] max-w-none"
      style={{ opacity }}
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: dur, ease: "linear", repeat: Infinity }}
    >
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

function VWave({ d, fill, stroke, dur, opacity = 1 }) {
  return (
    <motion.svg
      viewBox="0 0 100 2400"
      preserveAspectRatio="none"
      className="absolute left-0 top-0 h-[200%] w-full max-h-none"
      style={{ opacity }}
      animate={{ y: ["0%", "-50%"] }}
      transition={{ duration: dur, ease: "linear", repeat: Infinity }}
    >
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

function EdgeDecor({ progress }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
    >
      <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#dfe7f9]/70 blur-[80px]" />
      <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-[#dfe7f9]/70 blur-[80px]" />

      <div className="absolute inset-x-0 bottom-0 h-[72px] overflow-hidden md:h-24">
        <HWave
          d={WAVES.fillB}
          fill={WAVE_FILL}
          stroke="none"
          dur={78}
          opacity={0.75}
        />
        <HWave
          d={WAVES.fillA}
          fill="#dfe5f5"
          stroke="none"
          dur={54}
          reverse
          opacity={0.65}
        />
        <HWave d={WAVES.lineA} fill="none" stroke={WAVE_LINE} dur={64} />
      </div>

      <div className="absolute inset-x-0 top-0 h-14 rotate-180 overflow-hidden md:h-[72px]">
        <HWave
          d={WAVES.fillB}
          fill={WAVE_FILL}
          stroke="none"
          dur={86}
          opacity={0.55}
        />
        <HWave
          d={WAVES.lineB}
          fill="none"
          stroke={WAVE_LINE}
          dur={58}
          reverse
        />
      </div>

      <div className="absolute inset-y-0 left-0 w-11 overflow-hidden md:w-14">
        <VWave
          d={WAVES.vFill}
          fill={WAVE_FILL}
          stroke="none"
          dur={80}
          opacity={0.65}
        />
        <VWave d={WAVES.vLine} fill="none" stroke={WAVE_LINE} dur={68} />
      </div>

      <div className="absolute inset-y-0 right-0 w-11 -scale-x-100 overflow-hidden md:w-14">
        <VWave
          d={WAVES.vFill}
          fill={WAVE_FILL}
          stroke="none"
          dur={90}
          opacity={0.65}
        />
        <VWave d={WAVES.vLine} fill="none" stroke={WAVE_LINE} dur={72} />
      </div>

      <Plus
        size={16}
        strokeWidth={1.5}
        className="absolute left-4 top-4 text-[#b8c4e0] md:left-5 md:top-5"
      />
      <Plus
        size={16}
        strokeWidth={1.5}
        className="absolute right-4 top-4 text-[#b8c4e0] md:right-5 md:top-5"
      />
      <Plus
        size={16}
        strokeWidth={1.5}
        className="absolute bottom-4 left-4 text-[#b8c4e0] md:bottom-5 md:left-5"
      />
      <Plus
        size={16}
        strokeWidth={1.5}
        className="absolute bottom-4 right-4 text-[#b8c4e0] md:bottom-5 md:right-5"
      />

      <motion.span
        className="absolute inset-x-0 bottom-0 block h-[2.5px] origin-left bg-gradient-to-r from-[#9fb0dd]/90 via-[#8aa0d4]/80 to-[#9fb0dd]/90"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

function ListItem({ item, index, active, total, sizes, onSelect }) {
  const isActive = index === active;
  const dist = Math.abs(index - active);
  const nameSize = isActive ? sizes.active : sizes.inactive;
  const trim = Math.round((sizes.inactive * 1.15) / 2 + sizes.pad);
  const dotPos =
    "absolute top-1/2 left-[-22px] -translate-x-1/2 -translate-y-1/2 md:left-[-32px]";

  return (
    <li className="relative py-4">
      <span
        aria-hidden="true"
        className="absolute left-[-23px] w-[2px] rounded-full bg-[#0f2557]/20 md:left-[-33px]"
        style={{
          top: index === 0 ? trim : 0,
          bottom: index === total - 1 ? trim : 0,
        }}
      />
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-current={isActive}
        style={{ paddingBlock: sizes.pad }}
        className="group relative grid w-full cursor-pointer grid-cols-[30px_minmax(0,1fr)] items-center text-left transition-colors focus-visible:rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f5cff] md:grid-cols-[46px_minmax(0,1fr)]"
      >
        {index === 0 && (
          <span className={dotPos}>
            <span className="block h-2 w-2 rounded-full bg-[#ffc21a]" />
          </span>
        )}
        {isActive && (
          <span className={dotPos}>
            <motion.span
              layoutId="active-dot"
              className="block h-[14px] w-[14px] rounded-full bg-[#ffc21a] shadow-[0_0_0_5px_rgba(255,194,26,0.25)]"
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            />
          </span>
        )}

        <motion.span
          className="text-[0.875rem] font-bold tabular-nums md:text-[0.95rem]"
          animate={{ color: isActive ? C.blue : C.muted2 }}
          transition={{ duration: 0.4 }}
        >
          {pad(index + 1)}
        </motion.span>

        <span className="flex min-w-0 items-center gap-3">
          <motion.span
            className="font-bold leading-[1.15] tracking-[-0.02em]"
            initial={false}
            animate={{
              fontSize: nameSize,
              color: isActive ? C.blue : C.muted,
              opacity: isActive ? 1 : Math.max(0.42, 1 - 0.12 * dist),
              filter: `blur(${isActive ? 0 : Math.min(0.3 + 0.1 * dist, 0.9)}px)`,
            }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {item.name}
          </motion.span>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.span
                key="arrow"
                className="inline-flex flex-none"
                initial={{ opacity: 0, scale: 0.6, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  x: -6,
                  transition: { duration: 0.15 },
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.45,
                  ease: EASE_OUT,
                }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f97316] text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)] transition-transform group-hover:scale-105 md:h-9 md:w-9">
                  <ArrowRight
                    className="h-4 w-4 md:h-[18px] md:w-[18px]"
                    strokeWidth={2.4}
                  />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.p
            key="desc"
            className="overflow-hidden pl-[30px] text-[0.84rem] font-medium leading-relaxed text-[#5c6b8a] md:max-w-[34ch] md:pl-[46px] md:text-[1.02rem]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <span className="block pb-1.5 pt-0.5">{item.desc}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </li>
  );
}

function IndustryImage({ src, alt, number }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dbe3f6] via-[#e8ecf7] to-white">
        <span className="text-7xl font-black text-[#0f2557]/15">
          {pad(number)}
        </span>
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

export default function Industries({
  industries = INDUSTRIES,
  eyebrow = "Industries",
  title = (
    <>
      Built for <span className="text-brand">Every Industry</span>
    </>
  ),
  subtitle = "Scroll to move through each sector.",
}) {
  const N = industries.length;
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const archControls = useAnimationControls();
  const small = useMediaQuery("(max-width: 767px)");
  const scale = useViewportScale();

  const sizes = small
    ? { active: 32, inactive: 20, pad: 8 }
   : {
    active: Math.round(46 * scale),
    inactive: Math.round(30 * scale),
    pad: Math.round(10 * scale),
};

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  useEffect(() => {
    archControls.set(ARCH_FROM);
    archControls.start({
      ...ARCH_TO,
      transition: { duration: 0.75, delay: 0.1, ease: EASE_OUT },
    });
  }, [active, archControls]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + total * ((i + 0.5) / N),
      behavior: "smooth",
    });
  };

  const current = industries[active];

  return (
    <MotionConfig reducedMotion="user">
      <section id="industries" className="bg-soft relative overflow-x-clip">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <header className="pb-6 pt-10 md:pt-14">
            <span className="eyebrow">
              <span className="h-[2px] w-5 bg-brand" /> {eyebrow}
            </span>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm opacity-70">{subtitle}</p>
            )}
          </header>

          <div
            ref={trackRef}
            className="relative"
            style={{ height: `calc(${N * SCROLL_PER_ITEM_VH}vh + 100vh)` }}
            aria-label="Industries"
          >
            <div className="sticky top-0 flex h-screen items-start py-3 md:items-center md:py-6">
              <div className="glass-card relative isolate w-full px-4 py-5 md:px-16 md:pb-12 md:pt-12 lg:px-24">
                <EdgeDecor progress={scrollYProgress} />

<div className="relative z-[1] grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,460px)_minmax(0,600px)] md:items-center md:justify-center md:gap-x-24 lg:gap-x-32 xl:gap-x-36 py-18">
                  <ul className="min-w-0 pl-[30px] md:pl-10">
                    {industries.map((item, i) => (
                      <ListItem
                        key={item.name}
                        item={item}
                        index={i}
                        active={active}
                        total={N}
                        sizes={sizes}
                        onSelect={goTo}
                      />
                    ))}
                  </ul>

                  <div className="relative mx-auto aspect-[400/420] w-full min-w-0 max-w-[min(248px,30vh)] md:max-w-[min(640px,60vh)]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={active}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[-3%] top-[-4%] z-[1] text-[3.6rem] font-extrabold leading-none tracking-[-0.03em] text-transparent tabular-nums [-webkit-text-stroke:1.5px_#cdd3e8] md:text-[clamp(4.5rem,8vw,7.5rem)]"
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      >
                        {pad(active + 1)}
                      </motion.span>
                    </AnimatePresence>

                    <div className="absolute bottom-[4%] left-[8%] right-0 top-[16%] rounded-full bg-[#dbe3f6] opacity-70 blur-3xl" />
                    <div className="absolute -bottom-[2%] left-[10%] right-[2%] h-[6%] rounded-[50%] bg-[#0f2557]/15 blur-xl" />

                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                      viewBox="0 0 400 420"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <motion.circle
                        key={`blob${active}`}
                        cx="372"
                        cy="270"
                        r="56"
                        fill={C.blue}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.16 }}
                        transition={{
                          delay: 1,
                          duration: 0.7,
                          ease: EASE_OUT,
                        }}
                      />
                      <motion.path
                        key={`arc${active}`}
                        d="M247.6 30.8 A182 182 0 0 1 391.8 162.9"
                        fill="none"
                        stroke={C.yellow}
                        strokeWidth={18}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.35,
                          duration: 0.9,
                          ease: EASE_OUT,
                        }}
                      />
                    </svg>

                    <motion.div
                      animate={archControls}
                      className="absolute bottom-0 left-[12%] right-[4%] top-[10%] overflow-hidden border-4 border-white/80 bg-[#e8ecf7] shadow-[0_30px_60px_-30px_rgba(15,37,87,0.45)]"
                    >
                      <AnimatePresence>
                        <motion.div
                          key={active}
                          className="absolute inset-0"
                          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.35 },
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: EASE_OUT,
                          }}
                        >
                          <motion.div
                            className="h-full w-full"
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3,
                              ease: EASE_OUT,
                            }}
                          >
                            <IndustryImage
                              src={srcOf(current.image)}
                              alt={`${current.name} industry`}
                              number={active + 1}
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0f2557]/20 to-transparent" />
                    </motion.div>

                    <AnimatePresence>
                      <motion.div
                        key={active}
                        className="pointer-events-none absolute inset-0 z-[3]"
                        variants={chipsGroup}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, transition: { duration: 0.25 } }}
                      >
                        {current.stats.map((s, k) => {
                          const Icon = STAT_ICONS[s.icon] || Briefcase;
                          return (
                            <motion.div
                              key={s.label}
                              variants={pop}
                              className={`absolute flex items-center gap-[7px] rounded-xl bg-white px-2.5 py-[7px] shadow-[0_10px_28px_rgba(40,55,110,0.16)] after:absolute after:-bottom-[5px] after:h-3 after:w-3 after:rotate-45 after:rounded-sm after:bg-white after:content-[''] md:gap-2.5 md:rounded-2xl md:px-4 md:py-[11px] ${CHIP_POS[k % CHIP_POS.length]}`}
                            >
                              <Icon
                                className="h-4 w-4 flex-none text-[#1f5cff] md:h-[22px] md:w-[22px]"
                                strokeWidth={1.8}
                              />
                              <div>
                                <b className="block text-[0.9rem] font-extrabold leading-[1.1] tabular-nums md:text-[1.15rem]">
                                  {s.value}
                                </b>
                                <span className="block text-[0.65rem] font-medium text-[#8e98b8] md:text-[0.78rem]">
                                  {s.label}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <p className="absolute bottom-6 left-16 z-[1] hidden text-xs font-bold tabular-nums text-[#8e98b8] md:block lg:left-24">
                  <span className="text-[#0f2557]">{pad(active + 1)}</span> /{" "}
                  {pad(N)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}