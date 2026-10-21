"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Clock, Users, Flame, Star, Check, Share2, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Recipe } from "@/types/type";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (recipe) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [recipe, onClose]);

  useEffect(() => {
    setCheckedIngredients({});
    setCopied(false);
  }, [recipe]);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {recipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-sm shadow-2xl border border-neutral-200"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-neutral-500">
                {recipe.category}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  aria-label="Print Recipe"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share Recipe"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors relative cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  {copied && (
                    <span className="absolute -top-7 -right-2 text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close Modal"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors ml-2 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full bg-neutral-100">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-900 font-medium mb-3">
                  {recipe.title}
                </h2>
                <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed font-light">
                  {recipe.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-neutral-100 text-center font-sans">
                <div className="p-2.5 bg-neutral-50 rounded-xs">
                  <span className="text-[10px] uppercase text-neutral-400 font-medium block">Time</span>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xs">
                  <span className="text-[10px] uppercase text-neutral-400 font-medium block">Servings</span>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xs">
                  <span className="text-[10px] uppercase text-neutral-400 font-medium block">Calories</span>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>{recipe.calories || "350 kcal"}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xs">
                  <span className="text-[10px] uppercase text-neutral-400 font-medium block">Rating</span>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{recipe.rating || 4.9} / 5.0</span>
                  </div>
                </div>
              </div>

              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div>
                  <h3 className="font-editorial text-2xl text-neutral-900 mb-3">Ingredients</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-3">Tap items to mark as prepared:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-sm">
                    {recipe.ingredients.map((ing, idx) => {
                      const isChecked = !!checkedIngredients[idx];
                      return (
                        <li
                          key={idx}
                          onClick={() => toggleIngredient(idx)}
                          className={`flex items-start gap-2.5 p-2 rounded-xs border transition-all cursor-pointer ${
                            isChecked
                              ? "bg-neutral-100 border-neutral-200 line-through text-neutral-400"
                              : "bg-white border-neutral-100 hover:border-neutral-300 text-neutral-800"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-xs border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                              isChecked
                                ? "bg-neutral-900 border-neutral-900 text-white"
                                : "border-neutral-300"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="font-medium mr-1">{ing.amount}</span>
                          <span>{ing.item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="pt-2">
                  <h3 className="font-editorial text-2xl text-neutral-900 mb-4">Step-by-Step Instructions</h3>
                  <ol className="space-y-4 font-sans text-sm text-neutral-700">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-medium mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed font-light">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
