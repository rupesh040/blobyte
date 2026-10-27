"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { Recipes } from "@/components/Recipes";
import { RecipeModal } from "@/components/RecipeModal";
import { homePageData } from "@/data";
import type { Recipe } from "@/types/type";

export default function RecipePage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="relative">
      <PageBanner
        title="Recipes"
        image="/page-banner.webp"
      />
      <Recipes
        data={homePageData.recipesSection}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
        showViewMore={false}
      />
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}