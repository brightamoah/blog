<script lang="ts" setup>
const route = useRoute();

const { data: blog } = await useAsyncData(
  route.path,
  () => queryCollection("blogs").path(route.path).first(),
  {
    lazy: true,
  },
);

// console.log(blog.value);

definePageMeta({
  layout: "blog",
});

useSeoMeta({
  title: blog.value?.seo.title,
  description: blog.value?.seo.description,
  ogTitle: blog.value?.seo.title,
  ogDescription: blog.value?.seo.description,
  ogImage: blog.value?.thumbnail,
  twitterImage: blog.value?.thumbnail,
});
</script>

<template>
  <main>
    <div class="mb-12 text-center" v-if="blog">
      <h1
        class="mb-3.5 font-sans text-3xl leading-tight font-bold tracking-tight md:text-5xl lg:text-5xl"
      >
        {{ blog.title }}
      </h1>

      <div class="mb-4 flex flex-wrap justify-center gap-2 md:gap-4">
        <UBadge
          v-for="tag in blog.tags"
          :key="tag"
          color="primary"
          variant="soft"
          size="lg"
          class="text-sm font-medium"
        >
          {{ tag }}
        </UBadge>
      </div>

      <div class="mb-6 flex flex-wrap justify-between gap-4 md:flex-nowrap">
        <div class="flex justify-start gap-3">
          <UAvatar
            :src="blog.author?.avatar"
            :alt="blog.author?.name"
            size="lg"
          />
          <div class="text-left">
            <div class="font-medium">{{ blog.author?.name }}</div>
            <div class="text-muted-foreground text-sm">
              {{ blog.author?.role }}
            </div>
          </div>
        </div>

        <p class="flex justify-start gap-1 text-muted">
          <span class="text-primary">
            <UIcon
              name="i-lucide-calendar-days"
              class="h-4 w-4 md:h-5 md:w-5"
            />
          </span>
          {{ useDateFormat(blog.date, "MMM DD, YYYY") }}
        </p>
      </div>
    </div>

    <div v-if="blog">
      <NuxtImg
        v-if="blog.thumbnail"
        :src="blog.thumbnail"
        :alt="blog.title"
        class="mx-auto mb-4 aspect-video h-full w-full rounded-lg object-fill object-center"
        :loading="blog.thumbnail ? 'lazy' : 'eager'"
      />

      <ContentRenderer v-if="blog" :value="blog" prose />
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </main>
</template>
