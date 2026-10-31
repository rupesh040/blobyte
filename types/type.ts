export interface SocialLink {
  platform: "facebook" | "instagram" | "pinterest" | "twitter" | "linkedin" | "youtube";
  url: string;
  ariaLabel: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderData {
  logo: {
    image?: string;
  };
  navigation: NavLink[];
  socials: SocialLink[];
}

export interface HeroCard {
  id: string;
  title: string;
  alt: string;
  image: string;
}

export interface HeroData {
  cards: HeroCard[];
  tagline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface AboutData {
  badge: string;
  title: string;
  chefName: string;
  chefRole: string;
  chefImage: string;
  paragraphs: string[];
}

export type RecipeCategory =
  | "ALL"
  | "SOUPS"
  | "PASTA"
  | "BREAKFAST"
  | "SALADS"
  | "MAIN COURSE"
  | "DESSERTS"
  | "SNACKS";

export interface RecipeIngredient {
  item: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: RecipeCategory;
  cookingTime: string;
  servings: string;
  image: string;
  description: string;
  difficulty?: "Easy" | "Medium" | "Advanced";
  calories?: string;
  rating?: number;
  ingredients?: RecipeIngredient[];
  instructions?: string[];
}

export interface RecipesSectionData {
  kicker: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: Recipe[];
}

export interface FeaturedRecipeData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  mainCard: {
    title: string;
    description: string;
    image: string;
    cookingTime: string;
    servings: string;
  };
  backgroundCards: Array<{
    id: string;
    image: string;
    label: string;
    rotationClass: string;
  }>;
}

export interface BlogInstructionStep {
  step: string;
  title: string;
  description: string;
}

export interface RelatedRecipeItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  href?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content?: string[];
  intro?: string;
  ingredients?: string[];
  instructions?: BlogInstructionStep[];
  relatedRecipes?: RelatedRecipeItem[];
  author?: string;
  tags?: string[];
}

export interface BlogSectionData {
  kicker: string;
  title: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  posts: BlogPost[];
}

export interface FooterData {
  footerBgImage?: string;
  logo: {
    image?: string;
  };
  navigation: NavLink[];
  socials: SocialLink[];
  copyright: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FaqData {
  badge?: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  items: FaqItem[];
}

export interface ContactInfoItem {
  icon: "mail" | "location" | "clock" | "phone";
  label: string;
  value: string;
  href?: string;
}

export interface ContactData {
  kicker: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  infoItems: ContactInfoItem[];
  formTitle: string;
}

export interface ContentData {
  navbar: HeaderData;
  hero: HeroData;
  about: AboutData;
  recipesSection: RecipesSectionData;
  featuredRecipe: FeaturedRecipeData;
  faq?: FaqData;
  blogSection?: BlogSectionData;
  contact?: ContactData;
  footer: FooterData;
}
