<script lang="ts" setup>
const route = useRoute();

const { data: blogs } = await useAsyncData(
  route.path,
  () => queryCollection("blogs").order("date", "DESC").all(),
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
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            variant="soft"
            v-for="blog in blogs"
            :key="blog.id"
            class="group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div class="mb-4 aspect-video overflow-hidden rounded-lg">
              <NuxtImg
                :src="blog.thumbnail"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 hover:cursor-pointer"
                :alt="blog.title"
              />
            </div>

            <div v-if="blog.date" class="mb-3 flex items-start gap-2">
              <UIcon name="i-lucide-calendar" class="h-4 w-4 text-gray-400" />
              <time class="text-sm font-medium tracking-wide text-gray-500">
                {{ useDateFormat(blog.date, "MMM DD, YYYY") }}
              </time>
            </div>

            <div class="flex flex-col">
              <h3
                class="mb-3 text-xl font-bold transition-colors group-hover:text-primary hover:cursor-pointer"
              >
                {{ blog.title }}
              </h3>
              <p class="mb-4 line-clamp-2 flex-grow text-muted">
                {{ blog.description }}
              </p>
            </div>

            <div class="flex flex-wrap items-start gap-1.5">
              <UBadge
                variant="subtle"
                color="primary"
                v-for="tag in blog.tags"
                :key="tag"
                class="inline-block rounded-full px-3 text-center text-sm font-semibold"
              >
                {{ tag }}
              </UBadge>
            </div>

            <template #footer>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <NuxtImg
                    :src="blog.author?.avatar || blog.thumbnail"
                    class="h-8 w-8 rounded-full"
                    :alt="blog.title"
                  />
                  <div class="flex flex-col">
                    <p class="text-sm font-medium">{{ blog.author?.name }}</p>
                    <small class="font-cursive text-muted">{{
                      blog.author?.role
                    }}</small>
                  </div>
                </div>
                <UButton
                  variant="link"
                  trailing-icon="i-lucide-arrow-right"
                  color="neutral"
                  size="sm"
                  :to="blog.path"
                  class="flex cursor-pointer items-center gap-1 rounded-4xl p-2 text-base font-medium text-primary hover:text-primary hover:underline"
                >
                  Read more
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>

      <p v-else>No blog posts found.</p>
    </div>

    <div v-else>
      <h1>Loading...</h1>
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
