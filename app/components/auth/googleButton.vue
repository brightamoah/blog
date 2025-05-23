<script lang="ts" setup>
const {  label='Sign in with Google' } = defineProps<{
  isLoading: boolean;
  label?: string;
}>();
</script>

<template>
  <div class="mt-4 flex items-center justify-center sm:mt-6">
    <UButton
      variant="solid"
      :label
      class="flex w-full cursor-pointer justify-center rounded-full border-2 border-primary bg-white px-4 py-3 text-center text-sm font-semibold text-gray-800 shadow-md transition-all duration-200 hover:border-4 hover:bg-white sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%] dark:bg-gray-100"
      :loading="isLoading"
      leading-icon="i-logos-google-icon"
      trailing-icon="i-lucide-arrow-right"
    />
  </div>
</template>

<style></style>
