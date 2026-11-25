import Link from "next/link";
import { Phone } from "lucide-react";
import MediaSlot from "./MediaSlot";
import { company } from "@/data/content";

// Product card used on the /products and /category/<slug> pages
export default function ProductCard({ p }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#e6ecf7] bg-white shadow-[0_8px_24px_rgba(30,55,110,0.06)] transition hover:-translate-y-1">
      <Link href={`/products/${p.slug}`} className="block aspect-square bg-[#f4f7fc]">
        <MediaSlot src={p.image} alt={p.title} className="h-full w-full object-contain p-2" />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-[14.5px] font-extrabold leading-snug text-navy">
          <Link href={`/products/${p.slug}`} className="hover:text-brand">{p.title}</Link>
        </h3>
        <p className="mt-1 text-[12px] text-navy/60">{p.subtitle}</p>
        <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-relaxed text-navy/75">{p.desc}</p>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${p.slug}`}
            className="flex-1 rounded-lg border border-navy/15 px-3 py-2 text-center text-[12.5px] font-bold text-navy hover:border-brand hover:text-brand"
          >
            Details
          </Link>
          <a
            href={`tel:${company.phoneHref}`}
            aria-label="Call for a quote"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-3 py-2 text-white"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}