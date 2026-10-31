"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Share2,
  Check,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/types/type";
import { blogPosts } from "@/data";
import { SocialIcon } from "@/components/SocialIcons";

interface BlogDetailProps {
  post: BlogPost;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost =
    currentIndex > 0 ? blogPosts[currentIndex - 1] : blogPosts[blogPosts.length - 1];
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : blogPosts[0];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSocialShare = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this recipe: ${post.title}`);

    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === "pinterest") {
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    }
  };

  const ingredients = post.ingredients || [];
  const midPoint = Math.ceil(ingredients.length / 2);
  const col1Ingredients = ingredients.slice(0, midPoint);
  const col2Ingredients = ingredients.slice(midPoint);

  return (
    <article className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/#blog"
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.18em] font-semibold text-neutral-600 hover:text-neutral-950 transition-colors mb-4 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>

            <span className="text-xs font-sans uppercase tracking-[0.24em] font-semibold text-[#9A7B56] block mb-3">
              {post.category}
            </span>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] text-neutral-900 tracking-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-sans font-light leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 my-6 border-y border-neutral-200/80 text-xs sm:text-sm font-sans text-neutral-600">
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#9A7B56]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#9A7B56]" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 font-medium transition-colors cursor-pointer group"
                  aria-label="Share this recipe"
                >
                  <Share2 className="w-4 h-4 text-[#9A7B56] group-hover:scale-110 transition-transform" />
                  <span>Share</span>
                </button>

                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 -top-8 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-sans font-medium rounded shadow-md whitespace-nowrap flex items-center gap-1 z-30"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Link copied!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-card border border-neutral-200/70 bg-neutral-100 mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-center"
              />
            </div>

            {post.intro && (
              <p className="text-base sm:text-[17px] text-neutral-700 font-sans font-light leading-relaxed mb-10">
                {post.intro}
              </p>
            )}

            {ingredients.length > 0 && (
              <section className="mb-12">
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight mb-5">
                  Ingredients
                </h2>

                <div className="p-6 sm:p-7 md:p-8 rounded-2xl bg-[#FAF5EE] border border-[#E9E0D4] shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
                    <div className="space-y-3.5">
                      {col1Ingredients.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-[2px] bg-[#BA9F86] flex-shrink-0 mt-2" />
                          <span className="text-sm sm:text-[15px] text-neutral-700 font-sans leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      {col2Ingredients.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-[2px] bg-[#BA9F86] flex-shrink-0 mt-2" />
                          <span className="text-sm sm:text-[15px] text-neutral-700 font-sans leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {post.instructions && post.instructions.length > 0 && (
              <section className="mb-12">
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight mb-7">
                  How to Make
                </h2>

                <div className="relative pl-2 sm:pl-3 space-y-6 sm:space-y-8">
                  <div className="absolute left-[21px] sm:left-[25px] top-4 bottom-8 w-[1.5px] bg-neutral-200" />

                  {post.instructions.map((stepItem, idx) => (
                    <motion.div
                      key={stepItem.step || idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="relative flex items-start gap-4 sm:gap-5"
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#BA9F86] text-white flex items-center justify-center font-sans font-semibold text-xs sm:text-sm shadow-xs z-10 flex-shrink-0">
                        {stepItem.step}
                      </span>

                      <div className="pt-0.5 flex-1 min-w-0">
                        <h3 className="font-sans font-semibold text-neutral-900 text-base sm:text-[17px] leading-snug">
                          {stepItem.title}
                        </h3>
                        <p className="mt-1.5 text-sm sm:text-[15px] text-neutral-600 font-sans font-light leading-relaxed">
                          {stepItem.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            <div className="border-t border-neutral-200/80 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="font-editorial text-lg text-neutral-900 font-normal">
                  Share This Post
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSocialShare("facebook")}
                    aria-label="Share on Facebook"
                    className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <SocialIcon platform="facebook" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSocialShare("twitter")}
                    aria-label="Share on X"
                    className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <SocialIcon platform="twitter" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSocialShare("pinterest")}
                    aria-label="Share on Pinterest"
                    className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <SocialIcon platform="pinterest" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                    className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <LinkIcon className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] font-sans font-medium text-neutral-600">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Post</span>
                  </Link>
                )}

                <span className="text-neutral-300">|</span>

                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
                  >
                    <span>Next Post</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D6] shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-editorial text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight">
                Related Recipes
              </h2>
              <span className="w-12 h-[1px] bg-neutral-300" />
            </div>

            <div className="space-y-4">
              {(post.relatedRecipes || []).map((related) => (
                <Link
                  key={related.id}
                  href={related.href || "#"}
                  className="group flex items-center gap-3.5 pb-3.5 border-b border-neutral-200/60 last:border-0 last:pb-0 transition-opacity hover:opacity-90 block"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative flex-shrink-0 bg-neutral-200 border border-neutral-200/60 shadow-2xs">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[#9A7B56] block mb-1">
                      {related.category}
                    </span>
                    <h3 className="font-editorial text-base sm:text-[17px] font-medium text-neutral-900 leading-snug line-clamp-2 group-hover:text-[#9A7B56] transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-sans text-neutral-500 mt-1.5">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] min-h-[360px] w-full rounded-2xl overflow-hidden shadow-card border border-neutral-200/80 bg-white group">
            <Image
              src="/sidebar-promo.jpg"
              alt="Culinary ingredients flatlay with rosemary, garlic and mushrooms"
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-center">
              <div className="max-w-[210px]">
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-neutral-900 leading-tight">
                  More Delicious Recipes
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed">
                  Explore a variety of easy, healthy and flavorful recipes for every occasion.
                </p>
                <Link
                  href="/#recipes"
                  className="mt-5 inline-block text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-neutral-900 hover:text-[#9A7B56] border-b border-neutral-900 hover:border-[#9A7B56] pb-0.5 transition-colors"
                >
                  Explore Recipes →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};
