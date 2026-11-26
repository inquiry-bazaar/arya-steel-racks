
"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const items = [
  {
    label: "Our Mission",
    icon: Target,
    description:
      "To deliver reliable, innovative and cost-effective retail display solutions that empower businesses to grow.",
    theme: "blue",
  },
  {
    label: "Our Vision",
    icon: Eye,
    description:
      "To be a preferred and trusted brand in retail infrastructure, known for quality, innovation and customer success.",
    theme: "orange",
  },
];

export default function Mission() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-6 md:px-10 lg:grid-cols-[0.85fr_1fr_1fr] lg:gap-10 xl:px-16">

        {/* Section Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[5px] w-9 rounded-full bg-[#FF7A1A]" />
            <span className="text-sm font-semibold text-[#0F2A5C]">
              Our Purpose
            </span>
          </div>

          <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F2A5C] md:text-[42px]">
            Mission &{" "}
            <span className="text-[#FF7A1A]">Vision</span>
          </h2>

          <p className="mt-5 max-w-[330px] text-[15px] leading-[1.7] text-[#526783]">
            Guided by a clear purpose, we aim to create long-term value for
            our clients through quality, innovation and trust.
          </p>


        </motion.div>

        {/* Mission & Vision Cards */}
        {items.map((item, index) => {
          const Icon = item.icon;
          const isBlue = item.theme === "blue";

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -7 }}
              className={`group relative min-h-[205px] overflow-hidden rounded-[30px] px-8 py-8 md:px-9 ${
                isBlue
                  ? "bg-[#EDF4FF]"
                  : "bg-[#FFF3E9]"
              }`}
            >
              {/* Top corner accent */}
              <span
                className={`absolute -right-1 -top-1 h-[58px] w-[95px] rounded-bl-[35px] border-b-[5px] border-l-[5px] ${
                  isBlue
                    ? "border-[#1E5EFF]"
                    : "border-[#FF7A1A]"
                }`}
              />

              {/* Bottom corner accent */}
              <span
                className={`absolute -bottom-1 -left-1 h-[42px] w-[70px] rounded-tr-[30px] border-r-[5px] border-t-[5px] ${
                  isBlue
                    ? "border-[#1E5EFF]"
                    : "border-[#FF7A1A]"
                }`}
              />

              {/* Icon */}
              <div
                className={`mb-4 inline-flex transition-transform duration-500 group-hover:scale-110 ${
                  isBlue ? "text-[#1260A8]" : "text-[#FF7A1A]"
                }`}
              >
                <Icon size={43} strokeWidth={1.9} />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-[22px] font-bold tracking-tight text-[#0F2A5C]">
                {item.label}
              </h3>

              <p className="max-w-[370px] text-[15px] leading-[1.65] text-[#263C59]">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
