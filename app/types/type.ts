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
