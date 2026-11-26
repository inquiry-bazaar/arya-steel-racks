import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
// optionally also WhatsAppIcon if you want it global

export const metadata = {
  title: "Arya Display Rack | Supermarket Display Racks & Shopping Trolley Manufacturer, New Delhi",
  description: "Welcome to ARYA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <FloatingContact/>
        <main>{children}</main>
        <Footer />
        {/* <WhatsAppIcon /> if you want it on every page */}
      </body>
    </html>
  );
}