import Link from "next/link";
import { Phone } from "lucide-react";
import MediaSlot from "./MediaSlot";
import WhatsAppIcon from "./WhatsAppIcon";
import { company } from "@/data/content";

export default function ProductCard({ p }) {
  const wa = `https://wa.me/${company.phoneHref.replace("+", "")}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${p.title}.`
  )}`;

  return (
    <article className="group flex h-full flex-col rounded-bl-xl rounded-br-[34px] rounded-tl-[34px] rounded-tr-xl border border-[#e6ecf7] bg-white p-2.5 shadow-[0_8px_24px_rgba(30,55,110,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_34px_rgba(30,55,110,0.14)]">
      <Link
        href={`/${p.slug}`}
        className="relative block h-[210px] w-full shrink-0 overflow-hidden rounded-bl-lg rounded-br-[26px] rounded-tl-[26px] rounded-tr-lg bg-[#f4f7fc]"
      >
        <MediaSlot
          src={p.image}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-3.5">
        {/* title: always reserves 2 lines */}
        <h3 className="line-clamp-2 min-h-[2.6rem] text-[15px] font-extrabold leading-[1.3] text-navy">
          <Link href={`/${p.slug}`} className="hover:text-brand">{p.title}</Link>
        </h3>
        {/* subtitle: always 1 line */}
        <p className="mt-1 h-[18px] truncate text-[12px] font-medium text-brand">{p.subtitle}</p>
        {/* description: always reserves 3 lines */}
        <p className="mt-2 line-clamp-3 min-h-[3.9rem] text-[12.5px] leading-[1.3rem] text-navy/75">{p.desc}</p>

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