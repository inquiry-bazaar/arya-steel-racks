
"use client";

import { useRef } from "react";

export default function CategorySlider({ grouped }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    sliderRef.current?.scrollBy({
      left: direction * 250,
      behavior: "smooth",
    });
  };

  const arrowClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e3e9f6] bg-white text-navy shadow-sm transition hover:border-brand hover:bg-brand hover:text-white active:scale-95";

  return (
    <div className="sticky top-[64px] z-30 bg-white/90 shadow-[0_8px_24px_-12px_rgba(15,29,74,0.18)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="section-pad">
        <div className="flex items-center gap-3 py-3.5">

          {/* Browse label */}
          <span className="hidden shrink-0 items-center gap-2 border-r border-[#e3e9f6] pr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy/50 lg:inline-flex">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round"
              className="h-4 w-4 text-brand">
              <path d="M3 5h14M6 10h8M9 15h2" />
            </svg>
            Browse by
          </span>

          {/* Previous arrow */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous categories"
            className={arrowClass}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>

          {/* Category slider */}
          <ul
            ref={sliderRef}
            aria-label="Product categories"
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto overflow-y-hidden scroll-smooth py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {grouped.map((c) => (
              <li key={c.slug} className="shrink-0">
                <a
                  href={`#${c.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-transparent bg-[#f1f5fc] py-2 pl-4 pr-2 text-[13.5px] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white hover:text-brand hover:shadow-[0_8px_20px_-8px_rgba(249,115,22,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="whitespace-nowrap">{c.name}</span>

                  <span className="grid h-6 min-w-6 place-items-center rounded-lg bg-white px-1.5 text-[11px] font-extrabold text-navy/70 shadow-sm ring-1 ring-[#e3e9f6] transition-colors group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                    {c.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next categories"
            className={arrowClass}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="h-4 w-4">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>

        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
    </div>
  );
}
