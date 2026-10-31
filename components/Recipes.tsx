"use client";

import React from "react";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { RecipesSectionData, Recipe } from "@/types/type";

interface RecipesProps {
  data: RecipesSectionData;
  onSelectRecipe: (recipe: Recipe) => void;
  limit?: number;
}

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: (idx % 4) * 0.08,
      ease: "easeOut",
    },
  }),
};

export const Recipes: React.FC<RecipesProps> = ({
  data,
  onSelectRecipe,
  limit,
}) => {
  const { kicker, title, titleAccent, subtitle, items = [] } = data;
  const displayRecipes = limit ? items.slice(0, limit) : items;

  return (
    <section
      id="recipes"
      className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-8 sm:mb-10"
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
              <span className="italic font-serif relative inline-block text-[#9A7B56]">
                {titleAccent}
                <span className="absolute left-0 bottom-1 w-full h-[1.5px] bg-[#BA9F86]/70" />
              </span>
            )}{" "}
            {subtitle}
          </h2>
        </div>
      </motion.div>

      {displayRecipes.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-7 gap-y-10 sm:gap-y-12"
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
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  onClick={() => onSelectRecipe(recipe)}
                  className="group flex flex-col bg-white/70 border border-neutral-200/70 p-3 rounded-xl hover:shadow-card hover:bg-white transition-all cursor-pointer relative"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100 mb-3.5 shadow-2xs">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-600 ease-out group-hover:scale-108"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9A7B56]">
                      {recipe.category}
                    </span>
                    {recipe.difficulty && (
                      <span className="text-[10px] font-sans font-medium text-neutral-400 uppercase tracking-wider">
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial text-lg sm:text-[1.28rem] font-medium text-neutral-900 group-hover:text-[#9A7B56] transition-colors line-clamp-2 leading-snug mb-3">
                    {recipe.title}
                  </h3>

                  <div className="mt-auto pt-2.5 border-t border-neutral-200/60 flex items-center justify-between text-neutral-500 text-[11px] font-sans font-medium uppercase tracking-wider">
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
        <div className="text-center py-16 bg-white/60 border border-dashed border-neutral-300 rounded-xl">
          <p className="font-editorial text-2xl text-neutral-700">
            No recipes available at the moment
          </p>
        </div>
      )}
    </section>
  );
};
