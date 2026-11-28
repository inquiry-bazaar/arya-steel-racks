import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Arya Display Rack | Supermarket Display Racks & Shopping Trolley Manufacturer, New Delhi",
  description: "Welcome to ARYA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar/>
      <body>{children}</body>
      <Footer/>
    </html>
  );
}
