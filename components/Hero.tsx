"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { homePageData } from "@/data";
import type { HeroData, HeroCard } from "@/types/type";

interface HeroProps {
  data?: HeroData;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: custom * 0.15,
      ease: "easeOut",
    },
  }),
};

const cardLayoutConfigs = [
  {
    wrapperClass:
      "sm:col-span-4 lg:col-span-3 flex justify-center sm:justify-start",
    cardClass: "max-w-[280px] sm:max-w-none p-3.5 sm:p-4",
    aspectRatio: "aspect-[4/5]",
    hoverEffect: { y: -8, scale: 1.02 },
    sizes: "(max-width: 768px) 100vw, 30vw",
  },
  {
    wrapperClass: "sm:col-span-5 lg:col-span-6 flex justify-center",
    cardClass: "max-w-[420px] sm:max-w-none p-4 sm:p-5",
    aspectRatio: "aspect-[4/4] sm:aspect-[4/3.8]",
    hoverEffect: { y: -10, scale: 1.025 },
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    wrapperClass:
      "sm:col-span-3 lg:col-span-3 flex justify-center sm:justify-end",
    cardClass: "max-w-[240px] sm:max-w-none p-3.5 sm:p-4",
    aspectRatio: "aspect-[3/4]",
    hoverEffect: { y: -8, scale: 1.02 },
    sizes: "(max-width: 768px) 100vw, 25vw",
  },
];

export const Hero: React.FC<HeroProps> = ({ data = homePageData.hero }) => {
  const {
    cards = [],
    tagline = "",
    description = "",
    ctaText = "",
    ctaHref = "",
  } = data || homePageData.hero;

  return (
    <section id="home" className="relative py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-end mb-6">
        {cards.map((card: HeroCard, index: number) => {
          const config =
            cardLayoutConfigs[index] ||
            cardLayoutConfigs[index % cardLayoutConfigs.length];

          return (
            <motion.div
              key={card.id || `hero-card-${index}`}
              custom={index + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={config.wrapperClass}
            >
              <motion.div
                whileHover={config.hoverEffect}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`group relative bg-white ${config.cardClass} shadow-polaroid border border-neutral-200/70 w-full cursor-pointer transition-shadow hover:shadow-2xl`}
              >
                <div
                  className={`relative ${config.aspectRatio} w-full overflow-hidden bg-neutral-100`}
                >
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.alt || card.title || "Culinary showcase"}
                      fill
                      priority={index < 2}
                      sizes={config.sizes}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center border-t border-neutral-200/60 pt-6"
      >
        <div className="lg:col-span-7">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-neutral-900 tracking-tight leading-[1.08]">
            {tagline}
          </h1>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start lg:pl-6 space-y-5">
          <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {ctaHref && ctaText && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={ctaHref}
                  onClick={(e) => {
                    const target = ctaHref.replace(/^\/?#?/, "");
                    const el = document.getElementById(target);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group inline-flex items-center justify-center font-sans tracking-[0.18em] uppercase text-xs px-6 py-3.5 gap-2.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 font-semibold cursor-pointer rounded-lg shadow-xs"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

          </div>
        </div>
      </motion.div>
    </section>
  );
};
