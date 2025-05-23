<script lang="ts" setup>
useHead({
  title: "My Blog App",
  meta: [{ name: "description", content: "My Blog App" }],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicons/favicon.ico" }],
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
/* add page tarnsition  */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
