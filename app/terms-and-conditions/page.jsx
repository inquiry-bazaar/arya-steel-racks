import BgHeader from "@/components/BgHeader";
import Link from "next/link";

const COMPANY = "Ryka Restroom Cubicles";
const EMAIL = "info@example.com";
const CITY = "[Your city]";
const UPDATED = "26 November 2026";

export const metadata = {
  title: `Terms & Conditions | ${COMPANY}`,
  description: `Terms for using the ${COMPANY} website and services.`,
};

const sections = [
  {
    title: "Acceptance of Terms",
    text: "By using this website, you agree to these terms. If you do not agree, please do not use the website.",
  },
  {
    title: "Products and Services",
    text: "Product images, colours, sizes and specifications are for general reference. Actual products may differ, and we may change or discontinue them without notice.",
  },
  {
    title: "Quotations and Orders",
    text: "Prices and timelines are as stated in our written quotation. An order is confirmed only when we accept it in writing.",
  },
  {
    title: "Payment, Delivery and Installation",
    text: "Payment, delivery and installation terms are as set out in the quotation or invoice. Delivery dates are estimates unless agreed otherwise in writing.",
  },
  {
    title: "Cancellations, Returns and Warranty",
    text: "Cancellation, return and warranty terms depend on the product and are stated in your quotation or invoice. Custom-made items may not be cancellable once production starts.",
  },
  {
    title: "Intellectual Property",
    text: "The content on this website, including text, images and logos, belongs to us or our licensors and may not be used without permission.",
  },
  {
    title: "Acceptable Use",
    text: "You must not misuse the website, attempt unauthorised access, introduce harmful code or submit false information.",
  },
  {
    title: "Limitation of Liability",
    text: "To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website.",
  },
  {
    title: "Governing Law",
    text: `These terms are governed by the laws of India. Courts in ${CITY} will have jurisdiction.`,
  },
  {
    title: "Changes to These Terms",
    text: "We may update these terms from time to time. Changes will be posted on this page.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-slate-50 text-slate-700">
   <BgHeader
    title="Terms & Conditions"
    eyebrow="These terms govern your access to and use of ARYA INDUSTRY services."
    accent="#f97316"
    text="While using the website, you agree to be bound by these terms."
    backgroundImage="/products_hero.webp"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Terms & Condition" },     
    ]}
  />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 leading-7">
        {sections.map((section, index) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-[#0a1f44] mb-3">
              {index + 1}. {section.title}
            </h2>
            <p>{section.text}</p>
          </section>
        ))}

        <p>
          Questions? Email{" "}
          <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> or read our{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}