export interface SocialLink {
  platform: "facebook" | "instagram" | "pinterest" | "twitter" | "linkedin" | "youtube";
  url: string;
  ariaLabel: string;
}

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderData {
  logo: {
    brandName: string;
    subtext?: string;
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
  caption?: string;
  orientation?: "portrait" | "landscape" | "square";
}

export interface HeroData {
  cards: HeroCard[];
  tagline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerData {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export interface AboutData {
  badge: string;
  title: string;
  chefName: string;
  chefRole: string;
  chefImage: string;
  paragraphs: string[];
  ctaText: string;
  ctaHref: string;
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
  isFeatured?: boolean;
  difficulty?: "Easy" | "Medium" | "Advanced";
  calories?: string;
  rating?: number;
  reviewsCount?: number;
  author?: {
    name: string;
    avatar?: string;
  };
  ingredients?: RecipeIngredient[];
  instructions?: string[];
  tags?: string[];
}

export interface RecipesSectionData {
  kicker: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  categories: RecipeCategory[];
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

export interface MomentGalleryItem {
  id: string;
  image: string;
  title: string;
  likes: number;
  instagramUrl: string;
}

export interface MomentsGalleryData {
  kicker?: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  items: MomentGalleryItem[];
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
  bannerImage?: string;
  footerBgImage?: string;
  logo: {
    brandName: string;
    subtext?: string;
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
  site: {
    name: string;
    tagline: string;
    description: string;
    logoImage?: string;
  };
  navbar: HeaderData;
  hero: HeroData;
  pageBanner?: PageBannerData;
  about: AboutData;
  recipesSection: RecipesSectionData;
  featuredRecipe: FeaturedRecipeData;
  momentsGallery: MomentsGalleryData;
  faq?: FaqData;
  blogSection?: BlogSectionData;
  contact?: ContactData;
  footer: FooterData;
}



