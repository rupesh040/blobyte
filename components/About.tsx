"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutData } from "@/types/type";

interface AboutProps {
  data: AboutData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const { badge, title, chefImage, chefName, chefRole, paragraphs } = data;

  return (
    <section id="about" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 border border-neutral-200/80 rounded-xl p-6 sm:p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-xl shadow-md bg-neutral-100 group border border-neutral-200/60">
              <Image
                src={chefImage}
                alt={chefName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <p className="font-editorial text-2xl font-medium">{chefName}</p>
                  <p className="font-sans text-xs tracking-wider uppercase text-neutral-300">
                    {chefRole}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-7 flex flex-col items-start justify-center"
          >
            {badge && (
              <div className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-neutral-500 flex items-center gap-2 mb-4">
                <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
                <span>{badge}</span>
                <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
              </div>
            )}

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-[1.15] mb-5">
              {title}
            </h2>

            <div className="space-y-4 text-neutral-600 font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 my-6  w-full">
              <div>
                <span className="font-editorial text-2xl sm:text-3xl text-neutral-900 font-medium block">
                  120+
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-neutral-500 font-medium">
                  Artisanal Recipes
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl sm:text-3xl text-neutral-900 font-medium block">
                  15+
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-neutral-500 font-medium">
                  Years of Craft
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl sm:text-3xl text-neutral-900 font-medium block">
                  50k+
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-neutral-500 font-medium">
                  Home Cooks
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl sm:text-3xl text-neutral-900 font-medium block">
                  4.9★
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-neutral-500 font-medium">
                  Community Rating
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
