"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// navbar (56px on mobile) + this bar (~64px) + a little breathing room
const MOBILE_SCROLL_OFFSET = 128;
const SHEET_ANIMATION_MS = 220;

export default function CategorySlider({ grouped }) {
  /* ---------- shared state ---------- */
  const [active, setActive] = useState(null);

  /* ---------- desktop slider state ---------- */
  const sliderRef = useRef(null);
  const chipRefs = useRef({});
  const [edges, setEdges] = useState({ start: true, end: false });

  /* ---------- mobile sheet state ---------- */
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeTimer = useRef(null);

  const activeCategory = grouped.find((c) => c.slug === active);
  const showSearch = grouped.length > 8;
  const filtered = query.trim()
    ? grouped.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : grouped;

  /* =====================================================
     Desktop slider logic (md and up)
     ===================================================== */
  const updateEdges = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    const el = sliderRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateEdges, grouped]);

  const scroll = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // keep the active chip centred (horizontal only, never moves the page)
  useEffect(() => {
    const el = sliderRef.current;
    const chip = chipRefs.current[active];
    if (!el || !chip || el.clientWidth === 0) return;
    el.scrollTo({
      left: chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  /* =====================================================
     Active section tracking (used by both layouts)
     ===================================================== */
  useEffect(() => {
    const targets = grouped
      .map((c) => document.getElementById(c.slug))
      .filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -65% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [grouped]);

  /* =====================================================
     Mobile sheet logic (below md)
     ===================================================== */
  const openSheet = () => {
    clearTimeout(closeTimer.current);
    setQuery("");
    setMounted(true);
    // two frames so the browser paints the "closed" position first
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true))
    );
  };

  const closeSheet = useCallback((restoreFocus = true) => {
    setShown(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMounted(false);
      if (restoreFocus) triggerRef.current?.focus();
    }, SHEET_ANIMATION_MS);
  }, []);

  // lock page scroll while the sheet is open
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  // move focus into the sheet on open
  useEffect(() => {
    if (shown) closeBtnRef.current?.focus();
  }, [shown]);

  // Escape to close + simple focus trap
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeSheet();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, closeSheet]);

  // if the screen grows to desktop size, drop the sheet immediately
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) {
        clearTimeout(closeTimer.current);
        setShown(false);
        setMounted(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const goTo = (slug) => {
    closeSheet(false);
    // wait for the sheet to unlock page scrolling before navigating
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const top =
        el.getBoundingClientRect().top + window.scrollY - MOBILE_SCROLL_OFFSET;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${slug}`);
      setActive(slug);
    }, SHEET_ANIMATION_MS + 20);
  };

  /* =====================================================
     Styles
     ===================================================== */
  const arrowClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e3e9f6] bg-white text-navy shadow-sm transition " +
    "disabled:pointer-events-none disabled:opacity-35 active:scale-95 " +
    "[@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand [@media(hover:hover)]:hover:text-white " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  const fadeLeft = edges.start ? "black 0" : "transparent 0, black 28px";
  const fadeRight = edges.end
    ? "black 100%"
    : "black calc(100% - 28px), transparent 100%";
  const mask = `linear-gradient(to right, ${fadeLeft}, ${fadeRight})`;

  return (
    <>
      <div className="sticky top-[56px] z-30 bg-white/90 shadow-[0_8px_24px_-12px_rgba(15,29,74,0.18)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75 md:top-[64px]">
        <div className="section-pad">
          {/* ================= MOBILE: filter button ================= */}
          <div className="py-2.5 md:hidden">
            <button
              ref={triggerRef}
              type="button"
              onClick={openSheet}
              aria-haspopup="dialog"
              aria-expanded={mounted}
              className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border border-[#e3e9f6] bg-[#f1f5fc] px-3.5 text-left transition active:scale-[0.99] active:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand shadow-sm ring-1 ring-[#e3e9f6]">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
                  <path d="M3 5h14M6 10h8M9 15h2" />
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium leading-none text-navy/50">
                  Browse categories
                </span>
                <span className="mt-1 block truncate text-[14px] font-semibold leading-none text-navy">
                  {activeCategory ? activeCategory.name : "All categories"}
                </span>
              </span>

              <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-[11px] font-extrabold text-navy/70 ring-1 ring-[#e3e9f6]">
                {grouped.length}
              </span>

              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-navy/50">
                <path d="M5 8l5 5 5-5" />
              </svg>
            </button>
          </div>

          {/* ================= DESKTOP: slider ================= */}
          <div className="hidden items-center gap-3 py-3.5 md:flex">
            <span className="hidden shrink-0 items-center gap-2 border-r border-[#e3e9f6] pr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy/50 lg:inline-flex">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4 text-brand">
                <path d="M3 5h14M6 10h8M9 15h2" />
              </svg>
              Browse by
            </span>

            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={edges.start}
              aria-label="Previous categories"
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </button>

            <ul
              ref={sliderRef}
              onScroll={updateEdges}
              aria-label="Product categories"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-3 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto"
            >
              {grouped.map((c) => {
                const isActive = active === c.slug;
                return (
                  <li
                    key={c.slug}
                    ref={(node) => {
                      if (node) chipRefs.current[c.slug] = node;
                    }}
                    className="shrink-0"
                  >
                    <a
                      href={`#${c.slug}`}
                      aria-current={isActive ? "true" : undefined}
                      className={
                        "group inline-flex items-center gap-2.5 rounded-xl border py-2 pl-4 pr-2 text-[13.5px] font-semibold transition-all duration-200 " +
                        "hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white hover:text-brand hover:shadow-[0_8px_20px_-8px_rgba(249,115,22,0.45)] " +
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
                        (isActive
                          ? "border-brand/40 bg-white text-brand shadow-[0_6px_16px_-8px_rgba(249,115,22,0.5)]"
                          : "border-transparent bg-[#f1f5fc] text-navy")
                      }
                    >
                      <span className="whitespace-nowrap">{c.name}</span>
                      <span
                        className={
                          "grid h-6 min-w-6 place-items-center rounded-lg px-1.5 text-[11px] font-extrabold shadow-sm ring-1 transition-colors " +
                          "group-hover:bg-brand group-hover:text-white group-hover:ring-brand " +
                          (isActive
                            ? "bg-brand text-white ring-brand"
                            : "bg-white text-navy/70 ring-[#e3e9f6]")
                        }
                      >
                        {c.items.length}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={edges.end}
              aria-label="Next categories"
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M8 4l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      {/* ================= MOBILE: bottom sheet ================= */}
      {mounted && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* backdrop */}
          <div
            onClick={() => closeSheet()}
            aria-hidden="true"
            className={
              "absolute inset-0 bg-navy/45 backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none " +
              (shown ? "opacity-100" : "opacity-0")
            }
          />

          {/* panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Browse categories"
            className={
              "absolute inset-x-0 bottom-0 flex max-h-[82dvh] flex-col rounded-t-3xl bg-white shadow-[0_-20px_48px_-16px_rgba(15,29,74,0.35)] transition-transform duration-[220ms] ease-out motion-reduce:transition-none " +
              (shown ? "translate-y-0" : "translate-y-full")
            }
          >
            {/* grab handle */}
            <div className="flex justify-center pt-2.5" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-[#d5ddef]" />
            </div>

            {/* header */}
            <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-3">
              <div>
                <h2 className="text-[17px] font-bold leading-tight text-navy">
                  Browse categories
                </h2>
                <p className="mt-0.5 text-[12.5px] text-navy/55">
                  {grouped.length} categories
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => closeSheet()}
                aria-label="Close categories"
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e9f6] bg-white text-navy transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>

            {/* search (only when the list is long) */}
            {showSearch && (
              <div className="px-5 pb-3">
                <label className="relative block">
                  <span className="sr-only">Search categories</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40">
                    <circle cx="9" cy="9" r="5.5" />
                    <path d="M13.5 13.5L17 17" />
                  </svg>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search categories"
                    // 16px font stops iOS Safari zooming the page on focus
                    className="h-11 w-full rounded-xl border border-[#e3e9f6] bg-[#f1f5fc] pl-10 pr-3 text-[16px] text-navy placeholder:text-navy/40 focus:border-brand/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              </div>
            )}

            {/* list */}
            <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-[#eef2fa] px-3 py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {filtered.length === 0 && (
                <li className="px-3 py-10 text-center text-[14px] text-navy/55">
                  No categories match “{query.trim()}”.
                </li>
              )}

              {filtered.map((c) => {
                const isActive = active === c.slug;
                return (
                  <li key={c.slug}>
                    <a
                      href={`#${c.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(c.slug);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={
                        "flex min-h-[52px] items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors active:bg-[#f1f5fc] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand " +
                        (isActive ? "bg-brand/[0.07] text-brand" : "text-navy")
                      }
                    >
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>

                      <span
                        className={
                          "grid h-6 min-w-6 shrink-0 place-items-center rounded-lg px-1.5 text-[11px] font-extrabold ring-1 " +
                          (isActive
                            ? "bg-brand text-white ring-brand"
                            : "bg-[#f1f5fc] text-navy/70 ring-[#e3e9f6]")
                        }
                      >
                        {c.items.length}
                      </span>

                      <span className="grid h-5 w-5 shrink-0 place-items-center">
                        {isActive && (
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
                            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                            className="h-4 w-4 text-brand">
                            <path d="M4 10.5l4 4 8-9" />
                          </svg>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}