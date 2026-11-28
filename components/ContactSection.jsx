"use client";

import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Layers3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  UserRound,
} from "lucide-react";
import axios from "axios";

const requirements = [
  "Supermarket & Grocery Racks",
  "Garment & Apparel Racks",
  "Footwear, Beauty & Pharmacy Racks",
  "Electronics, Books & Gift Racks",
  "Fixtures & Accessories",
  "Counters, Trolleys & Baskets",
  "Custom Display Rack Solutions",
];

const contactDetails = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+918587901795",
    href: "tel:+918587901795",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "aryaindustry36@gmail.com",
    href: "mailto:aryaindustry36@gmail.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "New Delhi, India",
    href: "https://maps.app.goo.gl/tZeM2MWPVeogfQP29",
  },
];

const initialFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requirement: "",
  message: "",
};

// Hover effects only on devices that actually hover (no "stuck" hover after a tap)
const HOVER = "[@media(hover:hover)]";

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { name, company, email, phone, requirement, message } = formData;

    try {
      const websiteUrl = window.location.hostname + window.location.pathname;

      const payload = {
        platform: websiteUrl,
        platformEmail: "aryaindustry36@gmail.com",
        supplierToken: "6a29506d0dd27bd1398dd5f8",
        name,
        phone,
        email,
        place: "N/A",
        product: requirement,
        // The payload has no company field, so it goes in the message
        message: `Company: ${company || "N/A"}\n${message || "N/A"}`,
      };

      const { data } = await axios.post(
        "https://brandbnalo.com/api/form/add",
        payload
      );

      if (!data?.success) {
        setStatus("❌ Failed to send. Please try again.");
        return;
      }

      const whatsappText = `Hi, I am ${name}.

Company: ${company || "N/A"}
Email: ${email}
Product: ${requirement}

Message: ${message || "N/A"}

Contact: ${phone}`;

      const waUrl = `https://wa.me/918587901795?text=${encodeURIComponent(
        whatsappText
      )}`;

      setWhatsappUrl(waUrl);
      setSubmitted(true);
      setFormData(initialFormData);

      setTimeout(() => {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }, 1000);
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setStatus("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // MotionConfig: skips the entrance animations for people who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className="relative overflow-hidden bg-[#F7F9FC] py-8 sm:py-12 md:py-20"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="relative grid overflow-hidden bg-white shadow-[0_20px_70px_rgba(15,42,92,0.10)] lg:min-h-[760px] lg:grid-cols-[43%_57%]">

            {/* ===================== LEFT CONTACT PANEL ===================== */}
            <div className="relative isolate flex flex-col overflow-hidden bg-[#063B80] px-5 pt-9 text-white sm:px-10 sm:pt-12 lg:min-h-[760px] lg:px-10 lg:pb-12 lg:pt-12 xl:px-12">

              {/* Geometric background */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rotate-45 bg-[#0755A8]/70" />
                <div className="absolute -right-32 top-20 h-[360px] w-[360px] rotate-45 bg-[#0053A8]/70" />
                <div className="absolute -bottom-40 -left-20 h-[400px] w-[600px] rotate-[-25deg] bg-[#002B65]" />
                <div className="absolute bottom-0 left-0 h-[140px] w-full bg-gradient-to-tr from-[#FF8A00] via-[#FF9818] to-[#FFB12C] [clip-path:polygon(0_75%,100%_0,100%_100%,0_100%)] sm:h-[190px]" />
                <div className="absolute right-[-100px] top-[35%] h-[300px] w-[300px] rounded-full border border-white/10" />
                <div className="absolute right-[-65px] top-[39%] h-[230px] w-[230px] rounded-full border border-white/10" />
                <div className="absolute bottom-36 left-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
              </div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative z-10 max-w-[480px]"
              >
                <div className="mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="h-6 w-2.5 -skew-x-[25deg] bg-[#FF8617] sm:h-7 sm:w-3" />
                  <span className="text-[13px] font-bold uppercase tracking-wide sm:text-sm">
                    Get In Touch
                  </span>
                </div>

                <h2 className="text-[30px] font-extrabold italic leading-[1.15] tracking-tight sm:text-[44px] lg:text-[38px] xl:text-[48px] 2xl:text-[54px]">
                  Let&apos;s Make Your
                  <br />
                  Retail Space
                  <br />
                  <span className="relative inline-block text-[#FF8A12]">
                    Work Smarter.
                    <span className="absolute -bottom-1.5 left-0 h-[4px] w-full -rotate-1 rounded-full bg-[#FF8A12] sm:-bottom-2 sm:h-[5px]" />
                  </span>
                </h2>

                <p className="mt-6 max-w-[420px] text-[15px] leading-[1.75] text-blue-50 sm:mt-8 sm:text-[17px] sm:leading-[1.8]">
                  From planning to installation, we&apos;re here to help you
                  with the right display and storage solutions for your
                  business.
                </p>
              </motion.div>

              {/* Contact details */}
              <div className="relative z-10 mt-6 w-full max-w-[430px] sm:mt-7">
                {contactDetails.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      {...(item.label === "Visit Us"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="group flex items-center gap-4 py-2.5 sm:gap-5 sm:py-3"
                    >
                      <div
                        className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#3984D4] to-[#0752A4] shadow-lg transition duration-300 sm:h-[64px] sm:w-[64px] sm:rounded-[20px] lg:h-[60px] lg:w-[60px] xl:h-[68px] xl:w-[68px] ${HOVER}:group-hover:-translate-y-1 ${HOVER}:group-hover:bg-[#FF8617]`}
                      >
                        <Icon
                          strokeWidth={2.2}
                          className="h-6 w-6 sm:h-[30px] sm:w-[30px] xl:h-[33px] xl:w-[33px]"
                        />
                      </div>

                      <div className="min-w-0 flex-1 border-b border-blue-300/20 pb-3 sm:pb-4">
                        <p className="text-[14px] font-semibold text-blue-100 sm:text-[16px] sm:text-white">
                          {item.label}
                        </p>
                        <p className="mt-0.5 break-words text-[16px] font-bold leading-snug sm:text-[19px]">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Rack illustration + message
                  Phones/tablets: sits in the normal flow under the contact details.
                  Desktop (lg): pinned to the bottom of the panel. */}
              <div className="pointer-events-none relative z-0 mt-6 h-[210px] w-full sm:mt-8 sm:h-[280px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[320px]">
                <div className="absolute bottom-0 left-[-12px] w-[48%] max-w-[240px] sm:left-[-24px] sm:max-w-[300px] lg:left-0 lg:max-w-[420px]">
                  <img
                    src="/images/industries/supermarket_ind.png"
                    alt="Retail supermarket display rack"
                    loading="lazy"
                    className="h-auto w-full object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="absolute bottom-6 right-0 z-10 flex max-w-[150px] items-start gap-2.5 text-white sm:bottom-9 sm:max-w-[210px] sm:gap-3 lg:right-10">
                  <Clock3
                    strokeWidth={2}
                    className="mt-0.5 h-7 w-7 shrink-0 sm:mt-1 sm:h-10 sm:w-10"
                  />
                  {/* <p className="text-[13px] font-semibold leading-[1.5] sm:text-[16px] sm:leading-[1.6]">
                    Our team is ready to discuss your project.
                  </p> */}
                </div>
              </div>

              {/* Zigzag divider (desktop only) */}
              <div className="pointer-events-none absolute right-[-1px] top-0 z-20 hidden h-full w-[90px] lg:block">
                <svg
                  viewBox="0 0 90 760"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M90 0 L22 145 L83 262 L5 453 L80 568 L8 750 L90 760"
                    stroke="#FF8A12"
                    strokeWidth="13"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M80 0 L12 145 L73 262 L-5 453 L70 568 L-2 750"
                    stroke="white"
                    strokeWidth="9"
                    strokeLinejoin="miter"
                  />
                </svg>
              </div>
            </div>

            {/* ===================== RIGHT FORM PANEL ===================== */}
            <div className="relative overflow-hidden bg-white px-5 py-10 sm:px-10 sm:py-12 lg:px-12 lg:pl-16 xl:px-16 xl:pl-20">

              {/* Decorative background */}
              <div className="pointer-events-none absolute right-0 top-0 opacity-[0.12]">
                <svg
                  viewBox="0 0 190 200"
                  fill="none"
                  aria-hidden="true"
                  className="h-auto w-[100px] sm:w-[190px]"
                >
                  <path
                    d="M30 160V40L120 10L160 25V170M30 70L160 55M30 105L160 90M30 140L160 125M65 28V160M100 18V160M135 20V165"
                    stroke="#0866B0"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="relative z-10 mx-auto max-w-[760px]">

                {/* Form heading */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="mb-8 sm:mb-12"
                >
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <span className="h-6 w-2.5 -skew-x-[25deg] bg-[#FF8617] sm:h-7 sm:w-3" />
                    <span className="text-[13px] font-bold uppercase tracking-wide text-[#102D5B] sm:text-sm">
                      Project Enquiry
                    </span>
                  </div>

                  <h2 className="text-[28px] font-extrabold leading-tight tracking-tight text-[#102D5B] sm:text-[40px] xl:text-[48px]">
                    Tell Us What{" "}
                    <span className="text-[#FF790C]">You Need.</span>
                  </h2>

                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#52627D] sm:mt-3 sm:text-[18px]">
                    Share a few details and our team will get back to you
                    shortly.
                  </p>
                </motion.div>

                {submitted ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center text-center sm:min-h-[400px]">
                    <CheckCircle2
                      className="mb-5 h-14 w-14 text-green-500 sm:h-[65px] sm:w-[65px]"
                    />
                    <h3 className="text-2xl font-bold text-[#102D5B] sm:text-3xl">
                      Thank You!
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] text-[#64748B] sm:text-base">
                      Your enquiry has been received. Our team will get in
                      touch with you shortly.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-xl bg-green-600 px-6 font-semibold text-white transition active:scale-[0.98] ${HOVER}:hover:bg-green-700`}
                    >
                      Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-5 min-h-[44px] px-4 font-semibold text-[#0866B0] hover:underline sm:mt-6"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Name and company */}
                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <FormField
                        label="Your Name"
                        name="name"
                        placeholder="Enter your name"
                        icon={UserRound}
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />

                      <FormField
                        label="Company Name"
                        name="company"
                        placeholder="Your company"
                        icon={Building2}
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email and phone */}
                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        icon={Mail}
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />

                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+91 XXXXX XXXXX"
                        icon={Phone}
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Requirement */}
                    <div>
                      <label htmlFor="requirement" className={labelClass}>
                        What are you looking for?{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Layers3 className={`${iconClass} top-1/2 -translate-y-1/2`} />

                        <select
                          id="requirement"
                          name="requirement"
                          value={formData.requirement}
                          onChange={handleChange}
                          required
                          className={`${inputClass} appearance-none pr-11 sm:pr-12`}
                        >
                          <option value="" disabled>
                            Select your requirement
                          </option>
                          {requirements.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>

                        <ArrowRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-[#35445E] sm:right-5 sm:h-[19px] sm:w-[19px]" />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Project Details
                      </label>

                      <div className="relative">
                        <MessageSquare className={`${iconClass} top-4 sm:top-5`} />

                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project, space and requirements..."
                          className="w-full resize-y rounded-xl border border-[#C9D1DE] bg-white py-3.5 pl-12 pr-4 text-[16px] text-[#35445E] outline-none transition placeholder:text-[#7A8495] focus:border-[#0866B0] focus:ring-4 focus:ring-blue-100 sm:py-4 sm:pl-14 sm:pr-5"
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    {status && (
                      <p
                        role="alert"
                        className="text-center text-[15px] font-semibold text-red-600"
                      >
                        {status}
                      </p>
                    )}

                    {/* Submit button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0860C5] to-[#0752B3] px-4 text-[16px] font-bold text-white shadow-lg shadow-blue-900/10 transition duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[66px] sm:gap-5 sm:px-6 sm:text-[21px] ${HOVER}:hover:-translate-y-1 ${HOVER}:hover:shadow-xl`}
                      >
                        <Send
                          className={`h-5 w-5 shrink-0 transition-transform duration-300 sm:h-[27px] sm:w-[27px] ${HOVER}:group-hover:-translate-y-1 ${HOVER}:group-hover:translate-x-1`}
                        />

                        <span className="whitespace-nowrap">
                          {loading ? "Sending..." : "Send Your Enquiry"}
                        </span>

                        <span
                          className={`ml-0.5 flex h-10 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FF850A] transition duration-300 sm:ml-1 sm:h-[50px] sm:w-[54px] sm:rounded-xl ${HOVER}:group-hover:rotate-[-35deg] ${HOVER}:group-hover:bg-[#FF991F]`}
                        >
                          <ArrowRight className="h-5 w-5 sm:h-[27px] sm:w-[27px]" />
                        </span>
                      </button>

                      <p className="mt-4 text-center text-[13px] leading-relaxed text-[#64748B] sm:mt-5 sm:text-[16px]">
                        By submitting, you agree to be contacted regarding
                        your enquiry.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Bottom corner decoration */}
              <div className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-72 rotate-[-20deg] rounded-full bg-[#EAF2FC]" />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ---------- Shared field styles (smaller on phones, original size from sm up) ---------- */
const labelClass =
  "mb-2 block text-[15px] font-bold text-[#101B35] sm:mb-3 sm:text-[16px]";

const iconClass =
  "pointer-events-none absolute left-4 h-5 w-5 text-[#64748B] sm:left-5 sm:h-[23px] sm:w-[23px]";

// 16px text on phones also stops iOS Safari from zooming into the field on focus
const inputClass =
  "h-[52px] w-full rounded-xl border border-[#C9D1DE] bg-white pl-12 pr-4 text-[16px] text-[#35445E] outline-none transition placeholder:text-[#7A8495] focus:border-[#0866B0] focus:ring-4 focus:ring-blue-100 sm:h-[56px] sm:pl-14";

/* Reusable form field */
function FormField({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Icon className={`${iconClass} top-1/2 -translate-y-1/2`} />

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClass}
          {...rest}
        />
      </div>
    </div>
  );
}