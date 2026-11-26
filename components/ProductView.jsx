"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Box,
  Boxes,
  Check,
  ChevronRight,
  Download,
  FileText,
  Footprints,
  Gem,
  Gift,
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
  Headset,
} from "lucide-react";
import MediaSlot from "./MediaSlot";
import VideoModal from "./VideoModal";
import WhatsAppIcon from "./WhatsAppIcon";
import BgHeader from "./BgHeader";
import QuoteModal from "./QuoteModal";

const BLUE = "#1f5fd6";
const CARD = "rounded-2xl border border-slate-200/70 bg-white shadow-sm";

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

const TABS = [
  { id: "overview", label: "Overview", icon: Box },
  { id: "applications", label: "Applications", icon: LayoutGrid },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "specs", label: "Specifications", icon: Layers },
  { id: "related", label: "Related", icon: Boxes },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

// Different crops of the same photo, used when a product has only one image
const CROPS = [
  { s: 1, o: "50% 50%" },
  { s: 1.9, o: "50% 12%" },
  { s: 1.9, o: "50% 88%" },
  { s: 1.7, o: "12% 50%" },
  { s: 1.7, o: "88% 50%" },
];

const isLight = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((x) => x + x).join("") : h,
    16
  );
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
};

function Pic({ g, pad = "p-0" }) {
  const c = CROPS[(g.crop || 0) % CROPS.length];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${c.s})`,
          transformOrigin: c.o,
        }}
      >
        <MediaSlot
          src={g.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${pad}`}
        />
      </div>
    </div>
  );
}

function Section({ id, lead, accent, blurb, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-36 border-t border-slate-200/70 py-12 first:border-t-0"
    >
      <div className="section-pad grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-12">
        <header className="lg:sticky lg:top-40 lg:self-start">
          <span className="mb-3 block h-1 w-10 rounded-full bg-orange-500" />
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {lead} {accent && <span style={{ color: BLUE }}>{accent}</span>}
          </h2>
          {blurb && (
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-navy/70">
              {blurb}
            </p>
          )}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/* Feature row: icon chip + label, numbered. Odd last item spans full width. */
function FeatureItem({ icon, label, index, fallback, span }) {
  const Icon = ICONS[icon] || fallback;
  return (
    <li
      className={`${CARD} group relative flex items-center gap-3.5 overflow-hidden px-4 py-3.5 transition hover:border-orange-300 hover:shadow-md ${
        span ? "sm:col-span-2" : ""
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="text-sm font-semibold leading-tight text-navy">{label}</span>
      <span className="ml-auto text-xl font-bold tabular-nums text-slate-200 transition group-hover:text-orange-200">
        {String(index + 1).padStart(2, "0")}
      </span>
    </li>
  );
}

/* Application card: tinted icon, label, arrow reveal on hover */
function AppCard({ icon, label, fallback }) {
  const Icon = ICONS[icon] || fallback;
  return (
    <li
      className={`${CARD} group relative flex flex-col items-start gap-4 overflow-hidden p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#1f5fd6] hover:shadow-md`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1f5fd6] transition group-hover:bg-[#1f5fd6] group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-sm font-semibold leading-tight text-navy">{label}</span>
        <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-[#1f5fd6] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
      <Icon
        className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 text-slate-100 transition group-hover:text-blue-50"
        strokeWidth={1.2}
        aria-hidden
      />
    </li>
  );
}

/* ---------------- dimension diagrams ---------------- */

const clampShelves = (v) => Math.min(7, Math.max(2, parseInt(v) || 4));

function FrontView({ shelves, height, length }) {
  const n = clampShelves(shelves);
  const top = 14, bottom = 126, left = 80, right = 288;
  const mid = (left + right) / 2;
  const rows = Array.from({ length: n + 1 }, (_, i) => top + ((bottom - top) / n) * i);

  return (
    <svg viewBox="0 0 300 180" className="h-auto w-full max-w-[280px]" aria-hidden>
      <defs>
        <marker id="arrF" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill="#f97316" />
        </marker>
      </defs>
      <rect x={left} y={top} width={right - left} height={bottom - top} fill="none" stroke="#2d3a55" strokeWidth="2" />
      <line x1={mid} y1={top} x2={mid} y2={bottom} stroke="#2d3a55" strokeWidth="2" />
      {rows.slice(1, -1).map((y, i) => (
        <g key={i}>
          <line x1={left} y1={y} x2={right} y2={y} stroke="#2d3a55" strokeWidth="2" />
          <line x1={left} y1={y + 4} x2={right} y2={y + 4} stroke="#8a97b2" strokeWidth="1" />
        </g>
      ))}
      <line x1={left} y1={bottom + 5} x2={right} y2={bottom + 5} stroke="#2d3a55" strokeWidth="3.5" />

      {/* height */}
      <line x1="66" y1={top} x2="66" y2={bottom} stroke="#f97316" strokeWidth="1.5" markerStart="url(#arrF)" markerEnd="url(#arrF)" />
      <text x="2" y={(top + bottom) / 2 + 4} fontSize="11" fontWeight="700" fill="#f97316">
        {height.length > 10 ? "Height" : height}
      </text>

      {/* length */}
      <line x1={left} y1="150" x2={mid - 30} y2="150" stroke="#f97316" strokeWidth="1.5" markerStart="url(#arrF)" />
      <line x1={mid + 30} y1="150" x2={right} y2="150" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrF)" />
      <text x={mid} y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f97316">
        {length.length > 14 ? "Length" : length}
      </text>
    </svg>
  );
}

function SideView({ shelves, depth }) {
  const n = clampShelves(shelves);
  const top = 14, bottom = 126;
  const ys = Array.from({ length: n }, (_, i) => top + 8 + ((bottom - top - 16) / (n - 1)) * i);

  return (
    <svg viewBox="0 0 150 180" className="h-auto w-full max-w-[140px]" aria-hidden>
      <defs>
        <marker id="arrS" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill="#f97316" />
        </marker>
      </defs>
      <line x1="62" y1={top} x2="62" y2={bottom + 5} stroke="#2d3a55" strokeWidth="2.5" />
      {ys.map((y, i) => (
        <g key={i}>
          <line x1="62" y1={y} x2="112" y2={y + 6} stroke="#2d3a55" strokeWidth="1.8" />
          <line x1="62" y1={y} x2="26" y2={y + 6} stroke="#2d3a55" strokeWidth="1.8" />
        </g>
      ))}
      <line x1="22" y1={bottom + 6} x2="116" y2={bottom + 6} stroke="#2d3a55" strokeWidth="3.5" />
      <line x1="22" y1="150" x2="44" y2="150" stroke="#f97316" strokeWidth="1.5" markerStart="url(#arrS)" />
      <line x1="96" y1="150" x2="116" y2="150" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrS)" />
      <text x="69" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f97316">
        {depth.length > 12 ? "Depth" : depth}
      </text>
    </svg>
  );
}


export default function ProductView({ product, category, related, details, waNumber }) {
  const { sizes, colors, features, applications, specs, gallery, faqs } = details;

  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [tab, setTab] = useState("overview");
  const [video, setVideo] = useState(false);
  const [mega, setMega] = useState(false);
  const words = product.title.split(" ");
  const last = words.pop();
const [quoteOpen, setQuoteOpen] = useState(false);

const openQuote = () => {
  setMega(false);
  setQuoteOpen(true);
};

const closeQuote = useCallback(() => {
  setQuoteOpen(false);
}, []);
  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${product.title} (Size: ${sizes[size]}, Colour: ${colors[color].name}).`
  )}`;

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const showImage = (i) => {
    setActive(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTab(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const specRows = [
    { icon: MoveVertical, label: "Height", value: specs.height },
    { icon: MoveHorizontal, label: "Length", value: specs.length },
    { icon: Box, label: "Depth", value: specs.depth },
    { icon: Layers, label: specs.shelfLabel, value: specs.shelves },
    ...(specs.load ? [{ icon: ShieldCheck, label: "Load Capacity", value: specs.load }] : []),
  ];

  return (
    <div className="bg-soft pb-16">
       <BgHeader
  title={product.title}
  eyebrow="Need a bulk Order for this product"
  accent="#f97316"
  text="Display racks, counters, trolleys and baskets built for supermarkets, garment stores and retail shops. Pick a category or scroll through everything."
  backgroundImage="/products_hero.webp"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: category.name , href : category.slug },
    { label: product.title },     
  ]}
/>
      <section className="pb-10 pt-24">
        <div className="section-pad">
          {/* <nav className="flex flex-wrap items-center gap-1.5 text-sm text-navy/60">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-brand">Display Racks</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/${category.slug}`} className="hover:text-brand">{category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-navy">{product.title}</span>
          </nav> */}

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---- Gallery ---- */}
            <div>
              <div className={`${CARD} relative aspect-[4/3] overflow-hidden`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Pic g={gallery[active]} pad="p-0" />
                  </motion.div>
                </AnimatePresence>

                {details.video && (
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setVideo(true)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                )}
              </div>

              <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
                {gallery.map((g, i) => (
                  <button
                    key={g.key}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-20 sm:w-20 ${
                      active === i ? "border-[#1f5fd6]" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Pic g={g} pad="p-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* ---- Product info ---- */}
            <div className="lg:pt-2">
              <span className="inline-block rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-700">
                {category.name}
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-4xl">
                {words.join(" ")} <span style={{ color: BLUE }}>{last}</span>
              </h1>

              <p className="mt-4 max-w-full text-[20px] leading-relaxed text-navy/75">
                {product.desc}
              </p>

              <div className="mt-8 space-y-6 border-t border-slate-200/70 pt-6">
                {/* <div>
                  <p className="text-sm font-semibold text-navy">Available Sizes</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(i)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2 text-sm font-medium transition ${
                          size === i
                            ? "border-orange-400 bg-orange-50 text-navy"
                            : "border-slate-200 bg-white text-navy hover:border-orange-300"
                        }`}
                      >
                        {size === i && <Check className="h-3.5 w-3.5 text-orange-500" strokeWidth={3} />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-navy">
                    Color Options
                    <span className="ml-2 font-normal text-navy/60">{colors[color].name}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {colors.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        aria-label={c.name}
                        title={c.name}
                        onClick={() => setColor(i)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                          color === i ? "ring-2 ring-[#1f5fd6] ring-offset-2" : "ring-1 ring-black/10"
                        }`}
                        style={{ background: c.hex }}
                      >
                        {color === i && (
                          <Check
                            className={`h-3.5 w-3.5 ${isLight(c.hex) ? "text-navy" : "text-white"}`}
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
               <button
                               type="button"
                               onClick={openQuote}
                               className="btn-orange !py-3"
                             >
                               Get a Quote
                               <ArrowRight className="h-4 w-4" />
                             </button>
                <a
                  href={details.brochure}
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#1f5fd6] bg-white px-5 text-sm font-semibold text-[#1f5fd6] transition hover:bg-[#1f5fd6] hover:text-white"
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

              {/* Key specs at a glance */}
              <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm sm:grid-cols-4 sm:divide-x sm:divide-slate-100">
                {[
                  { icon: MoveVertical, label: "Height", value: specs.height },
                  { icon: MoveHorizontal, label: "Length", value: specs.length },
                  { icon: Box, label: "Depth", value: specs.depth },
                  { icon: Layers, label: specs.shelfLabel, value: specs.shelves },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-1 border-b border-slate-100 px-4 py-3.5 sm:border-b-0">
                    <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy/50">
                      <Icon className="h-3.5 w-3.5 text-[#1f5fd6]" />
                      {label}
                    </dt>
                    <dd className="truncate text-sm font-bold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Feature chips */}
              {/* <ul className="mt-4 flex flex-wrap gap-2">
                {features.map((f) => {
                  const Icon = ICONS[f.icon] || Box;
                  return (
                    <li
                      key={f.label}
                      className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-orange-700"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      {f.label}
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-y border-slate-200/70 bg-white/90 py-2.5 backdrop-blur">
        <div className="section-pad">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === id
                    ? "bg-[#1f5fd6] text-white"
                    : "text-navy/70 hover:bg-slate-100 hover:text-navy"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Section id="overview" lead="Product" accent="Overview">
        <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Image fills the card edge-to-edge, no dead padding */}
          <div className={`${CARD} relative min-h-[320px] overflow-hidden md:min-h-[420px]`}>
            <MediaSlot
              src={details.scene || product.image}
              alt={`${product.title} in store`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur">
              {category.name}
            </span>
          </div>

          {/* Content column: top-aligned with the image, same height */}
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed text-navy/75">{details.overview}</p>

            {/* Quick facts strip from specs */}
            {/* <dl className="grid grid-cols-2 divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm sm:grid-cols-4 sm:divide-x">
              {[
                { icon: MoveVertical, label: "Height", value: specs.height },
                { icon: MoveHorizontal, label: "Length", value: specs.length },
                { icon: Box, label: "Depth", value: specs.depth },
                { icon: Layers, label: specs.shelfLabel, value: specs.shelves },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1 border-b border-slate-100 px-4 py-3.5 sm:border-b-0">
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy/50">
                    <Icon className="h-3.5 w-3.5 text-[#1f5fd6]" />
                    {label}
                  </dt>
                  <dd className="truncate text-sm font-bold text-navy">{value}</dd>
                </div>
              ))}
            </dl> */}

            <div>
              <h3 className="mb-4 text-lg font-semibold text-navy">Key Highlights</h3>
              <ul className="grid gap-4 sm:grid-cols-2 [&>li]:p-5 [&>li_*]:text-base [&>li_svg]:h-6 [&>li_svg]:w-6">
                {features.map((f, i) => (
                  <FeatureItem
                    key={f.label}
                    icon={f.icon}
                    label={f.label}
                    index={i}
                    fallback={Box}
                    span={features.length % 2 === 1 && i === features.length - 1}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= APPLICATIONS ================= */}
      <Section
        id="applications"
        lead="Applications"
        blurb="Perfect for a wide range of retail and commercial spaces."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {applications.map((a) => (
            <AppCard key={a.label} icon={a.icon} label={a.label} fallback={Store} />
          ))}
        </ul>
      </Section>

      {/* ================= GALLERY ================= */}
      <Section
        id="gallery"
        lead="Product"
        accent="Gallery"
        blurb="Explore the product from multiple angles."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <button
              key={g.key}
              type="button"
              aria-label={`View image ${i + 1}`}
              onClick={() => showImage(i)}
              className={`${CARD} group relative aspect-square overflow-hidden transition hover:border-[#1f5fd6]`}
            >
              <Pic g={g} pad="p-3" />
            </button>
          ))}
        </div>
      </Section>

      {/* ================= SPECIFICATIONS ================= */}
      <Section
        id="specs"
        lead="Technical"
        accent="Specifications"
        blurb="Detailed dimensions and configuration for your store requirements."
      >
        <div className="grid items-stretch gap-4 md:grid-cols-2">
          <div className={`${CARD} flex items-end justify-center gap-6 p-6`}>
            <FrontView shelves={specs.shelves} height={specs.height} length={specs.length} />
            <SideView shelves={specs.shelves} depth={specs.depth} />
          </div>

          <dl className={`${CARD} divide-y divide-slate-100 p-2`}>
            {specRows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 px-3 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                  <Icon className="h-4 w-4 text-[#1f5fd6]" />
                  {label}
                </dt>
                <dd className="text-right text-sm text-navy/80">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ================= RELATED PRODUCTS ================= */}
      <Section
        id="related"
        lead="Related"
        accent="Products"
        blurb="Explore more display rack solutions for your retail space."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {related.slice(0, 8).map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className={`${CARD} group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="relative aspect-[4/3] bg-white">
                <MediaSlot
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3.5 py-3">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-navy">
                  {p.title}
                </h3>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ================= FAQ ================= */}
      <Section
        id="faq"
        lead="Frequently Asked"
        accent="Questions"
        blurb="Quick answers to common questions about this product."
      >
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className={`${CARD} overflow-hidden`}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy transition ${
                    open ? "bg-blue-50/60" : "hover:bg-slate-50"
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
                      <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-navy/70">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
 <QuoteModal open={quoteOpen} onClose={closeQuote} />
      {details.video && (
        <VideoModal open={video} onClose={() => setVideo(false)} src={details.video} />
      )}
    </div>
  );
}