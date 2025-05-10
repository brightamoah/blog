<script setup lang="ts">
import type { MenuItem } from '~/types/type';

defineProps<{ menuItems: MenuItem[], isActiveRoute: (route: MenuItem['route']) => boolean }>();


</script>

<template>
   <div class="hidden md:flex md:items-center md:space-x-8">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.route"
            class="relative px-3 py-2 text-lg font-medium  transition-colors duration-300 hover:text-primary  dark:hover:text-primary"
            :class="{
              'font-bold text-primary': isActiveRoute(item.route),
            }"
          >
            {{ item.name }}
            <div
              v-if="isActiveRoute(item.route)"
              class="absolute bottom-0 left-0 h-0.5 w-full transform rounded-full bg-primary transition-all duration-300"
            ></div>
          </NuxtLink>
        </div>
</template>

<style scoped>

</style>