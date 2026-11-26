
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@aryadisplayrack.com",
    href: "mailto:info@aryadisplayrack.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "New Delhi, India",
    href: "#",
  },
];

export default function ContactSection({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onSubmit) {
      try {
        setLoading(true);
        await onSubmit(formData);
        setSubmitted(true);
      } catch (error) {
        console.error("Enquiry submission failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Enquiry details:", formData);
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F7F9FC] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="relative grid min-h-[760px] overflow-hidden bg-white shadow-[0_20px_70px_rgba(15,42,92,0.10)] lg:grid-cols-[43%_57%]">

          {/* LEFT CONTACT PANEL */}
          <div className="relative isolate min-h-[720px] overflow-hidden bg-[#063B80] px-7 pb-10 pt-10 text-white sm:px-10 lg:min-h-[760px] lg:px-12 lg:py-12">

            {/* Geometric background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rotate-45 bg-[#0755A8]/70" />
              <div className="absolute -right-32 top-20 h-[360px] w-[360px] rotate-45 bg-[#0053A8]/70" />
              <div className="absolute -bottom-40 -left-20 h-[400px] w-[600px] rotate-[-25deg] bg-[#002B65]" />
              <div className="absolute bottom-0 left-0 h-[190px] w-full bg-gradient-to-tr from-[#FF8A00] via-[#FF9818] to-[#FFB12C] [clip-path:polygon(0_75%,100%_0,100%_100%,0_100%)]" />
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
              <div className="mb-5 flex items-center gap-3">
                <span className="h-7 w-3 -skew-x-[25deg] bg-[#FF8617]" />
                <span className="text-sm font-bold uppercase tracking-wide">
                  Get In Touch
                </span>
              </div>

              <h2 className="text-[38px] font-extrabold italic leading-[1.12] tracking-tight sm:text-[48px] xl:text-[54px]">
                Let&apos;s Make Your
                <br />
                Retail Space
                <br />
                <span className="relative inline-block text-[#FF8A12]">
                  Work Smarter.
                  <span className="absolute -bottom-2 left-0 h-[5px] w-full -rotate-1 rounded-full bg-[#FF8A12]" />
                </span>
              </h2>

              <p className="mt-8 max-w-[420px] text-[16px] leading-[1.8] text-blue-50 sm:text-[17px]">
                From planning to installation, we&apos;re here to help you
                with the right display and storage solutions for your
                business.
              </p>
            </motion.div>

            {/* Contact details */}
            <div className="relative z-10 mt-7 max-w-[430px]">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="group flex items-center gap-5 py-3"
                  >
                    <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[20px] border border-white/10 bg-gradient-to-br from-[#3984D4] to-[#0752A4] shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#FF8617]">
                      <Icon size={33} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0 flex-1 border-b border-blue-300/20 pb-4">
                      <p className="text-[17px] font-semibold">
                        {item.label}
                      </p>
                      <p className="mt-0.5 break-words text-[18px] font-bold leading-snug sm:text-[19px]">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Rack illustration */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-full">
              <div className="relative h-[290px] sm:h-[330px] lg:h-[320px]">
                {/* Main rack image */}
                <div className="absolute bottom-0 left-0 w-[48%] max-w-[420px]">
                  <img
                    src="/images/industries/supermarket_ind.png"
                    alt="Retail supermarket display rack"
                    className="h-auto w-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Bottom message */}
                <div className="absolute bottom-8 right-4 z-10 flex max-w-[190px] items-start gap-3 text-white sm:right-8 mr-12">
                  <Clock3
                    size={39}
                    className="mt-1 shrink-0"
                    strokeWidth={2}
                  />
                  <p className="text-[16px] font-semibold leading-[1.6]">
                    Our team is ready to discuss your project.
                  </p>
                </div>
              </div>
            </div>

            {/* Zigzag divider - desktop */}
            <div className="pointer-events-none absolute right-[-1px] top-0 z-20 hidden h-full w-[90px] lg:block">
              {/* Orange outer edge */}
              <svg
                viewBox="0 0 90 760"
                preserveAspectRatio="none"
                className="h-full w-full"
                fill="none"
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

          {/* RIGHT FORM PANEL */}
          <div className="relative overflow-hidden bg-white px-6 py-12 sm:px-10 lg:px-12 xl:px-16">

            {/* Decorative background */}
            <div className="pointer-events-none absolute right-0 top-0 opacity-[0.12]">
              <svg
                width="190"
                height="200"
                viewBox="0 0 190 200"
                fill="none"
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
                className="mb-12"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-7 w-3 -skew-x-[25deg] bg-[#FF8617]" />
                  <span className="text-sm font-bold uppercase tracking-wide text-[#102D5B]">
                    Project Enquiry
                  </span>
                </div>

                <h2 className="text-[34px] font-extrabold leading-tight tracking-tight text-[#102D5B] sm:text-[44px] xl:text-[48px]">
                  Tell Us What{" "}
                  <span className="text-[#FF790C]">You Need.</span>
                </h2>

                <p className="mt-3 text-[16px] leading-relaxed text-[#52627D] sm:text-[18px]">
                  Share a few details and our team will get back to you
                  shortly.
                </p>
              </motion.div>

              {submitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <CheckCircle2
                    size={65}
                    className="mb-5 text-green-500"
                  />
                  <h3 className="text-3xl font-bold text-[#102D5B]">
                    Thank You!
                  </h3>
                  <p className="mt-3 max-w-md text-[#64748B]">
                    Your enquiry has been received. Our team will get in
                    touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 font-semibold text-[#0866B0] hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name and company */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      label="Your Name"
                      name="name"
                      placeholder="Enter your name"
                      icon={UserRound}
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <FormField
                      label="Company Name"
                      name="company"
                      placeholder="Your company"
                      icon={Building2}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email and phone */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
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
                      placeholder="+91 XXXXX XXXXX"
                      icon={Phone}
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Requirement */}
                  <div>
                    <label className="mb-3 block text-[16px] font-bold text-[#101B35]">
                      What are you looking for?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Layers3
                        size={23}
                        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                      <select
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleChange}
                        required
                        className="h-[56px] w-full appearance-none rounded-xl border border-[#C9D1DE] bg-white pl-14 pr-12 text-[16px] text-[#35445E] outline-none transition focus:border-[#0866B0] focus:ring-4 focus:ring-blue-100"
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

                      <ArrowRight
                        size={19}
                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#35445E]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-3 block text-[16px] font-bold text-[#101B35]">
                      Project Details
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={22}
                        className="absolute left-5 top-5 text-[#64748B]"
                      />

                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, space and requirements..."
                        className="w-full resize-y rounded-xl border border-[#C9D1DE] bg-white py-4 pl-14 pr-5 text-[16px] text-[#35445E] outline-none transition placeholder:text-[#7A8495] focus:border-[#0866B0] focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-[66px] w-full items-center justify-center gap-5 rounded-xl bg-gradient-to-r from-[#0860C5] to-[#0752B3] px-6 text-[18px] font-bold text-white shadow-lg shadow-blue-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:text-[21px]"
                    >
                      <Send
                        size={27}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />

                      <span>
                        {loading ? "Sending..." : "Send Your Enquiry"}
                      </span>

                      <span className="ml-1 flex h-[50px] w-[54px] items-center justify-center rounded-xl bg-[#FF850A] transition duration-300 group-hover:rotate-[-35deg] group-hover:bg-[#FF991F]">
                        <ArrowRight size={27} />
                      </span>
                    </button>

                    <p className="mt-5 text-center text-[14px] leading-relaxed text-[#64748B] sm:text-[16px]">
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
  );
}

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
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-[16px] font-bold text-[#101B35]"
      >
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Icon
          size={23}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]"
        />

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="h-[56px] w-full rounded-xl border border-[#C9D1DE] bg-white pl-14 pr-4 text-[16px] text-[#35445E] outline-none transition placeholder:text-[#7A8495] focus:border-[#0866B0] focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
