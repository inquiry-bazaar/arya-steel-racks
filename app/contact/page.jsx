import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import AboutUs from "@/components/AboutUs";
import BgHeader from "@/components/BgHeader";
import MissionVision from "@/components/Mission";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";

export default function About() {
  return (
    <main>
 <BgHeader
  title="Contact Us"
  eyebrow="Know more about us"
  accent="#f97316"
  text="Display racks, counters, trolleys and baskets built for supermarkets, garment stores and retail shops. Pick a category or scroll through everything."
  backgroundImage="/products_hero.webp"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Contact" },     
  ]}
/>
  <ContactSection/>
      <CTABanner/>
    </main>
  );
}
