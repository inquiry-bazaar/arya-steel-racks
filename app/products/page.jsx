import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategorySlider from "@/components/CategorySlider";
import { catalogue, categoryList } from "@/data/products";
import BgHeader from "@/components/BgHeader";

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
  // Group products by category
  const grouped = categoryList
    .map((c) => ({
      ...c,
      items: catalogue.filter((p) => p.category === c.name),
    }))
    .filter((c) => c.items.length > 0);

  return (
    // overflow-x-clip stops any stray wide element from causing sideways scroll on phones
    <main className="overflow-x-clip">
      <BgHeader
        title="Products"
        eyebrow="Let Us Know your Query"
        accent="#f97316"
        text="Display racks, counters, trolleys and baskets built for supermarkets, garment stores and retail shops. Pick a category or scroll through everything."
        backgroundImage="/products_banner.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <CategorySlider grouped={grouped} />

      {/* extra bottom padding on mobile keeps the last cards clear of the floating WhatsApp button */}
      <section className="bg-soft pb-28 pt-2 md:pb-20 md:pt-4">
        <div className="section-pad">
          {grouped.map((c, i) => (
            <div
              key={c.slug}
              id={c.slug}
              className={`scroll-mt-32 md:scroll-mt-36 ${
                i === 0 ? "pt-6 md:pt-8" : "pt-10 md:pt-14"
              }`}
            >
              {/* Category heading */}
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#dbe3f3] pb-3.5 md:mb-6 md:pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-8 w-1.5 shrink-0 rounded-full bg-brand"
                  />

                  <div className="min-w-0">
                    <h2 className="text-[19px] font-extrabold leading-tight tracking-tight sm:text-2xl">
                      {c.name}
                    </h2>

                    <p className="mt-0.5 text-[12.5px] text-navy/60 sm:text-[13px]">
                      {c.items.length}{" "}
                      {c.items.length === 1 ? "product" : "products"}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/${c.slug}`}
                  className="group inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-brand/30 px-3.5 text-[12.5px] font-bold text-brand transition active:scale-95 sm:px-4 sm:text-[13px] [@media(hover:hover)]:hover:bg-brand [@media(hover:hover)]:hover:text-white"
                >
                  View all
                  <Arrow className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Products grid: 2x2 on phones, scaling up on larger screens */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {c.items.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}