<script setup lang="ts">
import type { FeatureCard } from "~/types/type";
import { cardColorUtils } from "~/utils/cardColor";

const {
  getIconClass,
  getIconBgClass,
  getBorderClass,
  getHoverTextClass,
  getAnimationClass,
} = cardColorUtils();

defineProps<{
  cards: FeatureCard[];
  delay?: boolean;
}>();
</script>

<template>
  <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="(card, index) in cards"
      :key="card.id"
      :class="[
        'group relative overflow-hidden rounded-xl border-2 bg-white p-6 shadow-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md dark:bg-gray-800/90',
        getBorderClass(card.color),
        getAnimationClass(index, delay),
      ]"
      class="border"
    >
      <!-- Decorative background gradient -->
      <div
        class="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-5"
      >
        <div
          :class="`absolute inset-0 rounded-xl bg-gradient-to-br from-${card.color}-200 to-${card.color}-500`"
        ></div>
      </div>

      <!-- Icon container -->
      <div
        :class="[
          'mb-4 flex h-14 w-14 items-center justify-center rounded-full p-3 transition-transform duration-300 group-hover:scale-110',
          getIconBgClass(card.color),
        ]"
      >
        <UIcon
          :name="card.icon"
          class="h-7 w-7 transition-transform duration-300"
          :class="getIconClass(card.color)"
        />
      </div>

      <!-- Content -->
      <h3
        class="mb-2 text-lg font-semibold tracking-tight transition-colors"
        :class="getHoverTextClass(card.color)"
      >
        {{ card.title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ card.description }}
      </p>

      <!-- Subtle arrow icon for visual interest -->
      <div class="mt-4 flex justify-end">
        <UIcon
          name="i-heroicons-arrow-right"
          class="h-4 w-0 text-gray-400 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add a subtle shine effect on hover */
.group:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.7s ease;
  pointer-events: none;
  z-index: 1;
  animation: shine 1.5s ease;
}

@keyframes shine {
  100% {
    left: 200%;
  }
}
</style>
