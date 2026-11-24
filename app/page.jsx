import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Industries from "@/components/Industries";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <WhyChooseUs />
      <Testimonials/>
      <Process />
      <Industries/>
      <FAQ />
      <Footer />
    </main>
  );
}
