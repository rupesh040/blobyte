"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { About } from "@/components/About";
import { Recipes } from "@/components/Recipes";
import { MomentsGallery } from "@/components/MomentsGallery";
import { RecipeModal } from "@/components/RecipeModal";
import { homePageData } from "@/data";
import type { Recipe } from "@/types/type";

export default function AboutPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="relative">
      <PageBanner data={homePageData.pageBanner} />

      <About data={homePageData.about} />

      <Recipes
        data={homePageData.recipesSection}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

      <MomentsGallery data={homePageData.momentsGallery} />

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
