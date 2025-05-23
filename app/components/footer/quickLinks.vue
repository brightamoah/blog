<script setup lang="ts">
import { useIsActiveRoute } from "~/composable/activeRoute";
import type { FooterLink } from "~/types/type";

const resourceLinks: FooterLink[] = [
  { route: "/", text: "Home" },
  { route: "/blogs", text: "Blogs" },
  { route: "/featured", text: "Featured" },
  { route: "/categories", text: "Categories" },
];
</script>

<template>
  <div class="md:col-span-2 lg:col-span-2">
    <h3 class="footer-heading">Quick Links</h3>
    <ul class="footer-link-list">
      <li v-for="link in resourceLinks" :key="link.text">
        <ULink
          :to="link.route"
          :class="[
            'footer-link',
            useIsActiveRoute(link.route) ? 'active-link' : 'inactive-link',
          ]"
        >
          {{ link.text }}
        </ULink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "@/assets/css/footer.css";
</style>
