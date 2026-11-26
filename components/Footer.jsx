"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { navLinks } from "@/data/content";
import { Logo } from "./Navbar";

const categoryList = [
  { name: "Supermarket & Grocery", href: "/supermarket-and-grocery" },
  { name: "Garment & Apparel", href: "/garment-and-apparel" },
  { name: "Footwear, Beauty & Pharmacy", href: "/footwear-beauty-and-pharmacy" },
  { name: "Electronics, Books & Gifts", href: "/electronics-books-and-gifts" },
  { name: "Fixtures & Accessories", href: "/fixtures-and-accessories" },
  { name: "Counters, Trolleys & Baskets", href: "/counters-trolleys-and-baskets" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?viewas=100000686899395&id=61571410907364", Icon: FaFacebookF },
  { name: "Instagram", href: "https://www.instagram.com/aryadisplay/?igsh=MTJlaDFhaGgxeXl4eQ%3D%3D#", Icon: FaInstagram },
  { name: "YouTube", href: "https://www.youtube.com/@aryaindustry1074", Icon: FaYoutube },
];

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[17px] font-bold mb-6">{title}</h3>
      <ul className="space-y-[9px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors duration-300"
            >
              {link.name ?? link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  // Hide the footer on admin routes
  if (isAdmin) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
<footer className="relative bg-gray-500 text-white overflow-hidden">
      {/* Main Footer */}
      <div className="relative">
        {/* Background Watermark (decorative) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden"
        >
          <div className="text-center opacity-[0.07] whitespace-nowrap">
            <span className="block text-[130px] sm:text-[190px] lg:text-[290px] font-black leading-[0.8] tracking-[-12px]">
              ARYA
            </span>
            <span className="block text-[24px] sm:text-[45px] lg:text-[65px] font-semibold tracking-[3px]">
              STEEL RACKS
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-12 pt-12 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* About */}
            <div className="max-w-[380px]">
             <Logo/>
              <p className="text-[15px] leading-[29px] text-slate-200 pl-2 pt-2">
                Ryka Restroom Cubicles combine visual appeal with everyday
                functionality. Team Interior Solutions offers guaranteed
                customer satisfaction.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white text-[16px] hover:bg-[#e5e7eb] hover:text-[#0a1f44] transition-all duration-300"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Pages" links={navLinks} />
            <FooterColumn title="Our Categories" links={categoryList} />
            <FooterColumn title="Legal" links={legal} />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#e5e7eb] text-[#0a1f44]">
        {/* Extra padding keeps text clear of the back-to-top button */}
        <div className="max-w-[1450px] mx-auto px-6 md:pl-12 md:pr-20 pt-4 pb-20 md:pb-4 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-[13px]">
            Copyright © {new Date().getFullYear()} Ryka Restroom Cubicles. All Rights Reserved.
          </p>

          <p className="text-[13px]">
            Website Designed By{" "}
            <a
              href="https://inquirybazaar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700"
            >
              Inquiry Bazaar Pvt. Ltd. (B2B Marketplace)
            </a>
          </p>
        </div>
      </div>

      {/* Back To Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed right-5 bottom-5 z-50 w-10 h-10 rounded-full bg-[#0a1f44] text-white border border-white/60 shadow-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] transition-all text-xl"
      >
        ↑
      </button>
    </footer>
  );
}