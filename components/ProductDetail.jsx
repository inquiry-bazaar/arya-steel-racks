import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Phone, Truck, Settings, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaSlot from "@/components/MediaSlot";
import { catalogue, categoryList } from "@/data/products";
import { company } from "@/data/content";

export default function ProductDetail({ product }) {
  const category = categoryList.find((c) => c.name === product.category);
  const related = catalogue.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const wa = `https://wa.me/${company.phoneHref.replace("+", "")}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${product.title}.`
  )}`;

  const details = [
    { icon: Settings, label: "Customization", value: "Available on request" },
    { icon: Truck, label: "Delivery", value: "7 to 10 days, shipped by road" },
    { icon: ShieldCheck, label: "Quality", value: "Tested for rust resistance, strength and finish" },
    { icon: MapPin, label: "Made in", value: "New Delhi, supplied across India" },
  ];

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
            <Link href={`/${category.slug}`} className="hover:text-brand">{product.category}</Link>
            <span>/</span>
            <span className="font-semibold text-navy">{product.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#e6ecf7] bg-white p-4 shadow-[0_12px_30px_rgba(30,55,110,0.08)]">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[#f4f7fc]">
                <MediaSlot src={product.image} alt={product.title} className="h-full w-full object-contain p-4" />
              </div>
            </div>

            <div>
              <Link href={`/${category.slug}`} className="eyebrow hover:underline">
                <span className="h-[2px] w-5 bg-brand" /> {product.category}
              </Link>
              <h1 className="mt-3 text-[34px] font-extrabold leading-tight tracking-tight sm:text-[40px]">{product.title}</h1>
              <p className="mt-2 text-[15px] font-semibold text-brand">{product.subtitle}</p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-navy/80">{product.desc}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-navy/80">
                Made by {company.name} with high-quality raw material and a powder-coated or perfect finish. Sizes, shelf count and colour can be customized to your store.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3 rounded-2xl border border-[#e6ecf7] bg-white p-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-wide text-navy/50">{label}</span>
                      <span className="block text-[14px] font-semibold text-navy">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`tel:${company.phoneHref}`} className="btn-orange">
                  <Phone className="h-4 w-4" /> Call {company.phone}
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-navy">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Quote
                </a>
              </div>

              <Link href={`/${category.slug}`} className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-navy hover:text-brand">
                <ArrowLeft className="h-4 w-4" /> Back to {product.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="section-pad">
            <h2 className="text-2xl font-extrabold tracking-tight">
              More in <Link href={`/${category.slug}`} className="text-brand hover:underline">{product.category}</Link>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#e6ecf7] bg-white shadow-[0_8px_24px_rgba(30,55,110,0.06)] transition hover:-translate-y-1"
                >
                  <div className="aspect-square bg-[#f4f7fc]">
                    <MediaSlot src={p.image} alt={p.title} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <h3 className="text-[14px] font-extrabold leading-snug text-navy">{p.title}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}