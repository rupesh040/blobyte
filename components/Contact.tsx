"use client";

import React, { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactData } from "@/types/type";
import { contactData as defaultContactData } from "@/data";

interface ContactProps {
  data?: ContactData;
  className?: string;
}

export const Contact: React.FC<ContactProps> = ({
  data = defaultContactData,
  className = "",
}) => {
  const { kicker, title, titleHighlight, subtitle, infoItems, formTitle } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitted(false);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "mail":
        return <Mail className="w-5 h-5 stroke-[1.75]" />;
      case "location":
        return <MapPin className="w-5 h-5 stroke-[1.75]" />;
      case "clock":
        return <Clock className="w-5 h-5 stroke-[1.75]" />;
      case "phone":
        return <Phone className="w-5 h-5 stroke-[1.75]" />;
      default:
        return <Mail className="w-5 h-5 stroke-[1.75]" />;
    }
  };

  return (
    <section
      id="contact"
      className={`py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] font-semibold text-neutral-800">
              {kicker || "CONTACT US"}
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl text-neutral-900 leading-[1.08] font-normal tracking-tight">
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

          <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-7">
            {infoItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#BA9F86] text-white flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 group-hover:bg-[#AC8E73] transition-all">
                  {renderIcon(item.icon)}
                </div>

                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-500 block mb-0.5">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm sm:text-base font-sans text-neutral-900 font-medium hover:text-[#9A7B56] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm sm:text-base font-sans text-neutral-900 font-medium">
                      {item.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#FAF5EE] border border-[#EADBCE] shadow-2xs relative overflow-hidden">
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight">
              {formTitle || "Send Us a Message"}
            </h3>
            <div className="w-12 h-[2px] bg-[#BA9F86] mt-2 mb-6 sm:mb-8" />

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-editorial text-2xl text-neutral-900 font-medium">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you for reaching out. We have received your note and will get back to you within 24–48 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 bg-[#BA9F86] hover:bg-[#A88C74] text-white text-xs uppercase tracking-[0.18em] font-sans font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-white border border-neutral-200/90 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#BA9F86] focus:ring-1 focus:ring-[#BA9F86]/30 transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-white border border-neutral-200/90 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#BA9F86] focus:ring-1 focus:ring-[#BA9F86]/30 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-neutral-200/90 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#BA9F86] focus:ring-1 focus:ring-[#BA9F86]/30 transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-neutral-200/90 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#BA9F86] focus:ring-1 focus:ring-[#BA9F86]/30 transition-all shadow-2xs resize-y"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3.5 bg-[#BA9F86] hover:bg-[#A88C74] text-white text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded-lg sm:rounded-xl inline-flex items-center gap-2.5 transition-all shadow-xs cursor-pointer group disabled:opacity-70"
                    >
                      <span>
                        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
