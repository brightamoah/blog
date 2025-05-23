<script setup lang="ts">
// import InfiniteScroll from "@binbinji/vue3-infinite-scroll";
import blogData from "~/blogs.json";
import type { Post } from "~/types/type";
const sortedBlogs = computed(() => {
  return [...blogData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
});

const getParentContainerWidth = (): number => {
  if (typeof window !== "undefined" && document) {
    const container = document.querySelector(".infinite-list");
    if (container && container.parentElement) {
      return container.parentElement.clientWidth;
    }
  }
  return 0;
};

const getItemSize = (index: number): number => {
  // Try to get the container width and set item size based on it
  const containerWidth = getParentContainerWidth();
  // Example: set item height as a ratio of container width, or fallback to a default
  if (containerWidth > 0) {
    // You can adjust the ratio as needed
    return Math.max(80, Math.floor(containerWidth * 0.15));
  }
  // Fallback if container width is not available
  return 120;
};

const getScreenHeight = () => {
  if (typeof window !== "undefined" && document) {
    return window.innerHeight;
  }

  return 0;
};

console.log(getScreenHeight() - 100);
</script>

<template>
  <div class="infinite-list h-screen w-full">
    <InfiniteScroll
    width="100%"
      :height="getScreenHeight() - 100"
      :itemSize="getItemSize"
      :data="sortedBlogs"
      v-slot="{ item }: { item: Post }"
    >
      <div class="infinite-list-item flex flex-col md:flex-row items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 mb-4">
        <NuxtImg
          :src="item.image"
          class="w-full md:w-48 h-40 object-cover rounded-lg border"
          alt="Blog image"
        />
        <div class="flex-1 flex flex-col justify-between h-full">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ item.title }}</h1>
          <div class="flex flex-wrap gap-2 items-center mb-2">
        <span class="text-sm text-gray-500">By {{ item.author }}</span>
        <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{{ item.category }}</span>
          </div>
          <p class="text-gray-600 mb-2 line-clamp-3">{{ item.excerpt }}</p>
          <p class="text-xs text-gray-400 mt-auto">
        {{ useDateFormat(item.date, "dddd, DD MMMM, YYYY  HH:mm:ss") }}
          </p>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>

<style scoped>
.infinite-list-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #555;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
