"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { navLinks } from "@/data/content";
import { Logo } from "./Navbar";
import { categoryList } from "@/data/products";

const contact = {
  address: "Arya Industry Ground Floor Plote AT Kh No-13. 18/1 And 8 G Near Cocacola Factory Najafgarh South West Delhi-110043",
  phone: "+91 8587901795",
  email: "aryaindustry36@gmail.com",
  whatsapp: "+918587901795",
  whatsappMessage: "Hello, I would like to know more about your display racks.",
};
// categoryList items have { name, slug }, so build the hrefs the footer needs
const categoryLinks = categoryList.slice(0,7).map((c) => ({
  name: c.name,
  href: `/${c.slug}`,
}));
const contactItems = [
  {
    label: "Location",
    value: contact.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`,
    Icon: FaMapMarkerAlt,
    external: true,
  },
  {
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    Icon: FaPhoneAlt,
  },
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: FaEnvelope,
  },
];

const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

// const categoryList = [
//   { name: "Supermarket & Grocery", href: "/supermarket-and-grocery" },
//   { name: "Garment & Apparel", href: "/garment-and-apparel" },
//   { name: "Footwear, Beauty & Pharmacy", href: "/footwear-beauty-and-pharmacy" },
//   { name: "Electronics, Books & Gifts", href: "/electronics-books-and-gifts" },
//   { name: "Fixtures & Accessories", href: "/fixtures-and-accessories" },
//   { name: "Counters, Trolleys & Baskets", href: "/counters-trolleys-and-baskets" },
// ];

const legal = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Arya-Industries/61571410907364/",
    Icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aryadisplay/?igsh=MTJlaDFhaGgxeXl4eQ%3D%3D#",
    Icon: FaInstagram,
  },
  { name: "YouTube", href: "https://www.youtube.com/@aryaindustry1074", Icon: FaYoutube },
];

/*
  Design tokens (light theme)
  surface  #f5f7fa  light steel background
  bar      #e5e7eb  bottom bar
  navy     #0a1f44  headings, icons, buttons
  body     #475569  paragraph / link text (slate-600)
  amber    #f5b301  accent: beam, underlines, hover fills (never used as text on light)
*/

const headingClass =
  "text-[16px] font-semibold text-[#0a1f44] mb-5 pb-3 border-b-2 border-[#f5b301] inline-block";

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className={headingClass}>{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-[14px] text-slate-600 hover:text-[#0a1f44] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] rounded-sm"
            >
              <span
                aria-hidden="true"
                className="h-0.5 w-0 bg-[#f5b301] transition-all duration-200 group-hover:w-3"
              />
              {link.name ?? link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactColumn() {
  return (
    <div>
      <h3 className={headingClass}>Contact Us</h3>
      <address className="not-italic">
        <ul className="space-y-4">
          {contactItems.map(({ label, value, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex items-start gap-3 text-[14px] leading-6 text-slate-600 hover:text-[#0a1f44] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] rounded-sm"
              >
                <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-white border border-slate-300 text-[#0a1f44] group-hover:bg-[#f5b301] group-hover:border-[#f5b301] transition-colors duration-200">
                  <Icon aria-hidden="true" />
                </span>
                <span className="min-w-0 break-words pt-1.5">
                  <span className="sr-only">{label}: </span>
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </address>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-[14px] font-semibold text-[#0a1f44] hover:bg-[#1ebe5a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2"
      >
        <FaWhatsapp aria-hidden="true" className="text-[20px]" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the footer on admin routes
  if (isAdmin) return null;

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative bg-[#f5f7fa] text-slate-600 overflow-hidden">
      {/* Safety-yellow beam along the top edge */}
      <div aria-hidden="true" className="h-1.5 w-full bg-[#f5b301]" />

      {/* Perforated rack-upright pattern (decorative) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #0a1f44 1.5px, transparent 2px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
        }}
      />

      {/* Watermark (decorative) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden"
      >
        <div className="text-center whitespace-nowrap">
          <span
            className="block text-[130px] sm:text-[190px] lg:text-[290px] font-black leading-[0.8] tracking-[-12px] text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(10,31,68,0.08)" }}
          >
            ARYA
          </span>
          <span
            className="block text-[24px] sm:text-[45px] lg:text-[65px] font-semibold tracking-[3px] text-transparent"
            style={{ WebkitTextStroke: "1px rgba(10,31,68,0.08)" }}
          >
            STEEL RACKS
          </span>
        </div>
      </div>

{/* Main content */}
<div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-12 pt-16 pb-14">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.35fr_1fr_1.35fr] gap-12 lg:gap-6 xl:gap-10">
    {/* About */}
    <div className="sm:col-span-2 lg:col-span-1 max-w-[400px]">
      <Logo />
      <p className="mt-5 text-[15px] leading-7 text-slate-600">
        Arya Industry is India’s leading manufacturer and supplier of premium-quality Supermarket Display Racks, Wooden Rack, Vegetable Rack, Grocery Display Rack, Slotted Angle Rack, Shopping Trolley and Basket, Cash Counter, Bingo Rack, Snacks Rack, Industrial Storage, and more. Optimize your store space with Arya Industry’s exclusive range of supermarket racks.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-7">
        {socials.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-slate-300 text-[#0a1f44] text-[15px] hover:bg-[#f5b301] hover:border-[#f5b301] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f7fa]"
          >
            <Icon aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>

    <FooterColumn title="Pages" links={navLinks} />
<FooterColumn title="Our Categories" links={categoryLinks} />
    <FooterColumn title="Legal" links={legal} />

    <div className="sm:col-span-2 lg:col-span-1">
      <ContactColumn />
    </div>
  </div>
</div>

      {/* Bottom bar */}
      <div className="relative z-10 bg-[#e5e7eb] border-t border-slate-300">
        <div className="max-w-[1450px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-[13px] text-slate-600">
            Copyright © {new Date().getFullYear()} Ryka Restroom Cubicles. All
            rights reserved.
          </p>

          <p className="text-[13px] text-slate-600 md:pr-14">
            Website designed by{" "}
            <a
              href="https://inquirybazaar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a1f44] font-medium underline underline-offset-4 decoration-[#f5b301] decoration-2 hover:bg-[#f5b301]/30 transition-colors"
            >
              Inquiry Bazaar Pvt. Ltd. (B2B Marketplace)
            </a>
          </p>
        </div>
      </div>

      {/* Back to top: appears after scrolling */}
      {/* <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-5 bottom-5 z-50 w-11 h-11 rounded-md bg-[#0a1f44] text-[#f5b301] shadow-lg flex items-center justify-center hover:bg-[#f5b301] hover:text-[#0a1f44] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <FaArrowUp aria-hidden="true" />
      </button> */}
    </footer>
  );
}