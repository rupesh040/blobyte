"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { About } from "@/components/About";
import { FeaturedRecipe } from "@/components/FeaturedRecipe";
import { MomentsGallery } from "@/components/MomentsGallery";
import { RecipeModal } from "@/components/RecipeModal";
import { homePageData, recipes } from "@/data";
import type { Recipe } from "@/types/type";

export default function AboutPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const featuredReferenceRecipe = recipes[0];
  return (
    <div className="relative">
      <PageBanner data={homePageData.pageBanner} />

      <About data={homePageData.about} />

      <FeaturedRecipe
        data={homePageData.featuredRecipe}
        recipeReference={featuredReferenceRecipe}
        onExploreRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

      <MomentsGallery data={homePageData.momentsGallery} />

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
