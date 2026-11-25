import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { catalogue, categoryList } from "@/data/products";

export const metadata = {
  title: "All Products | Arya Display Rack, New Delhi",
  description:
    "Browse all supermarket display racks, garment racks, counters, trolleys and baskets by Arya Display Rack.",
};

function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      aria-hidden="true"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function ProductsPage() {
  // Group once instead of filtering the whole catalogue inside the render loop.
  const grouped = categoryList
    .map((c) => ({
      ...c,
      items: catalogue.filter((p) => p.category === c.name),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <main>
      <Navbar />

      {/* ───────────── Page header ───────────── */}
      <section className="relative overflow-hidden bg-soft pb-10 pt-28">
        {/* soft brand glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="section-pad relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-navy/60">
            <Link href="/" className="transition hover:text-brand">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-navy">Products</span>
          </nav>

          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[36px] font-extrabold tracking-tight sm:text-[46px]">
                Our <span className="text-brand">Products</span>
              </h1>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/70">
                Display racks, counters, trolleys and baskets built for supermarkets,
                garment stores and retail shops. Pick a category or scroll through
                everything.
              </p>
            </div>

            {/* quick stats */}
            <dl className="flex gap-3">
              <div className="rounded-2xl border border-[#dbe3f3] bg-white px-5 py-3 shadow-sm">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                  Products
                </dt>
                <dd className="text-2xl font-extrabold text-navy">{catalogue.length}</dd>
              </div>
              <div className="rounded-2xl border border-[#dbe3f3] bg-white px-5 py-3 shadow-sm">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                  Categories
                </dt>
                <dd className="text-2xl font-extrabold text-brand">{categoryList.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────── Sticky category jump-nav ───────────── */}
      <div className="sticky top-[64px] z-30 bg-white/90 shadow-[0_8px_24px_-12px_rgba(15,29,74,0.18)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="section-pad">
          <div className="flex items-center gap-5 py-3.5">
            {/* label */}
            <span className="hidden shrink-0 items-center gap-2 border-r border-[#e3e9f6] pr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy/50 lg:inline-flex">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-4 w-4 text-brand"
                aria-hidden="true"
              >
                <path d="M3 5h14M6 10h8M9 15h2" />
              </svg>
              Browse by
            </span>

            {/* scrollable track with soft edge fade */}
            <ul
              aria-label="Product categories"
              className="no-scrollbar flex flex-1 gap-2 overflow-x-auto py-1 [mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%-24px),transparent)] px-4 lg:px-2"
            >
              {grouped.map((c) => (
                <li key={c.slug} className="shrink-0">
                  <a
                    href={`#${c.slug}`}
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-transparent bg-[#f1f5fc] py-2 pl-4 pr-2 text-[13.5px] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white hover:text-brand hover:shadow-[0_8px_20px_-8px_rgba(249,115,22,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0"
                  >
                    <span className="whitespace-nowrap">{c.name}</span>
                    <span className="grid h-6 min-w-6 place-items-center rounded-lg bg-white px-1.5 text-[11px] font-extrabold text-navy/70 shadow-sm ring-1 ring-[#e3e9f6] transition-colors group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                      {c.items.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* hairline accent under the bar */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />
      </div>

      {/* ───────────── Category sections ───────────── */}
      <section className="bg-soft pb-20 pt-4">
        <div className="section-pad">
          {grouped.map((c, i) => (
            <div
              key={c.slug}
              id={c.slug}
              className={`scroll-mt-36 ${i === 0 ? "pt-8" : "pt-14"}`}
            >
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#dbe3f3] pb-4">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-8 w-1.5 rounded-full bg-brand" />
                  <div>
                    <h2 className="text-[22px] font-extrabold tracking-tight sm:text-2xl">
                      {c.name}
                    </h2>
                    <p className="text-[13px] text-navy/60">
                      {c.items.length} {c.items.length === 1 ? "product" : "products"}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/${c.slug}`}
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/30 px-4 py-2 text-[13px] font-bold text-brand transition hover:bg-brand hover:text-white"
                >
                  View all
                  <Arrow className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {c.items.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}