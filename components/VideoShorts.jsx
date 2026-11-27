"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Maximize,
  MoreVertical,
  Play,
  PlayCircle,
  Settings,
  Store,
} from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@aryaindustry1074";

const RAW_VIDEOS = [
  { title: "Heavy Duty Display Rack Installation", duration: "5:42", type: "vlog", url: "https://youtu.be/gRpPgrPLnWI?si=aQ60yjJVfryiMtSO" },
  { title: "Gondola rack setup in 45 seconds", duration: "1:00", type: "short", url: "https://youtube.com/shorts/DTc5RKwwxOI?si=-FMKqDTLG--Dt-99" },
  { title: "Supermarket aisle layout walkthrough", duration: "2:36", type: "vlog", url: "https://youtube.com/shorts/JBAWity6n5k?si=lE2Lmjk1550EKJTU" },
  { title: "Pharmacy rack client setup", duration: "3:18", type: "vlog", url: "https://youtube.com/shorts/JU9kHiZmmz4?si=i0rJdfQcFY5CXg7e" },
  { title: "Quick load test on a shelf", duration: "0:59", type: "short", url: "https://youtube.com/shorts/arBo9VtUVQg?si=OetCP_XbZzkapI7m" },
  { title: "Inside our powder coating plant", duration: "4:12", type: "vlog", url: "https://youtube.com/shorts/tVao0XMXaXk?si=qr9uRvvPX6kCF5o8" },
  { title: "Wall rack assembly tips", duration: "1:05", type: "short", url: "https://youtube.com/shorts/HCP2mN-X844?si=pYqW90-bB8pL77Jh" },
  { title: "Cash counter and billing rack ideas", duration: "3:50", type: "vlog", url: "https://youtube.com/shorts/2Mk3HhrILf8?si=Qf00ZqH8Z1O4zPnt" },
  { title: "Cash counter and billing rack ideas", duration: "3:50", type: "vlog", url: "https://youtube.com/shorts/2Mk3HhrILf8?si=Qf00ZqH8Z1O4zPnt" },
];

const FEATURES = [
  { icon: PlayCircle, label: "Product Demonstrations" },
  { icon: Settings, label: "Installation & Setup" },
  { icon: Store, label: "Real Store Setups" },
  { icon: Lightbulb, label: "Expert Tips & Guides" },
];

const PER_PAGE = 4;
const AUTO_SLIDE_MS = 4000; // change the slider speed here
const THUMB_TILT = [-3, -1.2, 0.8, 2.5];
const BLUE = "#1f4fd8";
const NAVY = "#14214f";

function getId(input) {
  const m = input.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{6,})/);
  return m ? m[1] : input.trim();
}

const VIDEOS = RAW_VIDEOS.map((v) => {
  const id = getId(v.url);
  return { ...v, id, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
});

/* ---------- Small pieces ---------- */

function YtMark({ className = "" }) {
  return (
    <svg viewBox="0 0 46 32" className={className} aria-hidden>
      <rect width="46" height="32" rx="9" fill="#ff0000" />
      <path d="M19 9.5 31 16 19 22.5z" fill="#fff" />
    </svg>
  );
}

function YtMarkWhite({ className = "" }) {
  return (
    <svg viewBox="0 0 46 32" className={className} aria-hidden>
      <rect width="46" height="32" rx="9" fill="#fff" />
      <path d="M19 9.5 31 16 19 22.5z" fill="#e11d1d" />
    </svg>
  );
}

function RackArt() {
  const levels = [112, 192, 272];
  const xs = [72, 110, 148, 190, 228, 270, 312, 350, 392, 430, 472, 510, 548, 586];
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="rk-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4eaf6" />
          <stop offset="1" stopColor="#aab5ca" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#rk-bg)" />
      <rect y="300" width="640" height="60" fill="#8f99ad" />
      {[60, 200, 340, 480, 620].map((x) => (
        <rect key={x} x={x - 6} y="30" width="12" height="300" fill="#1d4ed8" />
      ))}
      {levels.map((y) => (
        <g key={y}>
          {xs.map((x, i) => (
            <rect
              key={x}
              x={x}
              y={y - 36 + (i % 3) * 3}
              width={30 + (i % 2) * 8}
              height={36 - (i % 3) * 3}
              fill="#cfa877"
              stroke="#a67f4e"
              strokeWidth="1.5"
            />
          ))}
          <rect x="54" y={y} width="572" height="9" fill="#f97316" />
        </g>
      ))}
    </svg>
  );
}

function Media({ video }) {
  const [broken, setBroken] = useState(false);
  return (
    <>
      <RackArt />
      {!broken && (
        <img
          src={video.thumb}
          alt=""
          loading="lazy"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}

function MainCard({ video, playing, onPlay }) {
  return (
    <div className="relative aspect-video h-full w-full overflow-hidden rounded-[1.6rem] border-[5px] border-white bg-[#0f1f4b] shadow-[0_34px_60px_-18px_rgba(15,40,120,0.6)] lg:aspect-auto lg:rounded-[3cqw] lg:border-[length:0.5cqw]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Media video={video} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/35" />

          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
          />

          <div className="pointer-events-none absolute inset-0 z-[5]">
            {/* YouTube logo */}
            <div className="absolute left-[5%] top-[8%] flex items-center gap-1.5 lg:gap-[0.5cqw]">
              <YtMark className="w-8 lg:w-[2.8cqw]" />
              <span className="text-lg font-extrabold tracking-tighter text-white lg:text-[length:2cqw]">
                YouTube
              </span>
            </div>

            <MoreVertical className="absolute right-[3.5%] top-[7%] h-5 w-5 text-white lg:h-[1.8cqw] lg:w-[1.8cqw]" />

            {/* centre play */}
            <span className="absolute left-1/2 top-[46%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-black/15 lg:h-[6.3cqw] lg:w-[6.3cqw] lg:border-[length:0.5cqw]">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white lg:h-[2.8cqw] lg:w-[2.8cqw]" />
            </span>

            {/* title */}
            <h3 className="absolute bottom-[16%] left-[4.5%] max-w-[70%] text-lg font-extrabold leading-[1.12] text-white drop-shadow lg:max-w-[42%] lg:text-[length:2cqw]">
              {video.title}
            </h3>

            {/* progress row */}
            <div className="absolute bottom-[4.5%] left-[4.5%] right-[3.5%] flex items-center gap-3 lg:gap-[1cqw]">
              <div className="relative h-1 flex-1 rounded-full bg-white/35 lg:h-[0.4cqw]">
                <span className="absolute inset-y-0 left-0 w-[35%] rounded-full bg-[#ff1a1a]" />
                <span className="absolute left-[35%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow lg:h-[1.2cqw] lg:w-[1.2cqw]" />
              </div>
              <span className="rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold text-white lg:px-[0.7cqw] lg:py-[0.1cqw] lg:text-[length:1.3cqw]">
                {video.duration}
              </span>
              <Maximize className="h-4 w-4 text-white lg:h-[1.5cqw] lg:w-[1.5cqw]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}


function Thumb({ video, index, onSelect }) {
  const short = video.type === "short";
  return (
    <button
      type="button"
      onClick={onSelect}
      title={video.title}
      aria-label={`Play ${video.title}`}
      style={{ "--r": `${THUMB_TILT[index % THUMB_TILT.length]}deg` }}
      className="group relative aspect-[4/3] w-[44%] shrink-0 snap-start overflow-hidden rounded-[1.1rem] border-[4px] border-white bg-[#0f1f4b] shadow-[0_16px_28px_-10px_rgba(10,30,100,0.6)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-400 lg:w-auto lg:rotate-[var(--r)] lg:rounded-[1.4cqw] lg:border-[length:0.32cqw]"
    >
      <Media video={video} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {short && (
        <span className="absolute left-[6%] top-[6%] flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white lg:gap-[0.3cqw] lg:px-[0.7cqw] lg:text-[length:1.05cqw]">
          <span className="flex h-3 w-3 items-center justify-center rounded-[3px] bg-[#ff0000] lg:h-[1.1cqw] lg:w-[1.1cqw]">
            <Play className="h-2 w-2 fill-white text-white lg:h-[0.6cqw] lg:w-[0.6cqw]" />
          </span>
          Shorts
        </span>
      )}

      <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/20 transition-transform duration-300 group-hover:scale-110 lg:h-[3.2cqw] lg:w-[3.2cqw] lg:border-[length:0.22cqw]">
        <Play className="ml-0.5 h-4 w-4 fill-white text-white lg:h-[1.4cqw] lg:w-[1.4cqw]" />
      </span>

      <span className="absolute bottom-[6%] right-[6%] rounded-md bg-black/70 px-1.5 text-[10px] font-semibold text-white lg:px-[0.6cqw] lg:text-[length:1cqw]">
        {video.duration}
      </span>
    </button>
  );
}

/* ---------- Section ---------- */

export default function VideoVlogs() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || touching || focused;

  const others = VIDEOS.map((v, i) => ({ v, i })).filter((o) => o.i !== active);
  const pages = Math.max(1, Math.ceil(others.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const visible = others.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);
  const go = (d) => setPage((safePage + d + pages) % pages);

  /* ---------- Auto slider ---------- */
  useEffect(() => {
    if (reduce || playing || paused || pages <= 1) return;

    // restarts whenever the page changes, so a manual click gets a full delay
    const timer = setTimeout(() => {
      setPage((p) => (p + 1) % pages);
    }, AUTO_SLIDE_MS);

    return () => clearTimeout(timer);
  }, [page, pages, playing, paused, reduce]);

  const pauseHandlers = {
    onPointerEnter: (e) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e) => e.pointerType === "mouse" && setHovered(false),
    onTouchStart: () => setTouching(true),
    onTouchEnd: () => setTouching(false),
    onTouchCancel: () => setTouching(false),
    // pause for keyboard focus only, not focus left behind by a mouse click
    onFocus: (e) => e.target.matches(":focus-visible") && setFocused(true),
    onBlur: (e) =>
      !e.currentTarget.contains(e.relatedTarget) && setFocused(false),
  };

  const select = (i) => {
    setActive(i);
    setPlaying(true);
  };

  const circleBtn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1f4fd8] shadow-[0_10px_22px_-6px_rgba(20,50,140,0.45)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1f4fd8] lg:h-[3cqw] lg:w-[3cqw]";

  return (
    <section id="videos" className="relative w-full overflow-hidden bg-[#f5f8ff] py-10">
      <div
        className="relative mx-auto w-full max-w-[1920px] pb-10 lg:aspect-[1672/790] lg:pb-0"
        style={{ containerType: "inline-size" }}
      >
        <div className="relative z-10 space-y-5 px-6 pt-10 lg:contents lg:space-y-0">
          {/* badge */}
          <div className="flex items-center gap-3 lg:absolute lg:left-[6.4%] lg:top-[12.2%] lg:z-10 lg:gap-[0.7cqw]">
            <YtMark className="w-11 drop-shadow lg:w-[2.75cqw]" />
            <span className="text-lg font-semibold lg:text-[length:1.5cqw]" style={{ color: NAVY }}>
              Our YouTube Vlogs
            </span>
          </div>

          <h2
            className="text-[30px] font-extrabold leading-[1.2] tracking-tight sm:text-4xl lg:absolute lg:left-[6.2%] lg:top-[19.2%] lg:z-10 lg:text-[length:3.3cqw] lg:leading-[1.18]"
            style={{ color: NAVY }}
          >
            <span className="lg:whitespace-nowrap pb-3 lg:pb-[0.55cqw] block">
              Watch, Learn &amp; Explore
            </span>
            <span className="lg:whitespace-nowrap">
              with Our{" "}
              <span className="relative inline-block" style={{ color: BLUE }}>
                Video Vlogs
              </span>
            </span>
          </h2>

          {/* sub copy */}
          <p className="max-w-md text-base leading-relaxed text-[#6b7290] lg:absolute lg:left-[6.2%] lg:top-[37.2%] lg:z-10 lg:w-[36%] lg:max-w-none lg:text-[length:1.43cqw] lg:leading-[1.38]">
            Product demos, installations, client setups and expert tips — all in one place.
          </p>

          <ul className="space-y-4 pt-2 lg:absolute lg:left-[6.3%] lg:top-[50.6%] lg:z-10 lg:space-y-[1.1cqw] lg:pt-0">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 lg:gap-[1.2cqw]">
                <span className="flex h-12 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_22px_-10px_rgba(31,79,216,0.5)] lg:h-[3.75cqw] lg:w-[4.4cqw]">
                  <Icon className="h-6 w-6 text-[#1f4fd8] lg:h-[1.9cqw] lg:w-[1.9cqw]" strokeWidth={2} />
                </span>
                <span
                  className="text-base font-bold lg:text-[length:1.27cqw]"
                  style={{ color: NAVY }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* subscribe */}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#f02a1d] to-[#d4130c] px-7 py-4 text-base font-bold text-white shadow-[0_16px_28px_-10px_rgba(225,20,10,0.65)] transition-transform hover:-translate-y-0.5 lg:absolute lg:left-[6.3%] lg:top-[88.3%] lg:z-10 lg:h-[3.8cqw] lg:w-[21.8%] lg:gap-[0.9cqw] lg:px-0 lg:py-0 lg:text-[length:1.27cqw]"
            style={{ marginTop: "22px" }}
          >
            <YtMarkWhite className="w-9 lg:w-[2.7cqw]" />
            Subscribe on YouTube
            <ArrowRight className="h-5 w-5 lg:h-[1.4cqw] lg:w-[1.4cqw]" />
          </a>
        </div>

        {/* ---------------- RIGHT ---------------- */}
        <div
          {...pauseHandlers}
          className="relative z-10 mx-4 mt-8 rounded-[2rem] bg-gradient-to-br from-[#1e4fc5] to-[#2d66e0] p-4 lg:contents"
        >
          {/* player */}
          <div className="lg:absolute lg:left-[43.8%] lg:top-[7.1%] lg:z-10 lg:h-[26cqw] lg:w-[46%] lg:[transform:perspective(1700px)_rotateZ(-3deg)_rotateY(-7deg)]">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full"
            >
              <MainCard
                key={VIDEOS[active].id}
                video={VIDEOS[active]}
                playing={playing}
                onPlay={() => setPlaying(true)}
              />
            </motion.div>
          </div>

          {/* thumbnail strip */}
          <motion.div
            key={safePage + "-" + active}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-4 flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] lg:absolute lg:left-[38.2%] lg:top-[65.8%] lg:z-10 lg:mt-0 lg:grid lg:w-[52.2%] lg:grid-cols-4 lg:gap-[0.84cqw] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {visible.map(({ v, i }, k) => (
              <Thumb key={v.id + i} video={v} index={k} onSelect={() => select(i)} />
            ))}
          </motion.div>

          {/* arrows + dots */}
          {pages > 1 && (
            <div className="mt-2 flex items-center justify-center gap-5 lg:contents">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous videos"
                className={`${circleBtn} lg:absolute lg:left-[34.5%] lg:top-[72.5%] lg:z-20`}
              >
                <ChevronLeft className="h-5 w-5 lg:h-[1.6cqw] lg:w-[1.6cqw]" />
              </button>

              <div className="flex items-center gap-2 lg:absolute lg:left-[63.1%] lg:top-[90.5%] lg:z-20 lg:-translate-x-1/2 lg:gap-[0.8cqw]">
                {Array.from({ length: pages }).map((_, p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p + 1}`}
                    aria-current={p === safePage}
                    className={`rounded-full transition-all ${
                      p === safePage
                        ? "h-3 w-3 bg-[#ff8a0c] lg:h-[1.15cqw] lg:w-[1.15cqw]"
                        : "h-2.5 w-2.5 bg-[#a9c4f5] hover:bg-white lg:h-[0.85cqw] lg:w-[0.85cqw]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next videos"
                className={`${circleBtn} lg:absolute lg:left-[91.1%] lg:top-[75.1%] lg:z-20`}
              >
                <ChevronRight className="h-5 w-5 lg:h-[1.6cqw] lg:w-[1.6cqw]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}