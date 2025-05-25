<script lang="ts" setup>
import type { Blog } from "~/types/type";

// const blogStore = useBlogStore();
// const {
//   // featuredPosts,
//   latestPosts,
//   categories,
//   selectedCategory,
//   filteredLatestPosts,
//   fetchedPosts,
// } = storeToRefs(blogStore);

// const posts = await fetchedPosts.value;

// const featuredPosts = computed(() => {
//   const newPosts = posts.slice(1, 30);
//   return newPosts;
// });

const route = useRoute();

const { data: blogs, pending } = await useAsyncData<Blog[]>(
  "featured-blogs",
  async () => {
    const response = await queryCollection("blogs").order("date", "DESC").all();

    // Transform the response to match the Blog type
    return response.map((item) => ({
      id: item.id,
      title: item.title,
      path: item.path || `/blogs/${item.id}`,
      thumbnail: item.thumbnail || "",
      description: item.description || "",
      date: item.date || new Date().toISOString(),
      tags: item.tags || [],
      readTime: item.readTime,
      author: {
        name: item.author?.name || "Anonymous",
        avatar: item.author?.avatar || "/default-avatar.png",
        role: item.author?.role || "",
      },
    }));
  },
);

// Extract unique tags from all blog posts
const allTags = computed(() => {
  if (!blogs.value) return [];

  const tags = blogs.value.flatMap((blog) => blog.tags || []);
  return [...new Set(tags)].slice(0, 10); // Get unique tags, limit to 10
});
</script>
<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-center text-2xl font-bold">Featured Posts</h2>

      <div v-if="pending" class="space-y-4">
        <div v-for="i in 5" :key="i" class="flex gap-3">
          <USkeleton class="h-16 w-16 rounded" />
          <div class="flex-1">
            <USkeleton class="mb-2 h-4 w-full" />
            <USkeleton class="h-3 w-1/2" />
          </div>
        </div>
      </div>

      <div v-else-if="blogs && blogs.length" class="space-y-4">
        <NuxtLink
          v-for="blog in blogs"
          :key="blog.id"
          :to="blog.path"
          class="flex gap-3 rounded-md p-2 transition-colors hover:bg-gray-100"
        >
          <NuxtImg
            v-if="blog.thumbnail"
            :src="blog.thumbnail"
            class="h-16 w-16 rounded object-cover"
            :alt="blog.title"
          />
          <div
            v-else
            class="flex h-16 w-16 items-center justify-center rounded bg-gray-200"
          >
            <UIcon name="i-lucide-image" class="h-6 w-6 text-gray-400" />
          </div>

          <div>
            <h3 class="line-clamp-2 font-medium">{{ blog.title }}</h3>
            <p class="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <UIcon name="i-lucide-calendar" class="h-4 w-4" />
              <span>{{ useDateFormat(blog.date, "MMM D, YYYY") }}</span>
            </p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="rounded-md bg-gray-50 p-4 text-center text-gray-500">
        No featured posts available
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-xl font-bold">Popular Tags</h2>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in allTags"
          :key="tag"
          variant="soft"
          color="primary"
          class="cursor-pointer"
          :to="`/blogs?tag=${tag}`"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>
  </div>
</template>

<style></style>
