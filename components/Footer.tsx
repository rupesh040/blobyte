"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcons";
import type { FooterData } from "@/types/type";

interface FooterProps {
  data: FooterData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const pathname = usePathname();
  const {
    footerBgImage = "/footer-bgs.webp",
    logo,
    navigation,
    socials,
    copyright,
  } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative mt-4 bg-[#F4EFEA] overflow-hidden flex flex-col justify-end"
    >
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={footerBgImage}
            alt="Footer culinary background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-right-top sm:object-right filter brightness-[0.85] contrast-[0.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4EFEA] via-[#F4EFEA]/85 to-transparent sm:via-[#F4EFEA]/65" />
          <div className="absolute inset-0 bg-neutral-950/8" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-black"
        >
          <div className="flex-shrink-0 text-center lg:text-left">
            <Link
              href="/"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-block select-none group"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex flex-col items-center lg:items-start justify-center cursor-pointer"
              >
                <Image
                  src={logo.image || "/logo.png"}
                  alt="BLOBYTE Logo"
                  width={150}
                  height={42}
                  priority
                  className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 drop-shadow-2xs"
                />
              </motion.div>
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-5 sm:gap-7">
            {navigation.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    const hash = item.href.includes("#")
                      ? item.href.split("#")[1]
                      : "";
                    if (pathname === "/" && hash) {
                      e.preventDefault();
                      if (hash === "home") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        document
                          .getElementById(hash)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-neutral-700 hover:text-neutral-950 transition-colors relative py-1 group inline-block"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-9 h-9 rounded-full border border-neutral-300 bg-white/90 backdrop-blur-2xs flex items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-200 shadow-2xs"
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-5 flex flex-col sm:flex-row items-center justify-between text-neutral-600 text-xs font-sans gap-3"
        >
          <p>{copyright}</p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-1.5 uppercase tracking-[0.18em] font-medium text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};
