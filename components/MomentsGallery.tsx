"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcons";
import type { MomentsGalleryData } from "@/types/type";

interface MomentsGalleryProps {
  data: MomentsGalleryData;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export const MomentsGallery: React.FC<MomentsGalleryProps> = ({ data, className = "" }) => {
  const { title, titleHighlight, subtitle, items } = data;
  const [activeMoment, setActiveMoment] = useState<(typeof items)[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMoment(null);
      }
    };
    if (activeMoment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMoment]);

  return (
    <section className={`py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-3.5">
          <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
          <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] font-medium text-neutral-500">
            {data.kicker || "FOLLOW ON INSTAGRAM"}
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
          {title}{" "}
          <span className="italic font-serif relative inline-block text-[#9A7B56]">
            {titleHighlight}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute left-0 bottom-1 w-full h-[1.5px] bg-[#BA9F86]/70 origin-left"
            />
          </span>
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-sans font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActiveMoment(item)}
            aria-label={`View photo: ${item.title}`}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="group relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 shadow-2xs block border border-neutral-200/60 cursor-pointer text-left"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
            />

            <div className="absolute inset-0 bg-neutral-900/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
              <motion.div
                initial={false}
                className="mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
              >
                <SocialIcon platform="instagram" className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex items-center gap-1.5 text-xs font-sans font-medium">
                <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 group-hover:animate-pulse" />
                <span>{item.likes.toLocaleString()}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMoment(null)}
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setActiveMoment(null)}
                aria-label="Close popup"
                className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square w-full bg-neutral-100">
                <Image
                  src={activeMoment.image}
                  alt={activeMoment.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100">
                <div className="space-y-1 max-w-md">
                  <p className="font-editorial text-lg sm:text-xl font-normal text-neutral-900 leading-snug">
                    {activeMoment.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-sans text-neutral-500">
                    <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    <span>{activeMoment.likes.toLocaleString()} likes on Instagram</span>
                  </div>
                </div>

                <a
                  href={activeMoment.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-sans font-medium uppercase tracking-wider transition-colors shrink-0"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
