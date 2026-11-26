"use client"

import { contact } from "@/data/content"
import { motion, MotionConfig } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

const Call = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
)

const linkCls = "group/fc relative flex items-center justify-end gap-2.5"
const labelCls = "pointer-events-none translate-x-3.5 whitespace-nowrap rounded-full border-2 border-solid border-[#1f2a33] bg-white px-4 py-2 text-[0.85rem] font-semibold text-[#1f2a33] opacity-0 transition-[opacity,transform] duration-[180ms] ease-out group-hover/fc:translate-x-0 group-hover/fc:opacity-100 group-focus-visible/fc:translate-x-0 group-focus-visible/fc:opacity-100 max-[720px]:hidden"
const btnCls = "relative grid h-[58px] w-[58px] place-items-center rounded-full border-2 border-solid border-[#1f2a33] shadow-[0_10px_22px_rgba(31,42,51,0.28)] transition-[transform,box-shadow] duration-[180ms] ease-out group-hover/fc:-translate-y-1 group-hover/fc:scale-[1.06] group-hover/fc:shadow-[0_16px_28px_rgba(31,42,51,0.34)] max-[720px]:h-[52px] max-[720px]:w-[52px]"
const pulseCls = "before:pointer-events-none before:absolute before:-inset-0.5 before:animate-[fc-pulse_2s_ease-out_infinite] before:rounded-full before:border-2 before:border-solid before:border-[#25d366] before:content-['']"

const pop = (delay) => ({
  initial: { scale: 0, y: 40, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 220, damping: 14, delay },
})

export default function FloatingContact() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed bottom-10 right-11 z-40 flex flex-col items-end gap-3.5 max-[720px]:bottom-4 max-[720px]:right-3.5 max-[720px]:gap-3">
        <motion.div {...pop(1.6)}>
          <a
            className={linkCls}
            href={`https://wa.me/${contact.phoneHref}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <span className={labelCls}>Chat on WhatsApp</span>
            <span className={`${btnCls} ${pulseCls} bg-[#25d366] text-white`}>
              <FaWhatsapp size={28} aria-hidden="true" />
            </span>
          </a>
        </motion.div>

        <motion.div {...pop(1.8)}>
          <a
            className={linkCls}
            href={`tel:${contact.phoneHref}`}
            aria-label="Call us"
          >
            <span className={labelCls}>Call us</span>
            <span className={`${btnCls} bg-[#e82f17] text-white`}>
              <Call />
            </span>
          </a>
        </motion.div>
      </div>
    </MotionConfig>
  )
}