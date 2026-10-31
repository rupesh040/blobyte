"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Recipes } from "@/components/Recipes";
import { FeaturedRecipe } from "@/components/FeaturedRecipe";
import { BlogSection } from "@/components/BlogSection";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { RecipeModal } from "@/components/RecipeModal";
import { BlogModal } from "@/components/BlogModal";
import {
  homePageData,
  blogData,
  faqData,
  contactData,
} from "@/data";
import type { Recipe, BlogPost } from "@/types/type";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="relative">
      <Hero data={homePageData.hero} />
      <About data={homePageData.about} />
      <Recipes
        data={homePageData.recipesSection}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />
      <FeaturedRecipe data={homePageData.featuredRecipe} />
      <BlogSection
        data={blogData}
        onSelectPost={(post) => setSelectedPost(post)}
      />
      <Faq data={faqData} />
      <Contact data={contactData} />
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
