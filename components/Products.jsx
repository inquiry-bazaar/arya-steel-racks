"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Layers,
  Server,
  Package,
  Store,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import MediaSlot from "./MediaSlot";
import { products } from "@/data/content";

const MIN_SLIDES = 12;

const ICONS = [ShoppingCart, Layers, Server, Package, Store];

const WAVE_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 26 C22 -4 42 0 60 24 S90 52 100 30 L100 100 L0 100 Z' fill='black'/%3E%3C/svg%3E\")";

export default function Products() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = useMemo(() => {
    const copies = Math.max(1, Math.ceil(MIN_SLIDES / products.length));
    return Array.from({ length: copies }, (_, c) =>
      products.map((p, i) => ({ ...p, _key: `${p.slug}-${c}`, _icon: ICONS[i % ICONS.length] }))
    ).flat();
  }, []);

  return (
    <section id="products" className="bg-soft overflow-hidden py-20">
      <div className="section-pad grid items-center gap-10 lg:grid-cols-[360px_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-[2px] w-5 bg-brand" /> Our Featured Products
          </span>
          <h2 className="mt-4 text-[38px] font-extrabold leading-[1.12] tracking-tight sm:text-[42px]">
            Explore Our <span className="text-brand">Display Rack</span> Range
          </h2>
          <p className="mt-5 max-w-[330px] text-[14.5px] leading-relaxed text-navy/80">
            A few of our best-selling racks, counters and trolleys. Tap a product for details, or browse the full range.
          </p>
          <Link href="/products" className="btn-orange mt-7 !py-3">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* right: 3D coverflow stage */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative min-w-0"
        >
          {/* faint glow behind the active card */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(255,255,255,0))]" />

          {/* glowing podium */}
          <div className="pointer-events-none absolute bottom-[84px] left-1/2 z-0 -translate-x-1/2">
            <div className="relative h-[70px] w-[300px] sm:w-[340px]">
              <div className="absolute inset-x-0 bottom-0 h-[56px] rounded-[50%] bg-gradient-to-b from-white to-[#dfe7f5] shadow-[0_14px_30px_rgba(30,50,100,0.12)]" />
              <div className="absolute -inset-x-6 bottom-[-6px] h-[62px] rounded-[50%] border-[3px] border-orange-400/80 shadow-[0_0_22px_6px_rgba(255,122,0,0.4),inset_0_0_18px_rgba(255,122,0,0.3)]" />
              <div className="absolute -inset-x-12 bottom-[-12px] h-[74px] rounded-[50%] border border-orange-300/50" />
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-3 top-[66%] z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-[0_6px_18px_rgba(20,40,90,0.18)] transition hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-3 top-[66%] z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-[0_6px_18px_rgba(20,40,90,0.18)] transition hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <Swiper
            className="products-swiper relative z-10 !pb-24 !pt-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            modules={[Autoplay, EffectCoverflow]}
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setActive(s.realIndex % products.length)}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            loopAdditionalSlides={products.length}
            slidesPerView="auto"
            speed={800}
            watchSlidesProgress
            coverflowEffect={{
              rotate: 18,
              stretch: -10,
              depth: 160,
              modifier: 1,
              scale: 0.9,
              slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {slides.map((item) => {
              const Icon = item._icon;
              return (
                <SwiperSlide
                  key={item._key}
                  className="product-slide group/slide !h-auto !w-[210px] sm:!w-[240px] lg:!w-[250px]"
                >
                  {/* mirror reflection lives on this wrapper so it moves with the card */}
                  <div
                    className="product-card-wrap"
                    style={{
                      WebkitBoxReflect:
                        "below 6px linear-gradient(to bottom, transparent 76%, rgba(255,255,255,0.32))",
                    }}
                  >
                    <Link href={`/${item.slug}`} aria-label={`View ${item.title}`} className="block">
                      <article
                        className="product-card relative aspect-[250/335] overflow-hidden rounded-[26px] border-2 border-[#e6ecf7] bg-white shadow-[0_12px_30px_rgba(30,55,110,0.10)] transition-[border-color,box-shadow] duration-500
                          group-[.swiper-slide-active]/slide:border-orange-400
                          group-[.swiper-slide-active]/slide:shadow-[0_0_0_3px_rgba(255,122,0,0.25),0_18px_40px_rgba(255,122,0,0.28)]"
                      >
{/* product image — flush to card edges */}
<div className="absolute inset-x-0 top-0 bottom-[28%] overflow-hidden rounded-t-[24px]">
  <MediaSlot
    src={item.image}
    alt={item.title}
    className="absolute inset-0 h-full w-full object-cover"
  />
</div>

                        {/* top-right corner accent: blue by default, orange when active */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-0 z-20 h-9 w-9 rounded-tr-[26px] border-r-[5px] border-t-[5px] border-[#2f6fd6] transition-colors duration-500
                            group-[.swiper-slide-active]/slide:border-orange-400"
                        />

                        {/* wavy info panel (shape via mask, colour via gradient) */}
                        <div
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 z-10 h-[46%] bg-gradient-to-b from-white to-[#eef2fa] transition-all duration-500
                            group-[.swiper-slide-active]/slide:h-[50%]
                            group-[.swiper-slide-active]/slide:from-[#2f74e0]
                            group-[.swiper-slide-active]/slide:to-[#0f3f9e]"
                          style={{
                            WebkitMaskImage: WAVE_MASK,
                            maskImage: WAVE_MASK,
                            WebkitMaskSize: "100% 100%",
                            maskSize: "100% 100%",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          }}
                        />

                        {/* panel content */}
                        <div className="absolute inset-x-0 bottom-0 z-20 flex h-[40%] items-end justify-between gap-2 px-4 pb-4">
                          <div className="min-w-0">
                            <Icon
                              className="mb-1.5 h-6 w-6 text-orange-500 transition-colors duration-500
                                group-[.swiper-slide-active]/slide:h-7 group-[.swiper-slide-active]/slide:w-7
                                group-[.swiper-slide-active]/slide:text-white"
                              strokeWidth={1.7}
                            />
                            <h3
                              className="product-title line-clamp-2 text-[15px] font-extrabold leading-tight text-navy transition-all duration-500
                                group-[.swiper-slide-active]/slide:text-[19px] group-[.swiper-slide-active]/slide:text-white"
                            >
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p
                                className="product-sub mt-0.5 truncate text-[11.5px] text-navy/60 transition-colors duration-500
                                  group-[.swiper-slide-active]/slide:text-white/90"
                              >
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                          <span
                            className="product-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand text-white shadow-orange transition-all duration-500
                              group-[.swiper-slide-active]/slide:h-12 group-[.swiper-slide-active]/slide:w-12"
                          >
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* indicator dots: one per real product (not per duplicated slide) */}
          <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center gap-2">
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Go to ${p.title}`}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-brand" : "w-2.5 bg-navy/20 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}