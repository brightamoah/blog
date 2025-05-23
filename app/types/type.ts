import type { RouteLocationRaw } from "vue-router";

// Define menu items
const routes = {
  home: "/",
  blogs: "/blogs",
  about: "/about",
} as const;

type RouteKeys = keyof typeof routes;

export type MenuItem = {
  name: string;
  route: (typeof routes)[RouteKeys];
};

export interface user {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export interface AuthData extends user {
  password: string;
  confirmPassword: string;
  isLoggedIn: boolean;
  loginFormData: {
    email: string;
    password: string;
    rememberMe?: boolean;
  };
  registerFormData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const links = {
  home: "/",
  blogs: "/blogs",
  about: "/about",
  contact: "/contact",
  faq: "/",
  support: "/support",
  featured: "/featured",
  categories: "/categories",
} as const;
type FooterLinkKey = keyof typeof links;

export interface FooterLink {
  route: (typeof links)[FooterLinkKey];
  text: string;
  hash?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PostForm {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Post {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface BlogStore {
  categories: string[];
  postForm: PostForm;
  isSearchOpen: boolean;
  searchQuery: string;
  searchResults: Post[];
  selectedCategory: string | null;
  featuredPosts: Post[];
  latestPosts: Post[];
  filteredLatestPosts: Post[];
  searchPosts: () => void;
  clearSearch: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

//create the comment type
export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

export type ScrollDirection = "horizontal" | "vertical";

export type ScrollToAlignment = "auto" | "start" | "center" | "end";
