import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { catalogue, categoryList } from "@/data/products";

export default function Category({ category }) {
  const items = catalogue.filter((p) => p.category === category.name);

  return (
    <main>
      <Navbar />
      <section className="bg-soft pb-16 pt-28">
        <div className="section-pad">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-navy/60">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand">Products</Link>
            <span>/</span>
            <span className="font-semibold text-navy">{category.name}</span>
          </nav>
          <h1 className="mt-4 text-[34px] font-extrabold tracking-tight sm:text-[40px]">
            <span className="text-brand">{category.name}</span>
          </h1>
          <p className="mt-2 text-[15px] text-navy/70">{items.length} products</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/products" className="rounded-full border border-[#dbe3f3] bg-white px-4 py-2 text-[13px] font-semibold text-navy hover:border-brand hover:text-brand">
              All products
            </Link>
            {categoryList.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
                  c.slug === category.slug
                    ? "border-brand bg-brand text-white"
                    : "border-[#dbe3f3] bg-white text-navy hover:border-brand hover:text-brand"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}