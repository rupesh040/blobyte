"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { FeaturedRecipeData } from "@/types/type";

interface FeaturedRecipeProps {
  data: FeaturedRecipeData;
}

export const FeaturedRecipe: React.FC<FeaturedRecipeProps> = ({
  data,
}) => {
  const {
    badge,
    title,
    titleHighlight,
    description,
    ctaText,
    ctaHref,
    mainCard,
    backgroundCards,
  } = data;

  return (
    <section
      id="featured"
      className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          {badge && (
            <div className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-neutral-500 flex items-center gap-2 mb-4">
              <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
              <span>{badge}</span>
              <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
            </div>
          )}

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.1] mb-6">
            {title}{" "}
            <span className="italic font-serif relative inline-block text-neutral-800">
              {titleHighlight}
              <span className="absolute left-0 bottom-1 w-full h-[1.5px] bg-neutral-300" />
            </span>
          </h2>

          <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed mb-8 max-w-md font-light">
            {description}
          </p>

          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={ctaHref || "/#recipes"}
              onClick={(e) => {
                const targetId = (ctaHref || "#recipes").replace(/^\/?#?/, "");
                const el = document.getElementById(targetId);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `#${targetId}`);
                }
              }}
              className="group inline-flex items-center justify-center font-sans tracking-[0.18em] uppercase text-xs px-6 py-3 gap-2.5 border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white transition-all duration-300 font-medium cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-7 relative flex justify-center items-center py-6">
          {backgroundCards[0] && (
            <motion.div
              initial={{ opacity: 0, rotate: -22, x: -40, y: 30 }}
              whileInView={{ opacity: 1, rotate: -12, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              whileHover={{ rotate: -5, scale: 1.03, zIndex: 20 }}
              className="absolute -left-2 sm:left-4 top-4 sm:top-6 w-44 sm:w-56 bg-white p-2.5 sm:p-3 shadow-xl border border-neutral-200/80 z-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={backgroundCards[0].image}
                  alt={backgroundCards[0].label}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-center font-editorial italic text-[11px] text-neutral-500">
                {backgroundCards[0].label}
              </p>
            </motion.div>
          )}

          {backgroundCards[1] && (
            <motion.div
              initial={{ opacity: 0, rotate: 22, x: 40, y: 30 }}
              whileInView={{ opacity: 1, rotate: 12, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              whileHover={{ rotate: 5, scale: 1.03, zIndex: 20 }}
              className="absolute -right-2 sm:right-6 bottom-2 sm:bottom-4 w-40 sm:w-52 bg-white p-2.5 sm:p-3 shadow-xl border border-neutral-200/80 z-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={backgroundCards[1].image}
                  alt={backgroundCards[1].label}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-center font-editorial italic text-[11px] text-neutral-500">
                {backgroundCards[1].label}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative z-10 w-full max-w-[340px] sm:max-w-[400px] bg-white p-4 sm:p-5 shadow-2xl border border-neutral-200"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 mb-4">
              <Image
                src={mainCard.image}
                alt={mainCard.title}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
            </div>

            <h3 className="font-editorial text-xl sm:text-2xl font-medium text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
              {mainCard.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-4">
              {mainCard.description}
            </p>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-neutral-500 text-[11px] font-sans font-medium uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{mainCard.cookingTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                <span>{mainCard.servings}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
