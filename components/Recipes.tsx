"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Clock, Users, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { RecipesSectionData, Recipe, RecipeCategory } from "@/types/type";

interface RecipesProps {
  data: RecipesSectionData;
  onSelectRecipe: (recipe: Recipe) => void;
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

export const Recipes: React.FC<RecipesProps> = ({ data, onSelectRecipe }) => {
  const { kicker, title, titleAccent, subtitle, categories, items } = data;

  const [selectedCategory, setSelectedCategory] =
    useState<RecipeCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    return items.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "ALL" || recipe.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients?.some((ing) =>
          ing.item.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

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
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6"
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

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-sans bg-white border border-neutral-300 rounded-sm placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-[10px] text-neutral-400 hover:text-neutral-700 uppercase cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none border-b border-neutral-200/60">
        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mr-1" />
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative text-[11px] font-sans font-medium uppercase tracking-[0.18em] px-3.5 py-1.5 whitespace-nowrap transition-colors rounded-xs cursor-pointer ${
                isActive
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-neutral-900 rounded-xs -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {filteredRecipes.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, idx) => {
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
            No recipes found
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="text-xs uppercase tracking-wider underline text-neutral-900 hover:text-neutral-600 font-medium cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
};
