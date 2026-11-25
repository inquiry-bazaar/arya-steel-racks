"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import MediaSlot from "./MediaSlot";
import { products } from "@/data/content";

// Coverflow + loop needs enough slides in the DOM, so the short list is repeated.
const MIN_SLIDES = 12;

export default function Products() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = useMemo(() => {
    const copies = Math.max(1, Math.ceil(MIN_SLIDES / products.length));
    return Array.from({ length: copies }, (_, c) =>
      products.map((p) => ({ ...p, _key: `${p.slug}-${c}` }))
    ).flat();
  }, []);

  return (
    <section id="products" className="bg-soft overflow-hidden py-20">
      <div className="section-pad grid items-center gap-10 lg:grid-cols-[360px_1fr]">
        {/* left: heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-[2px] w-5 bg-brand" /> Our Products
          </span>
          <h2 className="mt-4 text-[38px] font-extrabold leading-[1.12] tracking-tight sm:text-[42px]">
            Explore Our <span className="text-brand">Display Rack</span> Range
          </h2>
          <p className="mt-5 max-w-[330px] text-[14.5px] leading-relaxed text-navy/80">
            A few of our best-selling racks, counters and trolleys. Tap a product for details, or browse the full range.
          </p>
          <a href="#catalogue" className="btn-navy mt-7 !py-3">
            View All Products <ArrowRight className="h-4 w-4" />
          </a>
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
            {slides.map((item) => (
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
                  {/* whole card opens the product page */}
                  <Link href={`/products/${item.slug}`} aria-label={`View ${item.title}`} className="block h-full">
                    <article className="product-card relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e6ecf7] bg-white p-3 shadow-[0_12px_30px_rgba(30,55,110,0.08)]">
                      {/* glass sheen */}
                      <span className="pointer-events-none absolute inset-0 z-10 rounded-[26px] bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.35)_100%)]" />

                      <div className="aspect-[3/3.2] overflow-hidden rounded-2xl bg-[#f4f7fc]">
                        <MediaSlot src={item.image} alt={item.title} className="h-full w-full object-contain p-2" />
                      </div>

                      {/* fixed-height footer so nothing reflows when a card becomes active */}
                      <div className="flex h-[72px] items-center justify-between gap-2 px-2 pt-3">
                        <div className="min-w-0">
                          <h3 className="product-title line-clamp-2 text-[16px] font-extrabold leading-tight text-navy">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="product-sub mt-0.5 truncate text-[12px] text-navy/60">{item.subtitle}</p>
                          )}
                        </div>
                        <span className="product-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-brand text-white shadow-orange">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
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