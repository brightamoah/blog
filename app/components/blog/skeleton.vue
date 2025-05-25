<template>
  <UCard class="flex h-full flex-col">
    <!-- Thumbnail skeleton -->
    <USkeleton class="mb-4 aspect-video w-full rounded-lg" />

    <!-- Date skeleton -->
    <div class="mb-3 flex items-start gap-2">
      <USkeleton class="h-4 w-4 rounded-full" />
      <USkeleton class="h-4 w-24" />
    </div>

    <!-- Title and description skeleton -->
    <div class="flex flex-col">
      <USkeleton class="mb-3 h-7 w-3/4" />
      <USkeleton class="mb-2 h-4 w-full" />
      <USkeleton class="mb-4 h-4 w-5/6" />
    </div>

    <!-- Tags skeleton -->
    <div class="mb-4 flex flex-wrap items-start gap-1.5">
      <USkeleton v-for="j in 3" :key="j" class="h-6 w-16 rounded-full" />
    </div>

    <!-- Footer skeleton -->
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <USkeleton class="h-8 w-8 rounded-full" />
          <div class="flex flex-col">
            <USkeleton class="h-4 w-24" />
            <USkeleton class="h-3 w-20" />
          </div>
        </div>
        <USkeleton class="h-8 w-24" />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup></script>

<style></style>
