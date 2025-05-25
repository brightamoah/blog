<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection("blogs").path(route.path).first(),
  {
    lazy: true,
  },
);

console.log(page.value);
</script>

<template>
  <main>
    {{ route.path }}
    <!-- <ContentRenderer v-if="page" :value="page" /> -->
    <UButton
      variant="soft"
      color="error"
      size="sm"
      label="Go back"
      icon="i-lucide-arrow-left"
      to="/blogs"
      class="mb-4 cursor-pointer items-center justify-center gap-2"
    />

    <div v-if="page">
      <h1>{{ page.title }}</h1>
      <NuxtImg
        v-if="page.thumbnail"
        :src="page.thumbnail"
        :alt="page.title"
        width="400"
        height="400"
      />
      <div class="description">{{ page.description }}</div>
      <div class="content">{{ page.meta.tags }}</div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </main>
</template>
