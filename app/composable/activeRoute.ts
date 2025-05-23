import type { FooterLink } from "~/types/type";

export const useIsActiveRoute = (path: FooterLink["route"]) => {
  const route = useRoute();
  if (path === "/" && route.path === "/") {
    return true;
  }

  // Check if the current route matches the given path
  if (route.path === path) {
    return true;
  }

  // Handle nested routes like /blogs/123 still highlighting the Blogs nav item
  if (path !== "/" && route.path.startsWith(path)) {
    return true;
  }

  return false;
};
