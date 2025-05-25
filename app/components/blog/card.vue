<script lang="ts" setup>
import type { Blog } from "~/types/type";

defineProps<{
  blog: Blog;
}>();
</script>

<template>
  <UCard
    variant="soft"
    class="group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
  >
    <div class="mb-4 aspect-video overflow-hidden rounded-lg">
      <NuxtImg
        :src="blog.thumbnail"
        class="h-full w-full transition-transform duration-500 group-hover:scale-105 hover:cursor-pointer object-cover"
        :alt="blog.title"
        @click="viewPostDetail(blog.path)"
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
        @click="viewPostDetail(blog.path)"
      >
        {{ blog.title }}
      </h3>
      <p class="mb-4 line-clamp-2 flex-grow text-muted h-12 overflow-hidden">
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
</template>

<style></style>
