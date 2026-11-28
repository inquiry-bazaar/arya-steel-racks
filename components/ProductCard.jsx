import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "919999999999"; 
const PHONE_NUMBER = "+919999999999";

const getHref = (p) => p.href ?? `/products/${p.slug}`;

function RackIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect x="3" y="3.5" width="18" height="7" rx="2" />
      <rect x="3" y="13.5" width="18" height="7" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
      className="h-5 w-5" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export default function ProductCard({ p }) {
  const name = p.name ?? p.title;
  const subtitle = p.subtitle ?? p.type ?? p.tagline ?? p.category;
  const description = p.description ?? p.desc ?? p.short;
  const image = p.image ?? p.img;
  const featured = Boolean(p.featured ?? p.popular);
  const href = getHref(p);

  const waText = encodeURIComponent(
    `Hi Arya Display Rack, I'm interested in "${name}". Please share details and price.`
  );

  return (
    <article
      className={
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-white transition-shadow duration-200 sm:rounded-2xl " +
        "[@media(hover:hover)]:hover:shadow-[0_18px_40px_-20px_rgba(15,29,74,0.35)] " +
        (featured
          ? "border-brand/60 shadow-[0_10px_28px_-16px_rgba(249,115,22,0.5)]"
          : "border-[#e3e9f6] shadow-sm")
      }
    >
      <div
        className={
          "relative aspect-[4/3] w-full shrink-0 overflow-hidden " +
          (featured
            ? "bg-gradient-to-br from-[#2563d6] to-[#16358f]"
            : "bg-gradient-to-br from-[#f1f5fc] to-white")
        }
      >
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 32vw, 260px"
            className="object-contain p-2 sm:p-3"
          />
        )}

        {/* small rack badge, top-left */}
        <span
          className={
            "absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-md sm:left-3 sm:top-3 sm:h-8 sm:w-8 sm:rounded-lg " +
            (featured
              ? "bg-white/15 text-white ring-1 ring-white/30"
              : "bg-white text-brand shadow-sm ring-1 ring-[#e3e9f6]")
          }
        >
          <RackIcon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" />
        </span>

        {/* arrow */}
        <Link
          href={href}
          aria-label={`View ${name}`}
          className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-brand text-white shadow-[0_8px_18px_-6px_rgba(249,115,22,0.7)] transition active:scale-95 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 [@media(hover:hover)]:hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowIcon />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <h3 className="line-clamp-2 text-[13px] font-extrabold leading-snug tracking-tight text-navy sm:text-[16px]">
          {name}
        </h3>

        {subtitle && (
          <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-navy/55 sm:text-[12.5px]">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-[11.5px] leading-snug text-navy/70 sm:mt-2 sm:line-clamp-3 sm:text-[13.5px] sm:leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-4 sm:flex sm:items-center sm:gap-2">
          <Link
            href={href}
            className="col-span-2 inline-flex h-9 min-w-0 items-center justify-center rounded-lg border border-[#e3e9f6] bg-white px-2 text-[12.5px] font-bold text-navy transition active:scale-[0.98] sm:h-11 sm:flex-1 sm:rounded-xl sm:px-3 sm:text-[14px] [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Details
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${name} on WhatsApp`}
            className="grid h-9 place-items-center rounded-lg bg-[#25d366] text-white transition active:scale-95 sm:h-11 sm:w-11 sm:shrink-0 sm:rounded-xl [@media(hover:hover)]:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]"
          >
            <WhatsAppIcon />
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="Call Arya Display Rack"
            className="grid h-9 place-items-center rounded-lg bg-navy text-white transition active:scale-95 sm:h-11 sm:w-11 sm:shrink-0 sm:rounded-xl [@media(hover:hover)]:hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>
    </article>
  );
}