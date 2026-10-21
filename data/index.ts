import contentData from "./content.json";
import type { ContentData } from "@/types/type";

export const content = contentData as unknown as ContentData;
export default content;

export const sharedData = {
  navbar: content.navbar,
  footer: content.footer,
  site: content.site,
};

export const homePageData = {
  hero: content.hero,
  pageBanner: content.pageBanner,
  about: content.about,
  recipesSection: content.recipesSection,
  featuredRecipe: content.featuredRecipe,
  momentsGallery: content.momentsGallery,
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

export const getRecipeBySlug = (slug: string) => {
  return content.recipesSection.items.find((item) => item.slug === slug);
};

