"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Box,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  FileText,
  Footprints,
  Gem,
  Gift,
  Headset,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Maximize,
  Megaphone,
  Minus,
  MoveHorizontal,
  MoveVertical,
  Package,
  Pill,
  Play,
  Plus,
  RefreshCw,
  RotateCw,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tv,
  Wrench,
} from "lucide-react";
import MediaSlot from "./MediaSlot";
import VideoModal from "./VideoModal";
import WhatsAppIcon from "./WhatsAppIcon";

const BLUE = "#1f5fd6";

const ICONS = {
  cart: ShoppingCart,
  basket: ShoppingBasket,
  bag: ShoppingBag,
  package: Package,
  store: Store,
  shirt: Shirt,
  shoe: Footprints,
  sparkles: Sparkles,
  pill: Pill,
  tv: Tv,
  book: BookOpen,
  gift: Gift,
  megaphone: Megaphone,
  gem: Gem,
  headset: Headset,
  phone: Smartphone,
  layers: Layers,
  shield: ShieldCheck,
  maximize: Maximize,
  wrench: Wrench,
};

// different crops of the same photo, used when a product has only one image
const CROPS = [
  { s: 1, o: "50% 50%" },
  { s: 1.9, o: "50% 12%" },
  { s: 1.9, o: "50% 88%" },
  { s: 1.7, o: "12% 50%" },
  { s: 1.7, o: "88% 50%" },
];

function Pic({ g, fit = "contain", pad = "p-2" }) {
  const c = CROPS[g.crop % CROPS.length];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `scale(${c.s})`, transformOrigin: c.o }}>
        <MediaSlot
          src={g.src}
          alt=""
          className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${pad}`}
        />
      </div>
    </div>
  );
}

const isLight = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
};

const TABS = [
  { id: "overview", label: "Overview", icon: Box },
  { id: "applications", label: "Applications", icon: LayoutGrid },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "specs", label: "Specifications", icon: Layers },
  { id: "related", label: "Related Products", icon: Boxes },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

function Heading({ lead, accent }) {
  return (
    <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[34px]">
      {lead} <span style={{ color: BLUE }}>{accent}</span>
    </h2>
  );
}

function Dot({ color = "orange", className = "" }) {
  return (
    <span
      aria-hidden
      className={`absolute hidden h-4 w-4 rounded-full lg:block ${
        color === "orange"
          ? "bg-gradient-to-br from-orange-400 to-brand shadow-[0_0_0_4px_rgba(255,122,0,0.15)]"
          : "bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] shadow-[0_0_0_4px_rgba(31,95,214,0.15)]"
      } ${className}`}
    />
  );
}

/* ---------------- dimension diagrams ---------------- */

function FrontView({ shelves, height, length }) {
  const n = Math.min(7, Math.max(2, parseInt(shelves) || 4));
  const top = 14, bottom = 126, left = 80, right = 288;
  const rows = [];
  for (let i = 0; i <= n; i++) rows.push(top + ((bottom - top) / n) * i);
  const mid = (left + right) / 2;
  return (
    <svg viewBox="0 0 300 180" className="h-auto w-full max-w-[300px]" aria-hidden>
      <defs>
        <marker id="arr" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill="#f97316" />
        </marker>
      </defs>
      <rect x={left} y={top} width={right - left} height={bottom - top} fill="none" stroke="#2d3a55" strokeWidth="2.2" />
      <line x1={mid} y1={top} x2={mid} y2={bottom} stroke="#2d3a55" strokeWidth="2.2" />
      {rows.slice(1, -1).map((y, i) => (
        <g key={i}>
          <line x1={left} y1={y} x2={right} y2={y} stroke="#2d3a55" strokeWidth="2.2" />
          <line x1={left} y1={y + 4} x2={right} y2={y + 4} stroke="#8a97b2" strokeWidth="1" />
        </g>
      ))}
      <line x1={left} y1={bottom + 5} x2={right} y2={bottom + 5} stroke="#2d3a55" strokeWidth="4" />
      {/* height arrow */}
      <line x1="66" y1={top} x2="66" y2={bottom} stroke="#f97316" strokeWidth="1.6" markerStart="url(#arr)" markerEnd="url(#arr)" />
      <text x="2" y={(top + bottom) / 2 + 4} fontSize="11" fontWeight="700" fill="#f97316">
        {height.length > 10 ? "Height" : height}
      </text>
      {/* length arrow */}
      <line x1={left} y1="150" x2={mid - 30} y2="150" stroke="#f97316" strokeWidth="1.6" markerStart="url(#arr)" />
      <line x1={mid + 30} y1="150" x2={right} y2="150" stroke="#f97316" strokeWidth="1.6" markerEnd="url(#arr)" />
      <text x={mid} y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f97316">
        {length.length > 14 ? "Length" : length}
      </text>
    </svg>
  );
}

function SideView({ shelves, depth }) {
  const n = Math.min(7, Math.max(2, parseInt(shelves) || 4));
  const top = 14, bottom = 126;
  const ys = [];
  for (let i = 0; i < n; i++) ys.push(top + 8 + ((bottom - top - 16) / (n - 1)) * i);
  return (
    <svg viewBox="0 0 150 180" className="h-auto w-full max-w-[150px]" aria-hidden>
      <line x1="62" y1={top} x2="62" y2={bottom + 5} stroke="#2d3a55" strokeWidth="3" />
      {ys.map((y, i) => (
        <g key={i}>
          <line x1="62" y1={y} x2="112" y2={y + 6} stroke="#2d3a55" strokeWidth="2" />
          <line x1="62" y1={y} x2="26" y2={y + 6} stroke="#2d3a55" strokeWidth="2" />
        </g>
      ))}
      <line x1="22" y1={bottom + 6} x2="116" y2={bottom + 6} stroke="#2d3a55" strokeWidth="4" />
      <line x1="22" y1="150" x2="44" y2="150" stroke="#f97316" strokeWidth="1.6" markerStart="url(#arr)" />
      <line x1="96" y1="150" x2="116" y2="150" stroke="#f97316" strokeWidth="1.6" markerEnd="url(#arr)" />
      <text x="69" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f97316">
        {depth.length > 12 ? "Depth" : depth}
      </text>
    </svg>
  );
}

/* ---------------- main view ---------------- */

export default function ProductView({ product, category, related, details, waNumber }) {
  const { sizes, colors, features, applications, specs, gallery, faqs } = details;

  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [gIdx, setGIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [tab, setTab] = useState("overview");
  const [video, setVideo] = useState(false);
  const [frame, setFrame] = useState(0);
  const relRef = useRef(null);
  const dragRef = useRef(null);

  const words = product.title.split(" ");
  const last = words.pop();

  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${product.title} (Size: ${sizes[size]}, Colour: ${colors[color].name}).`
  )}`;

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // highlight the tab of the section currently on screen
  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTab(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const visibleThumbs = gallery.slice(offset, offset + 4);
  const canUp = offset > 0;
  const canDown = offset + 4 < gallery.length;

  const gMain = gallery[gIdx % gallery.length];
  const gSide = [1, 2, 3].map((n) => gallery[(gIdx + n) % gallery.length]);
  const step = (d) => setGIdx((i) => (i + d + gallery.length) % gallery.length);

  const frames = details.view360;
  const onDrag = (e) => {
    if (!dragRef.current || frames.length < 2) return;
    const dx = e.clientX - dragRef.current.x;
    if (Math.abs(dx) > 14) {
      setFrame((f) => (f + (dx > 0 ? 1 : -1) + frames.length) % frames.length);
      dragRef.current.x = e.clientX;
    }
  };

  const specRows = [
    { icon: MoveVertical, label: "Height", value: specs.height },
    { icon: MoveHorizontal, label: "Length", value: specs.length },
    { icon: Box, label: "Depth", value: specs.depth },
    { icon: Layers, label: specs.shelfLabel, value: specs.shelves },
    ...(specs.load ? [{ icon: ShieldCheck, label: "Load Capacity", value: specs.load }] : []),
  ];

  return (
    <div className="bg-soft pb-20">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pb-6 pt-24">
        <div className="section-pad">
          <nav className="flex flex-wrap items-center gap-2 text-[12px] text-navy/60">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-brand">Display Racks</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${category.slug}`} className="hover:text-brand">{category.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-bold text-navy">{product.title}</span>
          </nav>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.12fr_1fr]">
            {/* ---- gallery ---- */}
            <div className="flex gap-4">
              <div className="hidden w-[78px] shrink-0 flex-col items-center gap-3 sm:flex">
                <button
                  type="button"
                  aria-label="Previous images"
                  disabled={!canUp}
                  onClick={() => setOffset((o) => Math.max(0, o - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass disabled:opacity-40"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                {visibleThumbs.map((g, i) => (
                  <button
                    key={g.key}
                    type="button"
                    aria-label={`Show image ${offset + i + 1}`}
                    onClick={() => setActive(offset + i)}
                    className={`relative h-[78px] w-[78px] overflow-hidden rounded-2xl border-2 bg-white transition ${
                      active === offset + i ? "border-[#1f5fd6] shadow-[0_0_0_3px_rgba(31,95,214,0.15)]" : "border-[#e6ecf7]"
                    }`}
                  >
                    <Pic g={g} pad="p-1" />
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next images"
                  disabled={!canDown}
                  onClick={() => setOffset((o) => o + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass disabled:opacity-40"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-[1/0.93] min-w-0 flex-1">
                {/* orange arc */}
                <svg className="pointer-events-none absolute right-[14%] top-[2%] w-[34%]" viewBox="0 0 200 110" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="arcg" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#f97316" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#f97316" />
                      <stop offset="1" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path d="M8 104 C 50 6, 150 0, 194 62" stroke="url(#arcg)" strokeWidth="13" strokeLinecap="round" />
                </svg>

                {/* glowing podium */}
                <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-[20%] w-[88%] -translate-x-1/2" aria-hidden>
                  <div className="absolute inset-x-0 bottom-0 h-[78%] rounded-[50%] bg-gradient-to-b from-white to-[#dfe7f5] shadow-[0_14px_30px_rgba(30,50,100,0.12)]" />
                  <div className="absolute -inset-x-1 bottom-[-4%] h-[84%] rounded-[50%] border-[4px] border-orange-400/80 shadow-[0_0_24px_6px_rgba(255,122,0,0.4),inset_0_0_18px_rgba(255,122,0,0.3)]" />
                </div>

                {/* main image */}
                <div className="absolute inset-x-[6%] bottom-[12%] top-[3%] z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Pic g={gallery[active]} pad="p-1" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* floating buttons */}
                <div className="absolute right-0 top-[2%] z-20 flex flex-col gap-3">
                  <button
                    type="button"
                    aria-label="360 degree view"
                    onClick={() => go("gallery")}
                    className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-white text-navy shadow-glass transition hover:scale-105"
                  >
                    <span className="text-[10px] font-extrabold leading-none">360°</span>
                    <RotateCw className="mt-0.5 h-3 w-3 text-[#1f5fd6]" />
                  </button>
                  <button
                    type="button"
                    aria-label={details.video ? "Play video" : "See gallery"}
                    onClick={() => (details.video ? setVideo(true) : go("gallery"))}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-glass transition hover:scale-105"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-navy">
                      <Play className="ml-0.5 h-3 w-3 fill-navy" />
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActive((a) => (a + 1) % gallery.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-glass transition hover:scale-105"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ---- info ---- */}
            <div>
              <span className="inline-block rounded-full bg-[#fde3d1] px-5 py-2 text-[12.5px] font-semibold text-navy shadow-[0_6px_16px_rgba(249,115,22,0.18)]">
                {category.name}
              </span>
              <h1 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-tight text-navy sm:text-[50px]">
                {words.join(" ")} <span style={{ color: BLUE }}>{last}</span>
              </h1>
              <p className="mt-5 max-w-[440px] text-[14.5px] leading-relaxed text-navy/80">{product.desc}</p>

              <p className="mt-6 text-[14px] font-extrabold text-navy">Available Sizes</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(i)}
                    className={`relative rounded-full border px-6 py-2 text-[13px] font-semibold transition ${
                      size === i
                        ? "border-orange-400 bg-[#fff1e6] text-navy shadow-[0_6px_14px_rgba(249,115,22,0.2)]"
                        : "border-[#e6ecf7] bg-white text-navy hover:border-orange-300"
                    }`}
                  >
                    {s}
                    {size === i && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-[14px] font-extrabold text-navy">Color Options</p>
              <div className="mt-3 flex flex-wrap gap-4">
                {colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    title={c.name}
                    onClick={() => setColor(i)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-[0_4px_10px_rgba(20,40,90,0.2)] transition ${
                      color === i ? "ring-2 ring-[#1f5fd6] ring-offset-2" : "ring-1 ring-black/5"
                    }`}
                    style={{ background: c.hex }}
                  >
                    {color === i && <Check className={`h-4 w-4 ${isLight(c.hex) ? "text-navy" : "text-white"}`} strokeWidth={3} />}
                  </button>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-3.5 text-[14px] font-bold text-white shadow-orange transition hover:brightness-105"
                >
                  <FileText className="h-4 w-4" /> Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={details.brochure}
                  download
                  className="inline-flex items-center gap-3 rounded-full border-2 border-[#1f5fd6] bg-white px-6 py-3 text-[14px] font-bold text-[#1f5fd6] transition hover:bg-[#1f5fd6] hover:text-white"
                >
                  <Download className="h-4 w-4" /> Download Brochure
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp us about ${product.title}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_18px_rgba(37,211,102,0.35)] transition hover:brightness-95"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* mobile thumbs */}
          <div className="mt-4 flex gap-3 overflow-x-auto sm:hidden">
            {gallery.map((g, i) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                  active === i ? "border-[#1f5fd6]" : "border-[#e6ecf7]"
                }`}
              >
                <Pic g={g} pad="p-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TAB BAR ================= */}
      <div className="sticky top-20 z-30 py-3">
        <div className="section-pad">
          <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-white/70 bg-white/90 p-2 shadow-[0_10px_30px_rgba(30,55,110,0.12)] backdrop-blur">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const on = tab === t.id;
              return (
                <div key={t.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => go(t.id)}
                    className={`flex w-full min-w-max items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-bold transition ${
                      on
                        ? "bg-gradient-to-r from-[#0f3f9e] to-[#1d56c8] text-white shadow-[0_8px_18px_rgba(15,63,158,0.35)]"
                        : "text-navy hover:text-[#1f5fd6]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} /> {t.label}
                  </button>
                  {i < TABS.length - 1 && <span className="mx-1 h-5 w-px shrink-0 bg-navy/20" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      <section id="overview" className="section-pad relative scroll-mt-40 pt-10">
        <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_330px] lg:gap-10">
          {/* organic image */}
          <div className="relative mx-auto h-[230px] w-[290px] lg:-ml-6">
            <div
              className="absolute -left-2 -top-2 h-full w-full bg-gradient-to-br from-orange-400 to-brand"
              style={{ borderRadius: "58% 42% 60% 40% / 46% 56% 44% 54%" }}
            />
            <div
              className="absolute inset-[5px] overflow-hidden bg-white ring-[5px] ring-white shadow-glass"
              style={{ borderRadius: "58% 42% 60% 40% / 46% 56% 44% 54%" }}
            >
              <MediaSlot
                src={details.scene || product.image}
                alt={`${product.title} in store`}
                className={`absolute inset-0 h-full w-full ${details.scene ? "object-cover" : "object-contain p-4"}`}
              />
            </div>
          </div>

          <div className="relative">
            <Dot className="-left-7 top-[14px]" />
            <Heading lead="Product" accent="Overview" />
            <p className="mt-4 max-w-[480px] text-[14px] leading-relaxed text-navy/80">{details.overview}</p>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {features.map((f) => {
              const Icon = ICONS[f.icon] || Box;
              return (
                <li
                  key={f.label}
                  className="flex min-h-[92px] flex-col items-center justify-center rounded-2xl border border-white bg-white/90 px-3 py-3 text-center shadow-[0_10px_24px_rgba(30,55,110,0.08)]"
                >
                  <Icon className="h-7 w-7 text-orange-500" strokeWidth={1.6} />
                  <span className="mt-1.5 text-[12.5px] font-bold leading-tight text-navy">{f.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= RAIL + SECTIONS ================= */}
      <div className="section-pad relative">
        {/* wavy timeline rail */}
        <svg
          aria-hidden
          className="pointer-events-none absolute bottom-[160px] left-[18px] top-[10px] hidden w-10 lg:block"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="rail" width="40" height="170" patternUnits="userSpaceOnUse">
              <path d="M20 0 C 4 45, 36 125, 20 170" fill="none" stroke="#0f2557" strokeOpacity="0.4" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="40" height="100%" fill="url(#rail)" />
        </svg>

        {/* ---- applications ---- */}
        <section id="applications" className="relative scroll-mt-40 py-10 lg:pl-[92px]">
          <Dot color="blue" className="left-[10px] top-[52px]" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_480px]">
            <div>
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[34px]">Applications</h2>
              <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-navy/75">
                Perfect for a wide range of retail and commercial spaces.
              </p>
            </div>

            {/* fan of tiles */}
            <div className="relative mx-auto h-[215px] w-full max-w-[480px]">
              {applications.slice(0, 4).map((a, i) => {
                const Icon = ICONS[a.icon] || Store;
                const pos = [
                  "left-[24%] top-0 rounded-tl-[56px] rounded-tr-[22px] rounded-bl-[14px] rounded-br-[22px]",
                  "right-[17%] top-0 rounded-tr-[56px] rounded-tl-[22px] rounded-br-[14px] rounded-bl-[22px]",
                  "left-0 top-[72px] rounded-l-[56px] rounded-tr-[22px] rounded-br-[14px]",
                  "right-0 top-[72px] rounded-r-[56px] rounded-tl-[22px] rounded-bl-[14px]",
                ][i];
                return (
                  <div
                    key={a.label}
                    className={`absolute flex h-[112px] w-[132px] flex-col items-center justify-center bg-gradient-to-b from-white to-[#f1f5fc] px-2 text-center shadow-[0_10px_26px_rgba(30,55,110,0.10)] ${pos}`}
                  >
                    <Icon className="h-7 w-7 text-orange-500" strokeWidth={1.6} />
                    <span className="mt-1 text-[12px] font-bold leading-tight text-navy">{a.label}</span>
                  </div>
                );
              })}
              {/* centre badge */}
              <div className="absolute bottom-0 left-1/2 z-10 flex h-[100px] w-[190px] -translate-x-1/2 items-end justify-center rounded-t-full bg-gradient-to-b from-orange-300 to-brand shadow-[0_0_28px_rgba(255,122,0,0.35)]">
                <div className="flex h-[78px] w-[132px] items-center justify-center rounded-t-full bg-gradient-to-b from-[#2f74e0] to-[#0f3f9e]">
                  <Store className="h-9 w-9 text-white" strokeWidth={1.6} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent lg:ml-[92px]" />

        {/* ---- gallery & 360 ---- */}
        <section id="gallery" className="relative scroll-mt-40 py-10 lg:pl-[92px]">
          <Dot className="left-[10px] top-[52px]" />
          <div className="grid items-center gap-8 lg:grid-cols-[230px_1fr]">
            <div>
              <Heading lead="Gallery &" accent="360° View" />
              <p className="mt-3 max-w-[210px] text-[14px] leading-relaxed text-navy/75">
                Explore the product from multiple angles and get a closer look at the build quality and finish.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-[56px] border border-white bg-white/80 p-4 shadow-[0_18px_44px_rgba(30,55,110,0.12)] sm:gap-5 sm:p-5">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass transition hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                className="relative h-[230px] min-w-0 flex-1 cursor-grab select-none touch-pan-y active:cursor-grabbing"
                onPointerDown={(e) => (dragRef.current = { x: e.clientX })}
                onPointerMove={onDrag}
                onPointerUp={() => (dragRef.current = null)}
                onPointerLeave={() => (dragRef.current = null)}
              >
                {/* orbit arrows */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 230" fill="none" aria-hidden>
                  <ellipse cx="200" cy="140" rx="165" ry="52" stroke={BLUE} strokeWidth="2" strokeDasharray="2 0" strokeOpacity="0.55" />
                  <path d="M60 112 l-10 -14 l17 3 z" fill={BLUE} fillOpacity="0.7" />
                  <path d="M340 168 l10 14 l-17 -3 z" fill={BLUE} fillOpacity="0.7" />
                </svg>

                <div className="absolute inset-x-[12%] inset-y-[4%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={frames.length > 1 ? "f" : gIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Pic g={frames.length > 1 ? { src: frames[frame], crop: 0 } : gMain} pad="p-1" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="pointer-events-none absolute left-1/2 top-[44%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full bg-white/95 px-4 py-2 shadow-glass">
                  <span className="text-[22px] font-extrabold leading-none text-navy">360°</span>
                  <RotateCw className="mt-0.5 h-3.5 w-3.5 text-[#1f5fd6]" />
                </div>
              </div>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass transition hover:scale-105"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="hidden w-[150px] shrink-0 flex-col gap-2 md:flex">
                {gSide.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label="Show this view"
                    onClick={() => setGIdx((gIdx + i + 1) % gallery.length)}
                    className="relative h-[72px] w-full overflow-hidden rounded-xl border-2 border-[#8fb2f0] bg-white shadow-[0_6px_14px_rgba(31,95,214,0.15)] transition hover:border-[#1f5fd6]"
                  >
                    <Pic g={g} fit="cover" pad="" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent lg:ml-[92px]" />

        {/* ---- specifications ---- */}
        <section id="specs" className="relative scroll-mt-40 py-10 lg:pl-[92px]">
          <Dot color="blue" className="left-[10px] top-[52px]" />
          <div className="grid items-center gap-8 lg:grid-cols-[260px_1fr_300px]">
            <div>
              <Heading lead="Technical" accent="Specifications" />
              <p className="mt-3 max-w-[250px] text-[14px] leading-relaxed text-navy/75">
                Detailed dimensions and configuration for your store requirements.
              </p>
            </div>

            <div className="flex items-end justify-center gap-6">
              <FrontView shelves={specs.shelves} height={specs.height} length={specs.length} />
              <SideView shelves={specs.shelves} depth={specs.depth} />
            </div>

            <div className="rounded-2xl border border-white bg-white/95 p-3 shadow-[0_14px_34px_rgba(30,55,110,0.12)]">
              {specRows.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${i % 2 ? "bg-[#f3f6fc]" : ""}`}
                >
                  <span className="flex items-center gap-2.5 text-[13px] font-bold text-navy">
                    <Icon className="h-4 w-4 text-[#1f5fd6]" /> {label}
                  </span>
                  <span className="text-right text-[13px] font-semibold text-navy/80">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent lg:ml-[92px]" />

        {/* ---- related products ---- */}
        <section id="related" className="relative scroll-mt-40 py-10 lg:pl-[92px]">
          <Dot className="left-[10px] top-[52px]" />
          <div className="grid items-center gap-8 lg:grid-cols-[230px_1fr]">
            <div>
              <Heading lead="Related" accent="Products" />
              <p className="mt-3 max-w-[210px] text-[14px] leading-relaxed text-navy/75">
                Explore more display rack solutions for your retail space.
              </p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => relRef.current?.scrollBy({ left: -260, behavior: "smooth" })}
                className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass transition hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div ref={relRef} className="flex snap-x gap-4 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group relative w-[170px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white bg-white shadow-[0_10px_26px_rgba(30,55,110,0.10)] transition hover:-translate-y-1"
                  >
                    <div className="relative h-[120px] bg-white">
                      <MediaSlot src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-contain p-3" />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-3 pb-3">
                      <h3 className="line-clamp-2 text-[12px] font-extrabold leading-tight text-navy">{p.title}</h3>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand text-white shadow-orange">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => relRef.current?.scrollBy({ left: 260, behavior: "smooth" })}
                className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-glass transition hover:scale-105"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section id="faq" className="relative scroll-mt-40 py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
            <div
              className="relative flex h-[190px] w-full max-w-[310px] items-center justify-center gap-3 bg-gradient-to-br from-[#2f74e0] via-[#1b4fb8] to-[#0b2a6f] p-6 text-white shadow-[0_18px_40px_rgba(15,63,158,0.35)]"
              style={{ borderRadius: "58% 42% 56% 44% / 52% 50% 50% 48%" }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/80">
                <HelpCircle className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <div className="leading-tight">
                <p className="text-[17px] font-bold">Frequently Asked</p>
                <p className="text-[30px] font-extrabold">Questions</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="overflow-hidden rounded-xl border border-white bg-white/95 shadow-[0_8px_20px_rgba(30,55,110,0.08)]"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-[13.5px] font-bold text-navy transition ${
                        open ? "bg-[#e8f0ff]" : ""
                      }`}
                    >
                      {f.q}
                      {open ? (
                        <Minus className="h-4 w-4 shrink-0 text-[#1f5fd6]" />
                      ) : (
                        <Plus className="h-4 w-4 shrink-0 text-navy" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden bg-[#f4f8ff]"
                        >
                          <p className="px-4 pb-4 pt-2 text-[13px] leading-relaxed text-navy/75">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {details.video && <VideoModal open={video} onClose={() => setVideo(false)} src={details.video} />}
    </div>
  );
}