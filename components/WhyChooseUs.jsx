"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Headset, Play, Settings, Users, Zap } from "lucide-react";
import MediaSlot from "./MediaSlot";
import VideoModal from "./VideoModal";
import { features, media } from "@/data/content";

const icons = { gem: Gem, settings: Settings, zap: Zap, headset: Headset };

export default function WhyChooseUs() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="why" className="bg-soft relative overflow-hidden pb-24 pt-8">
      <div className="section-pad grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative pb-10"
        >
          <div className="relative aspect-[16/10] overflow-hidden shadow-glass" style={{ borderRadius: "28px 90px 28px 90px" }}>
            <MediaSlot src={media.whyPoster} alt="Why-us video poster" className="h-full w-full object-cover" />
            <button
              onClick={() => setVideoOpen(true)}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-glass transition hover:scale-110"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <Play className="relative h-6 w-6 fill-navy" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-card absolute bottom-0 left-0 flex items-center gap-3 px-6 py-4"
          >
            <Users className="h-9 w-9" />
            <div className="leading-tight">
              <p className="text-[20px] font-extrabold">1000+</p>
              <p className="text-[13px] font-medium text-navy/70">Happy Clients</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="eyebrow">
            <span className="h-[2px] w-5 bg-brand" /> Why Choose Us
          </span>
          <h2 className="mt-4 text-[34px] font-extrabold leading-[1.15] tracking-tight sm:text-[38px]">
            Your Trusted Partner in <span className="text-brand">Retail</span> Storage Solutions
          </h2>
          <p className="mt-4 max-w-[480px] text-[14.5px] leading-relaxed text-navy/80">
            We deliver innovative, durable and affordable steel rack solutions that help you maximize space and boost
            efficiency.
          </p>

          <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex h-14 w-14 rotate-45 items-center justify-center rounded-xl bg-white shadow-glass">
                    <Icon className="-rotate-45 h-6 w-6" />
                  </span>
                  <span className="mt-4 text-[12px] font-semibold leading-tight">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* rack image in the top-right corner */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute -right-6 top-6 hidden h-[260px] w-[200px] xl:block"
      >
        <MediaSlot src={media.whyCorner} alt="Rack corner image" className="h-full w-full object-contain" />
      </motion.div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} src={media.whyVideo} />
    </section>
  );
}
