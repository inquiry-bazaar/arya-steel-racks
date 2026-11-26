"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { catalogue, categoryList } from "@/data/products";

const SHOWN = 8;

export default function ProductCatalog() {
  const [slug, setSlug] = useState(categoryList[0].slug);
  const category = categoryList.find((c) => c.slug === slug);
  const items = catalogue.filter((p) => p.category === category.name);

  return (
    <section id="catalogue" className="bg-white py-20">
      <div className="section-pad">
        <span className="eyebrow">
          <span className="h-[2px] w-5 bg-brand" /> Product Range
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[34px]">
          Popular <span className="text-brand">Display Racks</span>
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {categoryList.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSlug(c.slug)}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
                slug === c.slug
                  ? "border-brand bg-brand text-white"
                  : "border-[#dbe3f3] bg-white text-navy hover:border-brand"
              }`}
            >
              {c.name} <span className="ml-1 opacity-70">{c.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.slice(0, SHOWN).map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${category.slug}`} className="btn-orange !py-3">
            {items.length > SHOWN ? `View All ${items.length} in ${category.name}` : `View ${category.name}`}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/products" className="text-[14px] font-bold text-navy hover:text-brand">
            Browse all {catalogue.length} products
          </Link>
        </div>
      </div>
    </section>
  );
}