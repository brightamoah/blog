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

      <div
        v-else-if="blogs && blogs.length > 0"
        class="grid w-full grid-cols-1 gap-6 p-3"
      >
        <NuxtLink
          v-for="post in blogs"
          :key="post.id"
          class="group relative mb-5 h-[220px] cursor-pointer overflow-hidden rounded-xl shadow-md"
          :to="post.path"
        >
          <NuxtImg
            :src="post.thumbnail"
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
                {{ post.tags[0] }}
              </span>
              <p class="mt-1 flex items-center gap-1 text-sm font-semibold">
                <UIcon name="i-lucide-calendar-days" class="h-4 w-4" />
                <span>{{ useDateFormat(post.date, "MMM D, YYYY") }}</span>
              </p>
            </div>
            <h3 class="text-lg leading-tight font-bold">{{ post.title }}</h3>

            <p class="w-full line-clamp-2">{{ post.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style></style>
