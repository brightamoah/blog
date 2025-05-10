<script setup lang="ts"></script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <NuxtLink to="/" class="group flex items-center">
      <div
        class="flex items-center justify-center rounded-md text-xl font-bold transition-transform duration-300 group-hover:scale-105"
      >
        <img src="~/assets/svgs/logo.svg" alt="logo" class="h-10 w-10" />
      </div>
      <p class="ml-2 hidden font-raleway text-3xl font-bold uppercase sm:block">
        <span class="text-black dark:text-white"> My</span>
        <span class="text-primary transition-colors duration-300">-Blog</span>
      </p>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
