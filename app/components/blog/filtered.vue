<script lang="ts" setup>
import type { Post } from "~/types/type";

defineProps<{
  filteredLatestPosts: Post[];
}>();
</script>

<template>
  <div
    v-for="post in filteredLatestPosts"
    :key="post.id"
    class="group bg-card flex cursor-pointer flex-col rounded-xl p-4 shadow-lg transition-all hover:shadow-md"
    @click="goToPost(post.id)"
  >
    <div class="mb-4 aspect-video overflow-hidden rounded-lg">
      <NuxtImg
        :src="post.image"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        :alt="post.title"
      />
    </div>
    <div class="mb-3 flex items-center gap-2">
      <span
        class="text-muted-foreground rounded-full bg-muted px-3 py-1 text-xs font-medium"
      >
        {{ post.category }}
      </span>
      <span class="text-muted-foreground text-sm">{{ post.date }}</span>
    </div>
    <h3
      class="mb-3 text-xl font-bold transition-colors group-hover:text-primary"
    >
      {{ post.title }}
    </h3>
    <p class="text-muted-foreground mb-4 line-clamp-2 flex-grow">
      {{ post.excerpt }}
    </p>
    <div
      class="border-border mt-2 flex items-center justify-between border-t pt-4"
    >
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="post.author.avatar"
          class="h-8 w-8 rounded-full"
          :alt="post.author.name"
        />
        <span class="text-sm font-medium">{{ post.author.name }}</span>
      </div>
      <UButton
        variant="ghost"
        trailing-icon="i-lucide-arrow-right"
        color="neutral"
        size="sm"
        class="inline-flex cursor-pointer items-center gap-1 rounded-4xl p-2 font-medium text-primary hover:underline"
      >
        Read more
      </UButton>
    </div>
  </div>
</template>

<style></style>
