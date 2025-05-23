<script lang="ts" setup>
import type { Post } from "~/types/type";

const blogStore = useBlogStore();
const {
  // featuredPosts,
  latestPosts,
  categories,
  selectedCategory,
  filteredLatestPosts,
  fetchedPosts,
} = storeToRefs(blogStore);

const posts = await fetchedPosts.value;

const featuredPosts = computed(() => {
  const newPosts = posts.slice(1, 30);
  return newPosts;
});



</script>
<template>
  <div class="space-y-6">
    <h2 class="text-center text-2xl font-bold">Featured Posts</h2>

    <div
      v-for="(post, index) in featuredPosts"
      :key="index"
      class="group relative h-[220px] cursor-pointer overflow-hidden rounded-xl shadow-md"
      @click="goToPost(post.id)"
    >
      <NuxtImg
        :src="post.image"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        :alt="post.title"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      ></div>
      <div class="absolute bottom-0 left-0 p-5 text-white">
        <div class="mb-2 flex items-center gap-2">
          <span
            class="text-primary-foreground rounded-full bg-primary px-2 py-1 text-xs font-medium"
          >
            {{ post.category }}
          </span>
          <span class="text-xs font-light opacity-90">{{ post.date }}</span>
        </div>
        <h3 class="text-lg leading-tight font-bold">{{ post.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style></style>
