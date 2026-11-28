"use client";

import { usePathname } from "next/navigation";

// Shows the public header and footer everywhere except the admin panel.
export default function SiteChrome({ header, footer, children }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children;

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
