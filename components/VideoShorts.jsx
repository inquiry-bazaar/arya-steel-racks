"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

/* ------------------------------------------------------------------
   EDIT THIS: paste normal YouTube links (watch, youtu.be or /shorts/).
   type: "vlog" goes on the top shelf (landscape), "short" on the lower
   shelf (portrait). Titles show over the thumbnail.
------------------------------------------------------------------ */
const CHANNEL_URL = "https://www.youtube.com/@yourchannel";

const VIDEOS = [
  { type: "vlog", title: "Inside our rack factory", url: "https://www.youtube.com/watch?v=VIDEO_ID_1" },
  { type: "vlog", title: "From steel sheet to powder coated rack", url: "https://www.youtube.com/watch?v=VIDEO_ID_2" },
  { type: "short", title: "Punching in 30 seconds", url: "https://www.youtube.com/shorts/VIDEO_ID_3" },
  { type: "short", title: "Assembling a rack", url: "https://www.youtube.com/shorts/VIDEO_ID_4" },
  { type: "short", title: "Load test", url: "https://www.youtube.com/shorts/VIDEO_ID_5" },
  { type: "short", title: "Delivery day", url: "https://www.youtube.com/shorts/VIDEO_ID_6" },
];

const SHELVES = [
  { key: "vlog", label: "Factory vlogs" },
  { key: "short", label: "Quick shorts" },
];

function getId(input) {
  const m = input.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{6,})/);
  return m ? m[1] : input.trim();
}

/* ---------- One video sitting on a shelf ---------- */

function VideoCard({ video, index, activeId, setActiveId, reduce }) {
  const id = getId(video.url);
  const playing = activeId === id;
  const short = video.type === "short";
  const [broken, setBroken] = useState(false);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 110, damping: 15, delay: index * 0.12 }}
      className={`relative shrink-0 snap-center ${
        short ? "w-[170px] sm:w-[190px]" : "w-[290px] sm:w-[400px]"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-t-2xl bg-[#0f1f4b] shadow-xl ${
          short ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActiveId(id)}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 block h-full w-full text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand"
          >
            {broken ? (
              <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-brand/15 to-transparent" />
            ) : (
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                onError={() => setBroken(true)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-orange transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>

            <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold leading-snug text-white sm:text-base">
              {video.title}
            </span>
          </button>
        )}
      </div>
      {/* contact shadow where the video touches the shelf */}
      <span
        aria-hidden
        className="absolute -bottom-1 inset-x-4 h-2 rounded-full bg-black/30 blur-md"
      />
    </motion.div>
  );
}

/* ---------- Shelf beam with a label plate ---------- */

function Beam({ label, count, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ originX: 0 }}
      className="relative z-10 -mx-4 h-7 bg-gradient-to-b from-[#1d3070] to-[#0f1f4b] shadow-[0_14px_22px_-10px_rgba(15,31,75,0.55)] lg:-mx-8"
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
      <span className="absolute left-8 top-1/2 flex -translate-y-[40%] items-center gap-2 rounded bg-white px-3 py-0.5 text-xs font-bold text-[#0f1f4b] shadow lg:left-14">
        {label}
        <span className="rounded-sm bg-brand px-1.5 text-white">{count}</span>
      </span>
    </motion.div>
  );
}

/* ---------- Rack uprights with punched holes ---------- */

function Upright({ side }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 w-3 lg:w-5 ${side === "left" ? "left-0" : "right-0"}`}
      style={{
        backgroundColor: "#0f1f4b",
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.55) 2px, transparent 2.5px)",
        backgroundSize: "100% 26px",
        backgroundPosition: "center 8px",
        boxShadow: "inset -2px 0 0 rgba(255,255,255,0.08)",
      }}
    />
  );
}

/* ---------- Section ---------- */

export default function VideoShelf() {
  const [activeId, setActiveId] = useState(null);
  const reduce = useReducedMotion();

  let cardIndex = 0;

  return (
    <section id="videos" className="bg-soft relative overflow-x-clip py-20 lg:py-28">
      <div className="section-pad mx-auto w-full max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">
              <span className="h-[2px] w-5 bg-brand" /> Watch Us Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight lg:text-4xl">
              See how every rack is made, loaded and delivered
            </h2>
            <p className="mt-3 text-base leading-relaxed opacity-75">
              Factory walkthroughs and quick shorts from our own unit. Tap any video to play it right here.
            </p>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy !py-3 self-start lg:self-auto"
          >
            Visit our channel <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* the rack */}
        <div className="relative mx-auto max-w-[1240px] px-4 pb-6 lg:px-8">
          <Upright side="left" />
          <Upright side="right" />

          {SHELVES.map((shelf) => {
            const items = VIDEOS.filter((v) => v.type === shelf.key);
            if (!items.length) return null;
            return (
              <div key={shelf.key} className="relative">
                <div className="flex snap-x items-end gap-5 overflow-x-auto px-2 pb-0 pt-16 [scrollbar-width:none] [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto [&::-webkit-scrollbar]:hidden">
                  {items.map((v) => (
                    <VideoCard
                      key={v.url}
                      video={v}
                      index={cardIndex++}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      reduce={reduce}
                    />
                  ))}
                </div>
                <Beam label={shelf.label} count={String(items.length).padStart(2, "0")} reduce={reduce} />
              </div>
            );
          })}

          {/* feet */}
          <div aria-hidden className="absolute -bottom-0 left-0 h-3 w-6 rounded-b bg-[#0f1f4b] lg:w-9" />
          <div aria-hidden className="absolute -bottom-0 right-0 h-3 w-6 rounded-b bg-[#0f1f4b] lg:w-9" />
        </div>
      </div>
    </section>
  );
}