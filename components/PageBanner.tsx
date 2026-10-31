"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageBannerProps {
  title?: string;
  image?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  image,
}) => {
  const displayTitle = title || "ABOUT";
  const displayImage = image || "/page-banner.webp";

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full h-52 sm:h-64 md:h-80 lg:h-96 rounded-xs sm:rounded-sm overflow-hidden shadow-card border border-neutral-200/70 group"
      >
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
          />
        </motion.div>
        {/* exanple  */}

        <div className="absolute inset-0 bg-neutral-900/40 transition-colors duration-500 group-hover:bg-neutral-900/45" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 15, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-[0.22em] drop-shadow-md select-none"
          >
            {displayTitle}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
};
