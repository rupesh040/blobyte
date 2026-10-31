"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcons";
import type { HeaderData } from "@/types/type";

interface NavbarProps {
  data: HeaderData;
}

export const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const { logo, navigation, socials } = data;

  const navRef = React.useRef<HTMLElement>(null);
  const linkRefs = React.useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (pathname !== "/") return;

      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("contact");
        return;
      }

      const sectionIds = [
        "home",
        "about",
        "recipes",
        "blog",
        "faq",
        "contact",
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isItemActive = React.useCallback(
    (href: string) => {
      if (pathname === "/") {
        const targetHash = href.includes("#") ? href.split("#")[1] : "home";
        return (
          activeSection === targetHash ||
          (activeSection === "home" && (targetHash === "home" || targetHash === ""))
        );
      }
      const current =
        pathname.endsWith("/") && pathname.length > 1
          ? pathname.slice(0, -1)
          : pathname;
      const target =
        href.endsWith("/") && href.length > 1 ? href.slice(0, -1) : href;
      if (target === "/" || target === "/#home") {
        return current === "/";
      }
      return current === target || current.startsWith(target + "/");
    },
    [pathname, activeSection],
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileMenuOpen(false);
    const targetId = href.includes("#") ? href.split("#")[1] : "";

    if (pathname === "/") {
      if (targetId) {
        e.preventDefault();
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("home");
          window.history.pushState(null, "", "/");
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveSection(targetId);
            window.history.pushState(null, "", `#${targetId}`);
          }
        }
      }
    }
  };

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = navigation.find((item) => isItemActive(item.href));
      if (!activeItem) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const el = linkRefs.current[activeItem.href];
      if (el && navRef.current) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateIndicator();

    const frameId = requestAnimationFrame(updateIndicator);
    const timer = setTimeout(updateIndicator, 50);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [navigation, isItemActive]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/92 backdrop-blur-md shadow-xs py-3 border-b border-neutral-200/50"
          : "bg-[#FAF8F5] py-5 sm:py-6 border-b border-neutral-200/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveSection("home");
                  window.history.pushState(null, "", "/");
                }
              }}
              className="inline-block select-none group"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Image
                  src={logo.image || "/logo.png"}
                  alt="BLOBYTE Logo"
                  width={isScrolled ? 150 : 190}
                  height={isScrolled ? 42 : 54}
                  priority
                  className={`${
                    isScrolled ? "h-11 sm:h-12" : "h-11 sm:h-14"
                  } w-auto object-contain transition-all duration-300 drop-shadow-2xs`}
                />
              </motion.div>
            </Link>
          </div>

          <nav
            ref={navRef}
            className="relative hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            {navigation.map((item) => {
              const isActive = isItemActive(item.href);
              return (
                <Link
                  key={item.label}
                  ref={(el) => {
                    linkRefs.current[item.href] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors pb-1.5 ${
                    isActive
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {indicator.opacity > 0 && (
              <motion.span
                className="absolute bottom-0 h-[2px] bg-neutral-900 rounded-full pointer-events-none"
                initial={false}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                transition={
                  isFirstRender
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }
                }
              />
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-2.5">
            {socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-neutral-300/80 bg-white/60 flex items-center justify-center text-neutral-700 hover:text-white hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-200 shadow-2xs"
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4 pt-4 pb-3 border-t border-neutral-200/80 bg-[#FAF8F5]/95 backdrop-blur-md rounded-b-lg"
            >
              <div className="flex flex-col space-y-2.5 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-sans tracking-[0.18em] uppercase py-2.5 px-3.5 rounded-lg transition-colors ${
                      isItemActive(item.href)
                        ? "bg-neutral-900 text-white font-semibold"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-3 flex items-center justify-start space-x-3 px-3">
                  {socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="w-4 h-4"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
