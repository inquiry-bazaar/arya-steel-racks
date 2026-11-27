import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MediaSlot from "./MediaSlot";
import { catalogue, categoryList } from "@/data/products";

export default function ProductCatalog() {
  return (
    <section id="catalogue" className="bg-white py-20">
      <div className="section-pad">
        <span className="eyebrow">
          <span className="h-[2px] w-5 bg-brand" /> Product Range
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[34px]">
          Shop by <span className="text-brand">Category</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categoryList.map((c) => {
            const items = catalogue.filter((p) => p.category === c.name);

            return (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition hover:shadow-xl"
              >
                <MediaSlot
                  src={c.image || items[0]?.image}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                  {items.length} products
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-base font-bold leading-snug text-white">{c.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90">
                    Explore category
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products" className="btn-orange !py-3">
            Browse all {catalogue.length} products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}