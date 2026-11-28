import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <FloatingContact />
      <main>{children}</main>
      <Footer />
    </>
  );
}
