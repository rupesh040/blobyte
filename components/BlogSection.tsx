"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Loader2, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost, BlogSectionData } from "@/types/type";
import { blogData as defaultBlogData } from "@/data";

interface BlogSectionProps {
  data?: BlogSectionData;
  onSelectPost?: (post: BlogPost) => void;
  className?: string;
  initialCount?: number;
  increment?: number;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  data = defaultBlogData,
  onSelectPost,
  className = "",
  initialCount = 4,
  increment = 2,
}) => {
  const { kicker, title, titleHighlight, titleSuffix, subtitle, posts = [] } = data;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostClick = (post: BlogPost) => {
    if (onSelectPost) {
      onSelectPost(post);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + increment, posts.length));
      setIsLoading(false);
    }, 450);
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section
      id="blog"
      className={`py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-3.5">
          <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
          <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] font-semibold text-neutral-500">
            {kicker || "OUR BLOGS"}
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-neutral-300" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
          {title}{" "}
          <span className="italic font-serif relative inline-block text-[#9A7B56]">
            {titleHighlight}
            <svg
              className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#BA9F86] pointer-events-none"
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
          </span>{" "}
          {titleSuffix || "& More"}
        </h2>

        {subtitle && (
          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-sans font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 xl:gap-8">
        <AnimatePresence>
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: (idx % 2) * 0.08, ease: "easeOut" }}
            >
              <Link
                href={`/blog/${post.slug}`}
                onClick={() => handlePostClick(post)}
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200/80 bg-white shadow-2xs hover:shadow-card hover:border-neutral-300 transition-all duration-300 cursor-pointer h-full block"
              >
                <div className="w-full sm:w-[48%] relative aspect-[4/3] sm:aspect-auto sm:min-h-[290px] overflow-hidden bg-neutral-100 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="w-full sm:w-[52%] p-5 sm:p-6 md:p-7 flex flex-col justify-between bg-[#FAF6EE]/80 group-hover:bg-[#F7F1E6] transition-colors duration-300">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.22em] font-semibold text-[#9A7B56] block mb-2">
                      {post.category}
                    </span>

                    <h3 className="font-editorial text-xl sm:text-[1.35rem] lg:text-[1.45rem] font-medium text-neutral-900 leading-snug tracking-tight group-hover:text-[#9A7B56] transition-colors duration-200 mb-2.5">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-neutral-600 font-sans font-light leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3.5 text-[11px] sm:text-xs font-sans text-neutral-500 pt-3 border-t border-neutral-200/70 mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-neutral-900 group-hover:text-[#9A7B56] transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center">
        {hasMore ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#BA9F86]" />
                <span>Loading Stories...</span>
              </>
            ) : (
              <>
                <span>Load More Articles</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </motion.button>
        ) : posts.length > initialCount ? (
          <div className="flex items-center gap-3 text-neutral-400 text-xs font-sans uppercase tracking-[0.2em]">
            <span className="w-10 h-[1px] bg-neutral-300" />
            <span>All Stories Loaded</span>
            <span className="w-10 h-[1px] bg-neutral-300" />
          </div>
        ) : null}
      </div>
    </section>
  );
};
