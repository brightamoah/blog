<script lang="ts" setup>
import type { Blog } from "~/types/type";

const route = useRoute();

const { data: blogs } = await useAsyncData<Blog[]>(
  route.path,
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
  {
    lazy: true,
  },
);

definePageMeta({
  layout: "blog",
});
</script>

<template>
  <UContainer class="mt-10 mb-10">
    
    <div v-if="blogs">
      <div v-if="blogs.length > 0" class="blog-list">
        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          v-auto-animate
        >
          <BlogCard :blog v-for="blog in blogs" :key="blog.id" />
        </div>
      </div>

      <p v-else v-auto-animate>No blog posts found.</p>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        v-auto-animate
      >
        <BlogSkeleton v-for="i in 3" :key="i" />
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
/* .blog-list {
  margin-top: 20px;
}
.blog-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
} */
</style>
