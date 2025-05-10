<!-- components/AppNavbar.vue -->
<template>
  <div
    class="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 shadow-md backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-900/80"
  >
    <div class="container mx-auto px-4 md:w-[90%]">
      <nav class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NavLogo />

        <!-- Desktop Menu -->
        <NavDesktop :menu-items="menuItems" :is-active-route="isActiveRoute" />

        <!-- Right Section: Auth Button & Theme Toggle -->
        <div class="flex items-center space-x-4">
          <!-- Auth Button -->
          <div>
            <UButton
              variant="solid"
              color="primary"
              size="sm"
              class="rounded-full px-5 font-medium transition-transform hover:scale-105"
              @click="
                isLoggedIn ? logout() : $router.push({ name: 'auth-login' })
              "
            >
              {{ isLoggedIn ? "Logout" : "Login" }}
            </UButton>
          </div>

          <ToggleTheme class="transition-transform hover:scale-110" />

          <!-- Mobile Menu Button -->
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-bars-3-20-solid"
            class="rounded-lg transition-colors hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </div>
      </nav>

      <!-- Mobile Menu Dropdown -->
      <NavMobile
        ref="mobileMenu"
        :menu-items="menuItems"
        :is-active-route="isActiveRoute"
        v-model:is-mobile-menu-open="isMobileMenuOpen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavDesktop, NavMobile } from "#components";
import type { MenuItem } from "~/types/type";

const route = useRoute();

const menuItems: MenuItem[] = [
  { name: "Home", route: "/" },
  { name: "Blogs", route: "/blogs" },
  { name: "About", route: "/about" },
];

const { logout } = useAuthStore();

const isMobileMenuOpen = ref(false);
const isLoggedIn = computed(() => {
  return useCurrentUser().value !== null;
});


const isActiveRoute = (path: MenuItem["route"]) => {
  // Exact match for home page
  if (path === "/" && route.path === "/") {
    return true;
  }

  // This handles nested routes like /blogs/123 still highlighting the Blogs nav item
  if (path !== "/" && route.path.startsWith(path)) {
    return true;
  }

  return false;
};

const target = useTemplateRef<HTMLElement>("mobileMenu");

onClickOutside(target, (event: MouseEvent) => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    console.log(event);
  }
});
</script>

<style scoped>
.sticky {
  transition: all 0.3s ease;
}
</style>
