import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// optionally also WhatsAppIcon if you want it global

export const metadata = {
  title: "Arya Display Rack | Supermarket Display Racks & Shopping Trolley Manufacturer, New Delhi",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* <WhatsAppIcon /> if you want it on every page */}
      </body>
    </html>
  );
}