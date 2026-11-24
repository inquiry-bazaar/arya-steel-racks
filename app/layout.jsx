import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata = {
  title: "SteelMax Racking Solutions | Retail Steel Racks",
  description:
    "Durable, space-saving and cost-effective retail steel racks. Gondola, storage, display and heavy duty racks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
