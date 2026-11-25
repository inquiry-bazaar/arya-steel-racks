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
  HeadsetIcon,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Layers2,
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
  ShieldCheck,
  ShieldCheckIcon,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  StoreIcon,
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
  store: StoreIcon,
  shirt: Shirt,
  shoe: Footprints,
  sparkles: Sparkles,
  pill: Pill,
  tv: Tv,
  book: BookOpen,
  gift: Gift,
  megaphone: Megaphone,
  gem: Gem,
  headset: HeadsetIcon,
  phone: Smartphone,
  layers: Layers2,
  shield: ShieldCheckIcon,
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
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${c.s})`, transformOrigin: c.o }}
      >
        <MediaSlot
          src={g.src}
          alt=""
          className={`absolute inset-0 h-full w-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          } ${pad}`}
        />
      </div>
    </div>
  );
}

const isLight = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((x) => x + x).join("") : h,
    16
  );
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
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
    <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
      {lead} <span style={{ color: BLUE }}>{accent}</span>
    </h2>
  );
}

/* ---------------- dimension diagrams ---------------- */

function FrontView({ shelves, height, length }) {
  const n = Math.min(7, Math.max(2, parseInt(shelves) || 4));
  const top = 14,
    bottom = 126,
    left = 80,
    right = 288;
  const rows = [];
  for (let i = 0; i <= n; i++) rows.push(top + ((bottom - top) / n) * i);
  const mid = (left + right) / 2;
  return (
    <svg
      viewBox="0 0 300 180"
      className="h-auto w-full max-w-[280px]"
      aria-hidden
    >
      <defs>
        <marker
          id="arr"
          viewBox="0 0 8 8"
          refX="4"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="#f97316" />
        </marker>
      </defs>
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="none"
        stroke="#2d3a55"
        strokeWidth="2"
      />
      <line
        x1={mid}
        y1={top}
        x2={mid}
        y2={bottom}
        stroke="#2d3a55"
        strokeWidth="2"
      />
      {rows.slice(1, -1).map((y, i) => (
        <g key={i}>
          <line
            x1={left}
            y1={y}
            x2={right}
            y2={y}
            stroke="#2d3a55"
            strokeWidth="2"
          />
          <line
            x1={left}
            y1={y + 4}
            x2={right}
            y2={y + 4}
            stroke="#8a97b2"
            strokeWidth="1"
          />
        </g>
      ))}
      <line
        x1={left}
        y1={bottom + 5}
        x2={right}
        y2={bottom + 5}
        stroke="#2d3a55"
        strokeWidth="3.5"
      />
      {/* height arrow */}
      <line
        x1="66"
        y1={top}
        x2="66"
        y2={bottom}
        stroke="#f97316"
        strokeWidth="1.5"
        markerStart="url(#arr)"
        markerEnd="url(#arr)"
      />
      <text
        x="2"
        y={(top + bottom) / 2 + 4}
        fontSize="11"
        fontWeight="700"
        fill="#f97316"
      >
        {height.length > 10 ? "Height" : height}
      </text>
      {/* length arrow */}
      <line
        x1={left}
        y1="150"
        x2={mid - 30}
        y2="150"
        stroke="#f97316"
        strokeWidth="1.5"
        markerStart="url(#arr)"
      />
      <line
        x1={mid + 30}
        y1="150"
        x2={right}
        y2="150"
        stroke="#f97316"
        strokeWidth="1.5"
        markerEnd="url(#arr)"
      />
      <text
        x={mid}
        y="154"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#f97316"
      >
        {length.length > 14 ? "Length" : length}
      </text>
    </svg>
  );
}

function SideView({ shelves, depth }) {
  const n = Math.min(7, Math.max(2, parseInt(shelves) || 4));
  const top = 14,
    bottom = 126;
  const ys = [];
  for (let i = 0; i < n; i++)
    ys.push(top + 8 + ((bottom - top - 16) / (n - 1)) * i);
  return (
    <svg
      viewBox="0 0 150 180"
      className="h-auto w-full max-w-[140px]"
      aria-hidden
    >
      <line
        x1="62"
        y1={top}
        x2="62"
        y2={bottom + 5}
        stroke="#2d3a55"
        strokeWidth="2.5"
      />
      {ys.map((y, i) => (
        <g key={i}>
          <line
            x1="62"
            y1={y}
            x2="112"
            y2={y + 6}
            stroke="#2d3a55"
            strokeWidth="1.8"
          />
          <line
            x1="62"
            y1={y}
            x2="26"
            y2={y + 6}
            stroke="#2d3a55"
            strokeWidth="1.8"
          />
        </g>
      ))}
      <line
        x1="22"
        y1={bottom + 6}
        x2="116"
        y2={bottom + 6}
        stroke="#2d3a55"
        strokeWidth="3.5"
      />
      <line
        x1="22"
        y1="150"
        x2="44"
        y2="150"
        stroke="#f97316"
        strokeWidth="1.5"
        markerStart="url(#arr)"
      />
      <line
        x1="96"
        y1="150"
        x2="116"
        y2="150"
        stroke="#f97316"
        strokeWidth="1.5"
        markerEnd="url(#arr)"
      />
      <text
        x="69"
        y="154"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#f97316"
      >
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
  const relRef = useRef(null);

  const words = product.title.split(" ");
  const last = words.pop();

  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${product.title} (Size: ${sizes[size]}, Colour: ${colors[color].name}).`
  )}`;

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setTab(e.target.id)),
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

  const specRows = [
    { icon: MoveVertical, label: "Height", value: specs.height },
    { icon: MoveHorizontal, label: "Length", value: specs.length },
    { icon: Box, label: "Depth", value: specs.depth },
    { icon: Layers, label: specs.shelfLabel, value: specs.shelves },
    ...(specs.load
      ? [{ icon: ShieldCheck, label: "Load Capacity", value: specs.load }]
      : []),
  ];

  return (
    <div className="bg-soft pb-16">
      {/* ================= HERO ================= */}
      <section className="relative pb-8 pt-20">
        <div className="section-pad">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-navy/60">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-brand">
              Display Racks
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/${category.slug}`} className="hover:text-brand">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-navy">{product.title}</span>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
            {/* ---- Gallery ---- */}
            <div className="flex gap-3">
              {/* Thumbnails (desktop) */}
              <div className="hidden w-16 shrink-0 flex-col items-center gap-2 sm:flex">
                <button
                  type="button"
                  aria-label="Previous images"
                  disabled={!canUp}
                  onClick={() => setOffset((o) => Math.max(0, o - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-sm disabled:opacity-40"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                {visibleThumbs.map((g, i) => (
                  <button
                    key={g.key}
                    type="button"
                    aria-label={`Show image ${offset + i + 1}`}
                    onClick={() => setActive(offset + i)}
                    className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition ${
                      active === offset + i
                        ? "border-[#1f5fd6]"
                        : "border-slate-200 hover:border-slate-300"
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
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-sm disabled:opacity-40"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Main image */}
              <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-2xl bg-white shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Pic g={gallery[active]} pad="p-4" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating controls */}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <button
                    type="button"
                    aria-label={details.video ? "Play video" : "See gallery"}
                    onClick={() =>
                      details.video ? setVideo(true) : go("gallery")
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm backdrop-blur hover:bg-white"
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActive((a) => (a + 1) % gallery.length)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm backdrop-blur hover:bg-white"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ---- Product Info ---- */}
            <div>
              <span className="inline-block rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-700">
                {category.name}
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {words.join(" ")}{" "}
                <span style={{ color: BLUE }}>{last}</span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy/75">
                {product.desc}
              </p>

              {/* Sizes */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-navy">Available Sizes</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {sizes.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(i)}
                      className={`relative rounded-full border px-5 py-2 text-sm font-medium transition ${
                        size === i
                          ? "border-orange-400 bg-orange-50 text-navy"
                          : "border-slate-200 bg-white text-navy hover:border-orange-300"
                      }`}
                    >
                      {s}
                      {size === i && (
                        <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand text-white">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-navy">Color Options</p>
                <div className="mt-2.5 flex flex-wrap gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      title={c.name}
                      onClick={() => setColor(i)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                        color === i
                          ? "ring-2 ring-[#1f5fd6] ring-offset-2"
                          : "ring-1 ring-black/10"
                      }`}
                      style={{ background: c.hex }}
                    >
                      {color === i && (
                        <Check
                          className={`h-3.5 w-3.5 ${
                            isLight(c.hex) ? "text-navy" : "text-white"
                          }`}
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                >
                  <FileText className="h-4 w-4" />
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={details.brochure}
                  download
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#1f5fd6] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f5fd6] transition hover:bg-[#1f5fd6] hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  Brochure
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp us about ${product.title}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:brightness-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile thumbs */}
          <div className="mt-5 flex gap-2.5 overflow-x-auto sm:hidden">
            {gallery.map((g, i) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                  active === i ? "border-[#1f5fd6]" : "border-slate-200"
                }`}
              >
                <Pic g={g} pad="p-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TAB BAR ================= */}
      <div className="sticky top-20 z-30 border-b border-slate-200/60 bg-white/90 py-3 backdrop-blur">
        <div className="section-pad">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              const on = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    on
                      ? "bg-[#1f5fd6] text-white"
                      : "text-navy/70 hover:bg-slate-100 hover:text-navy"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      <section id="overview" className="section-pad scroll-mt-36 pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr_300px]">
          <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl bg-white shadow-sm">
            <MediaSlot
              src={details.scene || product.image}
              alt={`${product.title} in store`}
              className={`absolute inset-0 h-full w-full ${
                details.scene ? "object-cover" : "object-contain p-6"
              }`}
            />
          </div>

          <div>
            <Heading lead="Product" accent="Overview" />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy/75">
              {details.overview}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {features.map((f) => {
              const Icon = ICONS[f.icon] || Box;
              return (
                <li
                  key={f.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white px-3 py-4 text-center shadow-sm"
                >
                  <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />
                  <span className="mt-2 text-xs font-semibold leading-tight text-navy">
                    {f.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section id="applications" className="section-pad scroll-mt-36 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Heading lead="Applications" accent="" />
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-navy/70">
              Perfect for a wide range of retail and commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {applications.slice(0, 4).map((a) => {
              const Icon = ICONS[a.icon] || Store;
              return (
                <div
                  key={a.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white px-3 py-5 text-center shadow-sm"
                >
                  <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />
                  <span className="mt-2 text-xs font-semibold leading-tight text-navy">
                    {a.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="section-pad scroll-mt-36 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <Heading lead="Product" accent="Gallery" />
            <p className="mt-3 max-w-[200px] text-[15px] leading-relaxed text-navy/70">
              Explore the product from multiple angles.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[#1f5fd6] hover:bg-slate-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative h-52 min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={gIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Pic g={gMain} pad="p-2" />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[#1f5fd6] hover:bg-slate-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="hidden w-28 shrink-0 flex-col gap-2 md:flex">
              {gSide.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Show this view"
                  onClick={() => setGIdx((gIdx + i + 1) % gallery.length)}
                  className="relative h-16 w-full overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-[#1f5fd6]"
                >
                  <Pic g={g} fit="cover" pad="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIFICATIONS ================= */}
      <section id="specs" className="section-pad scroll-mt-36 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[240px_1fr_280px]">
          <div>
            <Heading lead="Technical" accent="Specifications" />
            <p className="mt-3 max-w-[220px] text-[15px] leading-relaxed text-navy/70">
              Detailed dimensions and configuration for your store requirements.
            </p>
          </div>

          <div className="flex items-end justify-center gap-6">
            <FrontView
              shelves={specs.shelves}
              height={specs.height}
              length={specs.length}
            />
            <SideView shelves={specs.shelves} depth={specs.depth} />
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
            {specRows.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${
                  i % 2 ? "bg-slate-50" : ""
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <Icon className="h-4 w-4 text-[#1f5fd6]" />
                  {label}
                </span>
                <span className="text-right text-sm text-navy/80">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <section id="related" className="section-pad scroll-mt-36 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <Heading lead="Related" accent="Products" />
            <p className="mt-3 max-w-[200px] text-[15px] leading-relaxed text-navy/70">
              Explore more display rack solutions for your retail space.
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() =>
                relRef.current?.scrollBy({ left: -240, behavior: "smooth" })
              }
              className="absolute -left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              ref={relRef}
              className="flex snap-x gap-4 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group w-40 shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-28 bg-white">
                    <MediaSlot
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-contain p-3"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 pb-3">
                    <h3 className="line-clamp-2 text-xs font-semibold leading-tight text-navy">
                      {p.title}
                    </h3>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next products"
              onClick={() =>
                relRef.current?.scrollBy({ left: 240, behavior: "smooth" })
              }
              className="absolute -right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1f5fd6] shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="section-pad scroll-mt-36 py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl bg-gradient-to-br from-[#1f5fd6] to-[#0f3f9e] p-6 text-white">
            <HelpCircle className="h-8 w-8 opacity-90" strokeWidth={1.6} />
            <p className="mt-3 text-lg font-bold">Frequently Asked</p>
            <p className="text-2xl font-extrabold">Questions</p>
          </div>

          <div className="space-y-2">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-navy transition ${
                      open ? "bg-blue-50" : ""
                    }`}
                  >
                    {f.q}
                    {open ? (
                      <Minus className="h-4 w-4 shrink-0 text-[#1f5fd6]" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-navy/60" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-navy/70">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {details.video && (
        <VideoModal
          open={video}
          onClose={() => setVideo(false)}
          src={details.video}
        />
      )}
    </div>
  );
}