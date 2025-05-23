<script lang="ts" setup>
import type { Post } from "~/types/type";

defineProps<{
  featuredPosts: Post[];
}>();
</script>

<template>
  <section class="mb-16">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <div
          class="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg"
        >
          <NuxtImg
            :src="featuredPosts[0]?.image || 'https://placehold.co/800x400'"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt="Featured post"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-8 text-white">
            <div class="mb-3 flex items-center gap-3">
              <span
                class="text-primary-foreground rounded-full bg-primary px-3 py-1 text-xs font-medium"
              >
                {{ featuredPosts[0]?.category }}
              </span>
              <span class="text-sm font-light opacity-90">{{
                featuredPosts[0]?.date
              }}</span>
            </div>
            <h2
              class="mb-3 cursor-pointer text-3xl leading-tight font-bold"
              @click="goToPost(featuredPosts[0]?.id || 0)"
            >
              {{ featuredPosts[0]?.title }}
            </h2>
            <p class="mb-5 line-clamp-2 text-lg opacity-90">
              {{ featuredPosts[0]?.excerpt }}
            </p>
            <div class="flex items-center gap-3">
              <NuxtImg
                :src="featuredPosts[0]?.author.avatar"
                class="h-10 w-10 rounded-full border-2 border-white/30"
                :alt="featuredPosts[0]?.author.name"
              />
              <span class="font-medium">{{
                featuredPosts[0]?.author.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
