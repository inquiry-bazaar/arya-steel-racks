"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";

export function Logo() {
  return (
    <a href="/" className="flex flex-col leading-none">
      <span className="flex items-center text-[26px] font-extrabold tracking-tight text-navy">
        Arya &nbsp; <span className="text-brand"> Insulation</span>
        <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4 20V6l8-3 8 3v14M4 12h16M4 16h16M12 3v17" />
        </svg>
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-navy/70">
        Racking Solutions
      </span>
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  // add a white background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-glass backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="section-pad flex h-[84px] items-center justify-between">
        <Logo />

        {/* desktop menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="relative flex items-center gap-1 text-[16.5px] font-semibold hover:text-brand"
            >
              {link.label}
              {link.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
              {active === link.label && (
                <motion.span layoutId="underline" className="absolute -bottom-2 left-0 h-[2px] w-full bg-brand" />
              )}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-orange hidden !py-3 lg:inline-flex">
          Get a Quote <ArrowRight className="h-4 w-4" />
        </a>

        {/* mobile menu button */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="border-t bg-white px-6 pb-6 pt-3 lg:hidden">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-orange mt-3 w-full justify-center">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </motion.header>
  );
}
