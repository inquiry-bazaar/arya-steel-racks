"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import MediaSlot from "./MediaSlot";
import { catalogue, categories } from "@/data/products";
import { company } from "@/data/content";

// Full list of the approved products, filterable by category
export default function ProductCatalog() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? catalogue : catalogue.filter((p) => p.category === active);

  return (
    <section id="catalogue" className="bg-white py-20">
      <div className="section-pad">
        <span className="eyebrow">
          <span className="h-[2px] w-5 bg-brand" /> All Products
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[34px]">
          Complete <span className="text-brand">Product Range</span>
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
                active === c ? "border-brand bg-brand text-white" : "border-[#dbe3f3] bg-white text-navy hover:border-brand"
              }`}
            >
              {c}
              <span className="ml-1.5 opacity-70">
                {c === "All" ? catalogue.length : catalogue.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {list.map((p) => (
            <article key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-[#e6ecf7] bg-white shadow-[0_8px_24px_rgba(30,55,110,0.06)]">
              <div className="aspect-square bg-[#f4f7fc]">
                <MediaSlot src={p.image} alt={p.title} className="h-full w-full object-contain p-2" />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-[14.5px] font-extrabold leading-snug text-navy">{p.title}</h3>
                <p className="mt-1 text-[12px] text-navy/60">{p.subtitle}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-relaxed text-navy/75">{p.desc}</p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-[12.5px] font-bold text-white"
                >
                  <Phone className="h-3.5 w-3.5" /> Get Best Quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
