"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { PageBanner } from "@/components/PageBanner";
import { About } from "@/components/About";
import { Recipes } from "@/components/Recipes";
import { FeaturedRecipe } from "@/components/FeaturedRecipe";
import { MomentsGallery } from "@/components/MomentsGallery";
import { RecipeModal } from "@/components/RecipeModal";
import { homePageData, recipes } from "@/data";
import type { Recipe } from "@/types/type";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const featuredReferenceRecipe = recipes[0];

  return (
    <div className="relative">
      <Hero data={homePageData.hero} />

      <About data={homePageData.about} />

      <Recipes
        data={homePageData.recipesSection}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

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
