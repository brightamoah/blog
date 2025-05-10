<script setup lang="ts">
import type { MenuItem } from "~/types/type";

const props = defineProps<{
  menuItems: MenuItem[];
  isActiveRoute: (route: MenuItem["route"]) => boolean;
  isMobileMenuOpen: boolean;
}>();

const emit = defineEmits(["update:isMobileMenuOpen"]);

const mobileMenuOpen = computed(() => props.isMobileMenuOpen);

const closeMobileMenu = () => {
  emit("update:isMobileMenuOpen", false);
};
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="mb-2 space-y-1 rounded-lg bg-white/90 py-2 shadow-lg backdrop-blur-lg md:hidden dark:bg-gray-900/90"
      >
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.route"
          class="mx-2 block rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100/80 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary"
          :class="{
            'bg-blue-100/80 font-bold text-primary dark:bg-gray-800/80':
              isActiveRoute(item.route),
          }"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
