"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { RecipesSectionData, Recipe } from "@/types/type";

interface RecipesProps {
  data: RecipesSectionData;
  onSelectRecipe: (recipe: Recipe) => void;
  showViewMore?: boolean;
  viewMoreHref?: string;
  limit?: number;
}

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: (idx % 4) * 0.1,
      ease: "easeOut",
    },
  }),
};

export const Recipes: React.FC<RecipesProps> = ({
  data,
  onSelectRecipe,
  showViewMore = false,
  viewMoreHref = "/recipe",
  limit,
}) => {
  const { kicker, title, titleAccent, subtitle, items = [] } = data;

  const displayRecipes = limit ? items.slice(0, limit) : items;

  return (
    <section
      id="recipes"
      className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-6"
      >
        <div>
          {kicker && (
            <div className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-neutral-500 flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
              <span>{kicker}</span>
              <span className="w-5 h-[1px] bg-neutral-400 inline-block" />
            </div>
          )}
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
            {title}{" "}
            {titleAccent && (
              <span className="italic font-serif relative inline-block">
                {titleAccent}
                <span className="absolute left-0 bottom-1 w-full h-[1px] bg-neutral-400/60" />
              </span>
            )}{" "}
            {subtitle}
          </h2>
        </div>

        {showViewMore && (
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={viewMoreHref}
              className="group inline-flex items-center justify-center font-sans tracking-[0.18em] uppercase text-xs px-6 py-3 gap-2.5 border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white transition-all duration-300 font-medium cursor-pointer rounded-xs"
            >
              <span>View More</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </motion.div>

      {displayRecipes.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {displayRecipes.map((recipe, idx) => {
              return (
                <motion.article
                  layout
                  key={recipe.id}
                  custom={idx}
                  variants={cardItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  onClick={() => onSelectRecipe(recipe)}
                  className="group flex flex-col bg-transparent cursor-pointer p-2 rounded-xs hover:bg-white/50 transition-colors"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-neutral-100 mb-3.5 shadow-2xs">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                  </div>

                  <div className="mb-1">
                    <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-neutral-500">
                      {recipe.category}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-2 leading-snug mb-3">
                    {recipe.title}
                  </h3>

                  <div className="mt-auto pt-2 border-t border-neutral-200/60 flex items-center justify-between text-neutral-500 text-[11px] font-sans font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-white/50 border border-dashed border-neutral-300 rounded-sm">
          <p className="font-editorial text-2xl text-neutral-700 mb-2">
            No recipes available
          </p>
        </div>
      )}
    </section>
  );
};
