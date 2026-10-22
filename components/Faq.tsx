"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqData, FaqItem } from "@/types/type";
import { faqData as defaultFaqData } from "@/data";

interface FaqProps {
  data?: FaqData;
  className?: string;
}

export const Faq: React.FC<FaqProps> = ({
  data = defaultFaqData,
  className = "",
}) => {
  const { badge, title, titleHighlight, subtitle, image, items } = data;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={`py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3.5 mb-4 sm:mb-5">
              <span className="text-xs font-sans uppercase tracking-[0.24em] font-semibold text-neutral-800">
                {badge || "FAQ"}
              </span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-neutral-300/90 rounded-full" />
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl text-neutral-900 leading-[1.08] font-normal tracking-tight">
              {title}{" "}
              <span className="italic font-serif relative inline-block text-[#9A7B56]">
                {titleHighlight}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 text-[#BA9F86] pointer-events-none"
                  viewBox="0 0 160 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7C42 2.5 105 2.5 158 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 10C55 5.5 110 5.5 142 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-600 font-sans font-light leading-relaxed max-w-md">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-8 sm:mt-10 relative group"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-card border border-neutral-200/80 bg-white">
              <Image
                src={image || "/faq-pasta.jpg"}
                alt="Artisanal creamy mushroom fettuccine pasta with parmesan and fresh herbs"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs flex items-center gap-1.5 text-[11px] font-sans font-medium text-neutral-800">
                <Sparkles className="w-3 h-3 text-[#9A7B56]" />
                <span>Chef&apos;s Signature Pasta</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-3 sm:space-y-3.5"
          >
            {items.map((item: FaqItem, idx: number) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className={`rounded-xl sm:rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-[#FAF5EF] border-[#E8DEC0]/80 shadow-xs"
                      : "bg-white border-neutral-200/70 hover:border-neutral-300/90 hover:bg-[#FDFBF7]/60 shadow-2xs"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-sans font-semibold flex-shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#BA9F86] text-white shadow-xs scale-105"
                            : "bg-[#BA9F86] text-white group-hover:bg-[#AC8E73]"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`font-editorial text-lg sm:text-xl transition-colors duration-200 leading-snug ${
                          isOpen
                            ? "text-neutral-900 font-medium"
                            : "text-neutral-800 group-hover:text-neutral-950 font-normal"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-neutral-900"
                          : "text-neutral-500 group-hover:text-neutral-800"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 sm:pb-6 px-4 sm:px-6 pt-0">
                          <div className="pl-11.5 sm:pl-13 text-sm sm:text-[15px] text-neutral-600 font-sans font-normal leading-relaxed border-t border-neutral-200/50 pt-3">
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#F6F1EA] to-[#EFE7DE] border border-[#E4DACF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#9A7B56] shadow-xs flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-editorial text-lg sm:text-xl text-neutral-900 font-medium">
                  Have a question not listed here?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                  We are here to help your home cooking journey every step of
                  the way.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-2xs whitespace-nowrap self-stretch sm:self-auto text-center"
            >
              Ask a Question
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
