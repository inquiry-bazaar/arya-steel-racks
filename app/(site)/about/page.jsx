import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import AboutUs from "@/components/AboutUs";
import BgHeader from "@/components/BgHeader";
import MissionVision from "@/components/Mission";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function About() {
  return (
    <main>
 <BgHeader
  title="About Us"
  eyebrow="Know more about us"
  accent="#f97316"
  text="Display racks, counters, trolleys and baskets built for supermarkets, garment stores and retail shops. Pick a category or scroll through everything."
  backgroundImage="/about_bg_.webp"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About" },     
  ]}
/>
      <AboutUs/>
      <MissionVision/>
      <WhyChooseUs/>
      <FAQ />
      <CTABanner/>
    </main>
  );
}
