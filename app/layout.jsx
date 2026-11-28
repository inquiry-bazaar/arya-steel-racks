import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata = {
  title: "Arya Display Rack | Supermarket Display Racks & Shopping Trolley Manufacturer, New Delhi",
  description: "Welcome to ARYA",
};

// Bare shell shared by the public site and the admin panel.
// Public chrome (navbar / footer / floating buttons) lives in app/(site)/layout.jsx
// so it does not render on top of /admin.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
