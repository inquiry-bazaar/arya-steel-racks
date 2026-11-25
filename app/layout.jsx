import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata = {
  title: "Arya Display Rack | Supermarket Display Racks & Shopping Trolley Manufacturer, New Delhi",
  description:
    "Arya Display Rack, New Delhi: manufacturer of supermarket display racks, gondola racks, garment racks, counters, shopping trolleys and baskets. Custom sizes, pan-India supply.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
