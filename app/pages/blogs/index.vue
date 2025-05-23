<script lang="ts" setup>
const route = useRoute();

const { data: blogs } = await useAsyncData(
  route.path,
  () => queryCollection("blogs").order("date", "DESC").all(),
  {
    lazy: true,
  },
);
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
            class="flex h-full flex-col rounded-2xl transition-shadow duration-300 hover:shadow-lg"
          >
            <template #header>
              <div class="h-48 w-full overflow-hidden">
                <NuxtImg
                  v-if="blog.thumbnail"
                  :src="blog.thumbnail"
                  :alt="blog.title"
                  class="h-full w-full rounded-2xl object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-gray-200"
                >
                  <span class="text-gray-400">No image</span>
                </div>
              </div>
            </template>
            <div class="flex flex-grow flex-col p-4">
              <NuxtLink :to="blog.path" class="flex-grow">
                <h2
                  class="mb-2 text-xl font-bold text-blue-600 hover:text-blue-800"
                >
                  {{ blog.title }}
                </h2>
                <p
                  v-if="blog.description"
                  class="mb-4 line-clamp-3 text-gray-600"
                >
                  {{ blog.description }}
                </p>
              </NuxtLink>
              <p v-if="blog.date" class="mt-auto text-sm text-gray-500">
                {{ useDateFormat(blog.date, "dddd, DD MMMM, YYYY") }}
              </p>
            </div>

            <template #footer>
              <div>
                <div class="flex flex-wrap justify-center gap-2">
                  <UBadge
                    variant="subtle"
                    color="primary"
                    v-for="tag in blog.meta.tags"
                    :key="tag"
                    class="inline-block gap-3 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
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
