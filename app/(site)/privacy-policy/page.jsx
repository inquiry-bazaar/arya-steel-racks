import BgHeader from "@/components/BgHeader";
import Link from "next/link";

const COMPANY = "ARYA INDUSTRY STEEL RACKS";
const EMAIL = "info@arya.com";
const PHONE = "+91 00000 00000";
const ADDRESS = "[Your business address]";
const UPDATED = "26 November 2026";

export const metadata = {
  title: `Privacy Policy | ${COMPANY}`,
  description: `How ${COMPANY} collects, uses and protects your information.`,
};

const sections = [
  {
    title: "Information We Collect",
    text: "We may collect the following information:",
    list: [
      "Name, phone number, email address and company name that you submit through our forms",
      "Details of your enquiry or product requirements",
      "Technical data such as IP address, browser type and pages visited",
    ],
  },
  {
    title: "How We Use Your Information",
    list: [
      "To respond to enquiries and send quotations",
      "To provide our products and services",
      "To improve our website",
      "To send updates where you have agreed to receive them",
      "To meet legal obligations",
    ],
  },
  {
    title: "Cookies",
    text: "Our website may use cookies and similar technologies to run the site and understand how it is used. You can control cookies through your browser settings.",
  },
  {
    title: "Sharing of Information",
    text: "We do not sell your personal information. We may share it with service providers who help us run our website and business, or with authorities when the law requires it.",
  },
  {
    title: "Data Security and Retention",
    text: "We take reasonable steps to protect your information, but no method of transmission or storage is completely secure. We keep information only as long as needed for the purposes above or as required by law.",
  },
  {
    title: "Your Rights",
    text: "You may ask to access, correct or delete your personal information, or withdraw your consent, by contacting us.",
  },
  {
    title: "Third-Party Links",
    text: "Our website may link to other websites. We are not responsible for their privacy practices.",
  },
  {
    title: "Changes to This Policy",
    text: "We may update this policy from time to time. Changes will be posted on this page with a new date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50 text-slate-700">
     <BgHeader
        title="Privacy Policy"
        eyebrow="Your privacy matters to us"
        accent="#f97316"
        text="No spam, ever. View our Privacy Policy for details on how we handle your information."
        backgroundImage="/products_hero.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },     
        ]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 leading-7">
        <p>
          {COMPANY} respects your privacy. This policy explains how we handle
          your information when you use our website.
        </p>

        {sections.map((section, index) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-[#0a1f44] mb-3">
              {index + 1}. {section.title}
            </h2>
            {section.text && <p>{section.text}</p>}
            {section.list && (
              <ul className="list-disc pl-6 mt-2 space-y-1">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0a1f44] mb-3">Contact Us</h2>
          <p>{COMPANY}</p>
          <p>{ADDRESS}</p>
          <p>Email: <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a></p>
          <p>Phone: {PHONE}</p>
        </section>

        <p>
          Read our{" "}
          <Link href="/terms-and-conditions" className="underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </div>
    </main>
  );
}