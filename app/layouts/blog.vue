<template>
  <div>
    <AppNavbar />

    <div class="w-full flex flex-col md:flex-row h-[calc(100vh-100px)] gap-4">
      <!-- Main content with its own scroll -->
      <main class="min-w-0 flex-1 overflow-y-auto">
      <div class="bg-card p-4 shadow min-h-full">
        <slot />
      </div>
      </main>

      <!-- Sidebar (scrollable if content overflows) -->
      <aside class="w-full md:w-72 lg:w-80 mt-6 md:mt-0 shrink-0 h-[calc(100vh-100px)] overflow-y-auto">
      <div class="bg-card p-4 shadow min-h-full">
        <BlogLeftSide />
      </div>
      </aside>
    </div>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
// No script content needed
</script>

<style>
/* You can add global styles for the blog layout here */
</style>
