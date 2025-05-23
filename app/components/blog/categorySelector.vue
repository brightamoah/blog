<script lang="ts" setup>
defineProps<{
  categories: string[];
  selectedCategory: string | null;
}>();

const emit = defineEmits<{
  (e: "update:selectedCategory", category: string): void;
}>();

function selectCategory(category: string) {
  emit("update:selectedCategory", category);
}
</script>

<template>
  <div
    class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <h2 class="text-xl font-bold sm:text-2xl md:text-3xl">Latest Posts</h2>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'cursor-pointer rounded-full px-4 py-2 text-sm font-medium shadow-md transition-all',
          selectedCategory === category
            ? 'bg-primary text-white shadow-lg'
            : 'bg-muted hover:bg-muted/80 hover:shadow',
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style></style>
