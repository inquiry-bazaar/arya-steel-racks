import Link from "next/link";
import { ArrowRight, Layers, Package, Phone, Server, ShoppingCart, Store } from "lucide-react";
import MediaSlot from "./MediaSlot";
import WhatsAppIcon from "./WhatsAppIcon";
import { company } from "@/data/content";

// small icon above each title (picked from the slug so a product always gets the same one)
const ICONS = [ShoppingCart, Layers, Server, Package, Store];
const pickIcon = (slug = "") => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return ICONS[h % ICONS.length];
};

// wavy top edge for the info panel (used as a CSS mask)
const WAVE_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 26 C22 -4 42 0 60 24 S90 52 100 30 L100 100 L0 100 Z' fill='black'/%3E%3C/svg%3E\")";

const waveStyle = {
  WebkitMaskImage: WAVE_MASK,
  maskImage: WAVE_MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

export default function ProductCard({ p }) {
  const Icon = pickIcon(p.slug);
  const wa = `https://wa.me/${company.phoneHref.replace("+", "")}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${p.title}.`
  )}`;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-[#e6ecf7] bg-white shadow-[0_12px_30px_rgba(30,55,110,0.10)] transition-all duration-500
        hover:-translate-y-1 hover:border-orange-400
        hover:shadow-[0_0_0_3px_rgba(255,122,0,0.25),0_18px_40px_rgba(255,122,0,0.25)]"
    >
      {/* product image */}
      <Link href={`/${p.slug}`} className="relative block h-[240px] w-full shrink-0 p-3" aria-label={`View ${p.title}`}>
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-white">
          <MediaSlot
            src={p.image}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* top-right corner accent: blue by default, orange on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-20 h-9 w-9 rounded-tr-[26px] border-r-[5px] border-t-[5px] border-[#2f6fd6] transition-colors duration-500 group-hover:border-orange-400"
      />

      {/* wavy info panel overlapping the bottom of the image */}
      <div className="relative z-10 -mt-14 h-[140px] shrink-0">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white to-[#eef2fa] transition-all duration-500
            group-hover:from-[#2f74e0] group-hover:to-[#0f3f9e]"
          style={waveStyle}
        />
        <div className="relative z-10 flex h-full items-end justify-between gap-2 px-4 pb-3.5">
          <div className="min-w-0">
            <Icon
              className="mb-1.5 h-6 w-6 text-orange-500 transition-colors duration-500 group-hover:text-white"
              strokeWidth={1.7}
            />
            <h3 className="line-clamp-2 text-[15px] font-extrabold leading-[1.25] text-navy transition-colors duration-500 group-hover:text-white">
              <Link href={`/${p.slug}`}>{p.title}</Link>
            </h3>
            {p.subtitle && (
              <p className="mt-0.5 truncate text-[12px] font-medium text-navy/60 transition-colors duration-500 group-hover:text-white/90">
                {p.subtitle}
              </p>
            )}
          </div>
          <Link
            href={`/${p.slug}`}
            aria-label={`View ${p.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand text-white shadow-orange transition-all duration-500 group-hover:scale-110"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
        {/* description: always reserves 3 lines */}
        <p className="line-clamp-3 min-h-[3.9rem] text-[12.5px] leading-[1.3rem] text-navy/75">{p.desc}</p>

        {/* actions pinned to the bottom: Details + WhatsApp + Call */}
        <div className="mt-auto flex items-center gap-2 pt-3">
          <Link
            href={`/${p.slug}`}
            className="flex h-10 flex-1 items-center justify-center rounded-xl border border-navy/15 text-[13px] font-bold text-navy transition hover:border-brand hover:text-brand"
          >
            Details
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp us about ${p.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:brightness-95"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`tel:${company.phoneHref}`}
            aria-label={`Call us about ${p.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition hover:bg-brand"
          >
            <Phone className="h-[17px] w-[17px]" />
          </a>
        </div>
      </div>
    </article>
  );
}