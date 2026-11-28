"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { categoryList } from "@/data/products";

const products = categoryList.map((category) => category.name);

const highlights = [
  "Direct from the manufacturer",
  "Custom sizes and designs",
  "Bulk order support",
  "Based in New Delhi",
];

const IMAGE_SRC = "/departmental_racks.webp";

const field =
  "w-full rounded-xl border border-brand-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function QuoteModal({ open, onClose, product }) {
  const productOptions =
    product && !products.includes(product) ? [product, ...products] : products;

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const whatsappTimer = useRef(null);
  const closeTimer = useRef(null);
  const session = useRef(0); // changes each time the modal closes

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Clear timers when the modal closes or unmounts
  useEffect(() => {
    if (!open) return;

    return () => {
      session.current += 1;
      clearTimeout(whatsappTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, [open]);

  // Reset form state after closing
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSent(false);
        setLoading(false);
        setStatus("");
        setWhatsappUrl("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    const currentSession = session.current;

    setLoading(true);
    setStatus("");

    const {
      name,
      company,
      phone,
      email,
      product: selectedProduct,
      quantity,
      message,
    } = form;

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
        product: selectedProduct,
        // The payload has no company or quantity fields
        message: `Company: ${company || "N/A"}
Quantity: ${quantity || "N/A"}
${message || "N/A"}`,
      };

      const { data } = await axios.post(
        "https://brandbnalo.com/api/form/add",
        payload
      );

      // Ignore the response if the modal was closed meanwhile
      if (currentSession !== session.current) return;

      if (!data?.success) {
        setStatus("❌ Failed to send. Please try again.");
        return;
      }

      const whatsappText = `Hi, I am ${name}.

Company: ${company || "N/A"}
Email: ${email}
Product: ${selectedProduct}
Quantity: ${quantity || "N/A"}

Message: ${message || "N/A"}

Contact: ${phone}`;

      const waUrl = `https://wa.me/918587901795?text=${encodeURIComponent(
        whatsappText
      )}`;

      setWhatsappUrl(waUrl);
      setSent(true);

      whatsappTimer.current = setTimeout(() => {
        const win = window.open(waUrl, "_blank");

        // Auto-close only if the WhatsApp tab actually opened
        if (win) {
          win.opener = null;
          closeTimer.current = setTimeout(onClose, 3000);
        }
      }, 1000);
    } catch (error) {
      console.error("Quote request failed:", error);
      if (currentSession === session.current) {
        setStatus("❌ Server error. Try again later.");
      }
    } finally {
      if (currentSession === session.current) setLoading(false);
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl lg:max-w-4xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2 text-ink backdrop-blur transition hover:bg-brand-50 hover:text-brand lg:right-4 lg:top-4"
            >
              <X size={20} />
            </button>

            <div className="grid lg:grid-cols-2">
              {/* Image: background on mobile, left column on desktop */}
              <div className="absolute inset-0 lg:relative lg:inset-auto lg:min-h-[560px]">
                <Image
                  src={IMAGE_SRC}
                  alt="Display rack manufacturing"
                  fill
                  priority
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />

                {/* Caption: desktop only */}
                <div className="relative hidden h-full flex-col justify-end p-10 text-white lg:flex">
                  <h4 className="text-2xl font-semibold leading-snug">
                    Display racks built for your store
                  </h4>
                  <ul className="mt-5 grid gap-2.5">
                    {highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-white/90"
                      >
                        <CheckCircle2 size={16} className="shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form column */}
              <div className="relative z-10 m-4 max-h-[calc(90vh-2rem)] overflow-y-auto rounded-2xl bg-white/90 p-5 backdrop-blur-md sm:p-6 lg:m-0 lg:max-h-[90vh] lg:rounded-none lg:bg-white lg:p-10 lg:backdrop-blur-none">
                {sent ? (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 size={56} className="text-brand" />
                    <h3
                      id="quote-title"
                      className="mt-4 text-xl font-semibold text-ink"
                    >
                      Thank you!
                    </h3>
                    <p className="mt-2 text-sm text-ink/70">
                      We've received your request and will get back to you
                      shortly.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-orange mt-4"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <h3
                      id="quote-title"
                      className="pr-8 text-xl font-semibold text-ink lg:text-2xl"
                    >
                      Get a Quote
                    </h3>
                    <p className="mt-1 text-sm text-ink/70">
                      Share your requirements and our team will send you a
                      tailored quote.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                      <input
                        name="name"
                        required
                        placeholder="Full name *"
                        className={field}
                      />
                      <input
                        name="company"
                        placeholder="Company name"
                        className={field}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder="Phone *"
                          className={field}
                        />
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="Email *"
                          className={field}
                        />
                      </div>
                      <select
                        key={product || "none"}
                        name="product"
                        defaultValue={product || ""}
                        required
                        className={field}
                      >
                        <option value="" disabled>
                          Select a product *
                        </option>
                        {productOptions.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <input
                        name="quantity"
                        placeholder="Required quantity (e.g. 10 racks)"
                        className={field}
                      />
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Size, material, colour, delivery location, etc."
                        className={`${field} resize-none`}
                      />
                      {status && (
                        <p
                          role="alert"
                          className="text-center text-sm font-semibold text-red-600"
                        >
                          {status}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange justify-center disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Submit Request"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}