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
import VideoShorts from "@/components/VideoShorts";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <AboutUs/>
      <ProductCatalog />
      <WhyChooseUs />
      <VideoShorts/>
      <Testimonials/>
      <Process />
      <Industries/>
      <FAQ />
      <CTABanner/>
      <Footer />
    </main>
  );
}
