<!-- components/StarRating.vue -->
<template>
  <div class="flex items-center">
    <div v-for="index in 5" :key="index" class="relative">
      <!-- Base star (empty) -->
      <UIcon
        :name="'i-lucide-star'"
        :class="`h-${size} w-${size} text-gray-300`"
      />

      <!-- Filled star (based on rating) -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ width: getStarWidth(index) + '%' }"
      >
        <UIcon
          :name="'i-lucide-star'"
          :class="`h-${size} w-${size} text-yellow-500`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rating: number;
  starSize: number;
}>();

// Calculate width percentage for each star based on rating
const size = computed(() => props.starSize);

const getStarWidth = (position: number) => {
  const fullStars = Math.floor(props.rating);
  const decimal = props.rating - fullStars;

  if (position <= fullStars) {
    return 100; // Full star
  } else if (position === fullStars + 1) {
    return decimal * 100; // Partial star
  } else {
    return 0; // Empty star
  }
};
</script>

<style scoped>
/* Optional: Add a small transition for smooth changes */
.absolute {
  transition: width 0.3s ease;
}
</style>
