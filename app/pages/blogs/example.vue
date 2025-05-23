<script lang="ts" setup>
import type { Post } from "~/types/type";

definePageMeta({
  layout: "blog",
});

const blogStore = useBlogStore();
const isLoading = ref<boolean>(false);
const {
  featuredPosts: oldPosts,
  latestPosts,
  categories,
  selectedCategory,
  filteredLatestPosts,
} = storeToRefs(blogStore);

const { data: blog, pending, error, refresh } = await useFetch("/api/blog");

const featuredPosts = computed(() => {
  const post = [...oldPosts.value, ...(blog.value || [])];
  return post as Post[];
});

const selectCategory = (category: Post["category"]) => {
  if (selectedCategory.value === category) return;

  selectedCategory.value = category;
};

// Set default category on component mount
onMounted(() => {
  if (!selectedCategory.value && categories.value.length > 0) {
    selectedCategory.value = categories.value[0] ?? null; // Default to first category
  }
});

const loadMorePosts = async () => {
  isLoading.value = true;
  console.log("button clicked");

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await refresh();
  } catch (error) {
    console.error("Error loading more posts:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto mb-10">
    <main class="container mx-auto px-4">
      <!-- Hero Section -->
      <BlogMain :featuredPosts />

      <!-- Latest Posts Section -->
      <section class="mb-16">
        <BlogCategorySelector
          :categories="categories"
          :selectedCategory="selectedCategory"
          @update:selectedCategory="selectCategory"
        />

        <div
          class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          v-auto-animate
        >
          <BlogFiltered :filtered-latest-posts="filteredLatestPosts" />
        </div>

        <div class="mt-12 flex justify-center">
          <UButton
            variant="solid"
            color="primary"
            trailing-icon="i-lucide-loader"
            class="cursor-pointer rounded-full px-4 py-3 text-center text-base font-semibold transition-all duration-200 hover:bg-primary/80"
            :disabled="isLoading"
            size="xl"
            :ui="{ trailingIcon: isLoading ? 'animate-spin' : '' }"
            @click="loadMorePosts()"
          >
            Load More
          </UButton>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
