<template>
  <div>
    <AppNavbar />

    <UContainer class="flex w-full flex-col gap-4 md:flex-row ">
      <slot />
    </UContainer>

    <!-- <div class="flex h-[calc(100vh-100px)] w-full flex-col gap-4 md:flex-row">
     
      <main class="min-w-0 flex-1 overflow-y-auto">
        <div class="bg-card min-h-full p-4 shadow">
          <slot />
        </div>
      </main>

 
      <aside class="w-full md:w-72 lg:w-80 mt-6 md:mt-0 shrink-0 h-[calc(100vh-100px)] overflow-y-auto">
      <div class="bg-card p-4 shadow min-h-full">
        <BlogLeftSide />
      </div>
      </aside>
    </div> -->

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
// No script content needed
</script>

<style>
/* You can add global styles for the blog layout here */
</style>
