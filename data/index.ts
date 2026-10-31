import contentData from "./content.json";
import type { ContentData } from "@/types/type";

export const content = contentData as unknown as ContentData;
export default content;

export const sharedData = {
  navbar: content.navbar,
  footer: content.footer,
};

export const homePageData = {
  hero: content.hero,
  about: content.about,
  recipesSection: content.recipesSection,
  featuredRecipe: content.featuredRecipe,
  faq: content.faq,
};

export const faqData = content.faq!;
export const blogData = content.blogSection!;
export const blogPosts = content.blogSection?.posts || [];
export const contactData = content.contact!;

export const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

export const recipes = content.recipesSection.items;

