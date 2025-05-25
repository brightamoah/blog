<template>
  <div>
    <AppNavbar />

    <!-- <UContainer class="flex w-full flex-col gap-4 md:flex-row bg-red-400">
      <slot />
    </UContainer> -->

    <div class="flex h-[calc(100vh-100px)] w-full flex-col gap-4 md:flex-row">
      <aside
        class="mt-6 hidden h-[calc(100vh-100px)] w-full shrink-0 overflow-y-auto md:mt-0 lg:block md:w-72 lg:w-80"
      >
        <div class="bg-card min-h-full shadow">
          <BlogLeftSide />
        </div>
      </aside>

      <main class="px-3 min-w-0 flex-1 md:px-4 lg:px-5 overflow-y-auto no-scrollbar mt-2">
        <div class="bg-card min-h-full p-4 ">
          <slot />
        </div>
      </main>

      <aside
        class="mt-6 hidden h-[calc(100vh-100px)] w-full shrink-0 overflow-y-auto md:mt-0 md:block md:w-72 lg:w-80"
      >
        <div class="bg-card min-h-full shadow">
          <BlogLeftSide />
        </div>
      </aside>
    </div>

    <!-- <AppFooter /> -->
  </div>
</template>

<script lang="ts" setup>
// No script content needed
</script>

<style>
/* You can add global styles for the blog layout here */
</style>
