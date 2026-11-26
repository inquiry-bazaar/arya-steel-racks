"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { navLinks } from "@/data/content";
import { catalogue, categoryList } from "@/data/products";
import MediaSlot from "./MediaSlot";
import TopBar from "./TopBar";
import QuoteModal from "./QuoteModal";
import { FaWhatsapp } from "react-icons/fa";

// Country code + number, digits only (no +, spaces or dashes)
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // replace with your number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Arya Display Rack, I would like to know more about your products."
)}`;

export function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none p-6">
      <span className="flex items-center text-[26px] font-extrabold tracking-tight text-navy">
        Arya <span className="ml-1.5 text-brand">Display Rack</span>

        <svg
          viewBox="0 0 24 24"
          className="ml-1 h-5 w-5 text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path d="M4 20V6l8-3 8 3v14M4 12h16M4 16h16M12 3v17" />
        </svg>
      </span>

      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-navy/70">
        Manufacturer · New Delhi
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(categoryList[0]?.slug || "");

  const openQuote = () => {
    setMega(false);
    setMenuOpen(false);
    setQuoteOpen(true);
  };

  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const isProductRoute = useMemo(() => {
    if (pathname === "/products" || pathname.startsWith("/products/")) {
      return true;
    }

    const isCategoryPage = categoryList.some(
      (category) =>
        pathname === `/${category.slug}` ||
        pathname.startsWith(`/${category.slug}/`)
    );

    const isProductDetailPage = catalogue.some(
      (product) =>
        pathname === `/${product.slug}` ||
        pathname.startsWith(`/${product.slug}/`)
    );

    return isCategoryPage || isProductDetailPage;
  }, [pathname]);

  const isActive = (link) => {
    if (link.href === "/") {
      return pathname === "/";
    }

    if (link.dropdown) {
      return pathname === link.href || isProductRoute;
    }

    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  const isCategoryActive = (slug) => {
    return pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
  };

  useEffect(() => {
    const matchedCategory = categoryList.find((category) =>
      isCategoryActive(category.slug)
    );

    if (matchedCategory) {
      setActiveCat(matchedCategory.slug);
      return;
    }

    const matchedProduct = catalogue.find(
      (product) =>
        pathname === `/${product.slug}` ||
        pathname.startsWith(`/${product.slug}/`)
    );

    if (matchedProduct) {
      const productCategory = categoryList.find(
        (category) => category.name === matchedProduct.category
      );

      if (productCategory) {
        setActiveCat(productCategory.slug);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setMega(false);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMenuOpen(false);
    setMobileProducts(false);
    setQuoteOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mega) return;

    const onClick = (e) => {
      if (!e.target.closest("header")) {
        setMega(false);
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, [mega]);

  const catProducts = useMemo(() => {
    const name = categoryList.find(
      (category) => category.slug === activeCat
    )?.name;

    return catalogue.filter((product) => product.category === name);
  }, [activeCat]);

  const activeCategory = categoryList.find(
    (category) => category.slug === activeCat
  );

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      onMouseLeave={() => setMega(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mega || menuOpen
          ? "bg-white/95 shadow-glass backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`grid transition-all duration-300 ${
          scrolled ? "invisible grid-rows-[0fr]" : "visible grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <TopBar />
        </div>
      </div>

      <div className="section-pad flex h-[84px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link);

            return (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setMega(!!link.dropdown)}
                onFocus={() => setMega(!!link.dropdown)}
                aria-current={active ? "page" : undefined}
                aria-haspopup={link.dropdown ? "true" : undefined}
                className={`relative flex items-center gap-1 text-[16.5px] font-semibold transition hover:text-brand ${
                  active || (link.dropdown && mega)
                    ? "text-brand"
                    : "text-navy"
                }`}
              >
                {link.label}

                {link.dropdown && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      mega ? "rotate-180" : ""
                    }`}
                  />
                )}

                {active && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-brand"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp + Quote Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#073b1c] transition hover:bg-[#1ebe5a]"
          >
            <FaWhatsapp className="h-6 w-6 text-white" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={openQuote}
            className="btn-orange !py-3"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mega Menu */}
      {mega && (
        <div className="absolute inset-x-0 top-full hidden px-4 pb-4 lg:block">
          <div className="mx-auto grid max-h-[calc(100vh-120px)] max-w-[1300px] grid-cols-[360px_1fr] gap-6 overflow-hidden rounded-b-[28px] border-t border-[#e6ecf7] bg-white p-6 shadow-[0_24px_60px_rgba(20,40,90,0.18)]">
            {/* Categories List */}
            <div className="rounded-2xl border border-[#e6ecf7] bg-[#f6f8fc] p-4">
              <div className="flex items-center justify-between border-b border-[#e6ecf7] pb-3">
                <span className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-navy">
                  <LayoutGrid className="h-4 w-4 text-brand" />
                  Categories
                </span>

                <span className="rounded-full bg-[#e7ecf6] px-2.5 py-0.5 text-[12px] font-bold text-navy">
                  {categoryList.length}
                </span>
              </div>

              <ul className="mt-3 space-y-2">
                {categoryList.map((category) => {
                  const active =
                    activeCat === category.slug ||
                    isCategoryActive(category.slug);

                  return (
                    <li key={category.slug}>
                      <Link
                        href={`/${category.slug}`}
                        onMouseEnter={() => setActiveCat(category.slug)}
                        onFocus={() => setActiveCat(category.slug)}
                        aria-current={
                          isCategoryActive(category.slug) ? "page" : undefined
                        }
                        className={`flex items-center gap-3 rounded-xl p-2.5 transition ${
                          active
                            ? "bg-navy text-white"
                            : "bg-white text-navy hover:bg-white/70"
                        }`}
                      >
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                          <MediaSlot
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-[14.5px] font-bold leading-snug">
                            {category.name}
                          </span>

                          <span
                            className={`block text-[12px] ${
                              active ? "text-white/70" : "text-navy/55"
                            }`}
                          >
                            {category.count} Products
                          </span>
                        </span>

                        <ArrowRight
                          className={`h-4 w-4 shrink-0 ${
                            active ? "text-brand" : "text-navy/40"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Products List */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[16px] font-extrabold text-navy">
                  {activeCategory?.name}
                </h3>

                <div className="flex gap-4 text-[13px] font-bold">
                  <Link
                    href={`/${activeCat}`}
                    className="text-brand hover:underline"
                  >
                    View category
                  </Link>

                  <Link href="/products" className="text-navy hover:text-brand">
                    All products
                  </Link>
                </div>
              </div>

              <ul className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto pr-2">
                {catProducts.map((product, index) => (
                  <li key={product.slug}>
                    <Link
                      href={`/${product.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-[#e6ecf7] bg-white p-3 transition hover:border-brand hover:shadow-md"
                    >
                      <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-[#eef2fa] bg-white">
                        <MediaSlot
                          src={product.image}
                          alt={product.title}
                          className="absolute inset-0 h-full w-full object-contain p-1"
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[11px] font-extrabold tracking-wider text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="block text-[14px] font-semibold leading-snug text-navy">
                          {product.title}
                        </span>

                        <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-navy/60 group-hover:text-brand">
                          View Product
                          <ArrowRight className="h-3 w-3" />
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t bg-white px-6 pb-6 pt-3 lg:hidden">
          {navLinks.map((link) => {
            const active = isActive(link);

            return link.dropdown ? (
              <div key={link.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 text-sm font-semibold transition ${
                      active ? "text-brand" : "text-navy"
                    }`}
                  >
                    {link.label}
                  </Link>

                  <button
                    type="button"
                    aria-label="Show categories"
                    aria-expanded={mobileProducts}
                    onClick={() => setMobileProducts(!mobileProducts)}
                    className="p-2"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileProducts ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileProducts && (
                  <div className="mb-2 ml-3 border-l-2 border-brand/30 pl-3">
                    {categoryList.map((category) => {
                      const categoryActive = isCategoryActive(category.slug);

                      return (
                        <Link
                          key={category.slug}
                          href={`/${category.slug}`}
                          aria-current={categoryActive ? "page" : undefined}
                          className={`block py-2 text-[13.5px] transition ${
                            categoryActive
                              ? "font-bold text-brand"
                              : "text-navy/80 hover:text-brand"
                          }`}
                        >
                          {category.name}{" "}
                          <span
                            className={
                              categoryActive
                                ? "text-brand/70"
                                : "text-navy/40"
                            }
                          >
                            ({category.count})
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block border-l-2 py-3 pl-3 text-sm font-semibold transition ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-navy hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#073b1c]"
          >
            <FaWhatsapp size={28} aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={openQuote}
            className="btn-orange mt-3 w-full justify-center"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </motion.header>
  );
}