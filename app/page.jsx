import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Industries from "@/components/Industries";
import ProductCatalog from "@/components/ProductCatalog";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <ProductCatalog />
      <WhyChooseUs />
      <Testimonials/>
      <Process />
      <Industries/>
      <FAQ />
      <CTABanner/>
      <Footer />
    </main>
  );
}
