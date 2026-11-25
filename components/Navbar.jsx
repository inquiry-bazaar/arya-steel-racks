"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, LayoutGrid, Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import { catalogue, categoryList } from "@/data/products";
import MediaSlot from "./MediaSlot";

export function Logo() {
  return (
    <a href="/" className="flex flex-col leading-none">
      <span className="flex items-center text-[26px] font-extrabold tracking-tight text-navy">
        Arya <span className="ml-1.5 text-brand">Display Rack</span>
        <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4 20V6l8-3 8 3v14M4 12h16M4 16h16M12 3v17" />
        </svg>
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-navy/70">
        Manufacturer · New Delhi
      </span>
    </a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [activeCat, setActiveCat] = useState(categoryList[0].slug);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMenuOpen(false);
  }, [pathname]);

  const catProducts = useMemo(() => {
    const name = categoryList.find((c) => c.slug === activeCat)?.name;
    return catalogue.filter((p) => p.category === name);
  }, [activeCat]);
  const activeCategory = categoryList.find((c) => c.slug === activeCat);

  const isActive = (link) => {
    if (link.href === "/") return pathname === "/";
    if (link.href === "/products") return pathname !== "/"; 
    return false;
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      onMouseLeave={() => setMega(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mega ? "bg-white/95 shadow-glass backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="section-pad flex h-[84px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={() => setMega(!!link.dropdown)}
              onFocus={() => setMega(!!link.dropdown)}
              className={`relative flex items-center gap-1 text-[16.5px] font-semibold hover:text-brand ${
                isActive(link) || (link.dropdown && mega) ? "text-brand" : ""
              }`}
            >
              {link.label}
              {link.dropdown && (
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mega ? "rotate-180" : ""}`} />
              )}
              {isActive(link) && (
                <motion.span layoutId="underline" className="absolute -bottom-2 left-0 h-[2px] w-full bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="btn-orange hidden !py-3 lg:inline-flex">
          Get a Quote <ArrowRight className="h-4 w-4" />
        </Link>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mega && (
        <div className="absolute inset-x-0 top-full hidden px-4 pb-4 lg:block">
          <div className="mx-auto grid max-h-[calc(100vh-120px)] max-w-[1300px] grid-cols-[360px_1fr] gap-6 overflow-hidden rounded-b-[28px] border-t border-[#e6ecf7] bg-white p-6 shadow-[0_24px_60px_rgba(20,40,90,0.18)]">
            <div className="rounded-2xl border border-[#e6ecf7] bg-[#f6f8fc] p-4">
              <div className="flex items-center justify-between border-b border-[#e6ecf7] pb-3">
                <span className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-navy">
                  <LayoutGrid className="h-4 w-4 text-brand" /> Categories
                </span>
                <span className="rounded-full bg-[#e7ecf6] px-2.5 py-0.5 text-[12px] font-bold text-navy">
                  {categoryList.length}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {categoryList.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      onMouseEnter={() => setActiveCat(c.slug)}
                      onFocus={() => setActiveCat(c.slug)}
                      className={`flex items-center gap-3 rounded-xl p-2.5 transition ${
                        activeCat === c.slug ? "bg-navy text-white" : "bg-white text-navy hover:bg-white/70"
                      }`}
                    >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
  <MediaSlot src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-bold leading-snug">{c.name}</span>
                        <span className={`block text-[12px] ${activeCat === c.slug ? "text-white/70" : "text-navy/55"}`}>
                          {c.count} Products
                        </span>
                      </span>
                      <ArrowRight className={`h-4 w-4 shrink-0 ${activeCat === c.slug ? "text-brand" : "text-navy/40"}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[16px] font-extrabold text-navy">{activeCategory?.name}</h3>
                <div className="flex gap-4 text-[13px] font-bold">
                  <Link href={`/${activeCat}`} className="text-brand hover:underline">
                    View category
                  </Link>
                  <Link href="/products" className="text-navy hover:text-brand">
                    All products
                  </Link>
                </div>
              </div>
              <ul className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto pr-2">
                {catProducts.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-[#e6ecf7] bg-white p-3 transition hover:border-brand hover:shadow-md"
                    >
<span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-[#eef2fa] bg-white">
  <MediaSlot src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-contain p-1" />
</span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-extrabold tracking-wider text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="block text-[14px] font-semibold leading-snug text-navy">{p.title}</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-navy/60 group-hover:text-brand">
                          View Product <ArrowRight className="h-3 w-3" />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t bg-white px-6 pb-6 pt-3 lg:hidden">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <div className="flex items-center justify-between">
                  <Link href={link.href} className="block py-3 text-sm font-semibold">
                    {link.label}
                  </Link>
                  <button
                    aria-label="Show categories"
                    onClick={() => setMobileProducts(!mobileProducts)}
                    className="p-2"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileProducts ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {mobileProducts && (
                  <div className="mb-2 ml-3 border-l-2 border-brand/30 pl-3">
                    {categoryList.map((c) => (
                      <Link key={c.slug} href={`/${c.slug}`} className="block py-2 text-[13.5px] text-navy/80">
                        {c.name} <span className="text-navy/40">({c.count})</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.label} href={link.href} className="block py-3 text-sm font-semibold">
                {link.label}
              </Link>
            )
          )}
          <Link href="/#contact" className="btn-orange mt-3 w-full justify-center">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.header>
  );
}
