"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Clock, Sparkles, BookOpen, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/types/type";

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (post) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm cursor-pointer"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 flex flex-col z-10"
        >
          <button
            onClick={onClose}
            aria-label="Close article"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white backdrop-blur-md flex items-center justify-center transition-colors shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto">
            <div className="relative aspect-[16/9] w-full bg-neutral-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-white mb-2">
                  {post.category}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal leading-tight drop-shadow-md">
                  {post.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200/80 text-xs font-sans text-neutral-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#9A7B56]" />
                    <span>{post.author || "Elena Rostova"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#9A7B56]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#9A7B56]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[#9A7B56] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Culinary Blog</span>
                </div>
              </div>

              <blockquote className="p-4 sm:p-5 rounded-xl bg-[#FAF5EE] border-l-4 border-[#BA9F86] italic font-serif text-base sm:text-lg text-neutral-800 leading-relaxed">
                &ldquo;{post.excerpt}&rdquo;
              </blockquote>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-sans font-light leading-relaxed">
                {post.content ? (
                  post.content.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{post.excerpt}</p>
                )}
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F1EA] to-[#EFE7DE] border border-[#E6DACD] flex items-start gap-3.5">
                <BookOpen className="w-5 h-5 text-[#9A7B56] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-neutral-700">
                  <strong className="font-semibold text-neutral-900 block mb-1">
                    Chef&apos;s Secret Tip:
                  </strong>
                  Always use fresh, seasonal ingredients at room temperature before
                  starting prep. This allows delicate flavors and natural juices to blossom
                  organically.
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-sans uppercase tracking-[0.16em] text-neutral-500 font-medium mr-1">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-xs font-sans text-neutral-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
