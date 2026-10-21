"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { HeroData } from "@/types/type";

interface HeroProps {
  data: HeroData;
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

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { cards, tagline, description, ctaText, ctaHref } = data;

  return (
    <section className="relative py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-end mb-6">
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="sm:col-span-4 lg:col-span-3 flex justify-center sm:justify-start"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="group relative bg-white p-3.5 sm:p-4 shadow-polaroid border border-neutral-200/70 w-full max-w-[280px] sm:max-w-none cursor-pointer transition-shadow hover:shadow-2xl"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
              <Image
                src={cards[0]?.image || "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"}
                alt={cards[0]?.alt || "Wild Forest Mushrooms"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
            {cards[0]?.caption && (
              <p className="mt-2.5 text-center font-editorial italic text-xs text-neutral-500">
                {cards[0].caption}
              </p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="sm:col-span-5 lg:col-span-6 flex justify-center"
        >
          <motion.div
            whileHover={{ y: -10, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="group relative bg-white p-4 sm:p-5 shadow-polaroid border border-neutral-200/70 w-full max-w-[420px] sm:max-w-none cursor-pointer transition-shadow hover:shadow-2xl"
          >
            <div className="relative aspect-[4/4] sm:aspect-[4/3.8] w-full overflow-hidden bg-neutral-100">
              <Image
                src={cards[1]?.image || "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80"}
                alt={cards[1]?.alt || "Artisan Risotto Bowl"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
            {cards[1]?.caption && (
              <p className="mt-2.5 text-center font-editorial italic text-xs sm:text-sm text-neutral-600">
                {cards[1].caption}
              </p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="sm:col-span-3 lg:col-span-3 flex justify-center sm:justify-end"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="group relative bg-white p-3.5 sm:p-4 shadow-polaroid border border-neutral-200/70 w-full max-w-[240px] sm:max-w-none cursor-pointer transition-shadow hover:shadow-2xl"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
              <Image
                src={cards[2]?.image || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"}
                alt={cards[2]?.alt || "Artisanal Ribbon Pasta"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
            {cards[2]?.caption && (
              <p className="mt-2.5 text-center font-editorial italic text-xs text-neutral-500">
                {cards[2].caption}
              </p>
            )}
          </motion.div>
        </motion.div>
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
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center font-sans tracking-[0.18em] uppercase text-xs px-6 py-3 gap-2.5 border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white transition-all duration-300 font-medium cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
