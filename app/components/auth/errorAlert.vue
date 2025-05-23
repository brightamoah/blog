<script lang="ts" setup>
defineProps<{
  errorMessage: string | null;
}>();
</script>

<template>
  <div v-auto-animate class="flex items-center justify-center">
    <UAlert
      v-if="errorMessage !== '' && errorMessage !== null"
      variant="subtle"
      color="error"
      :description="errorMessage"
      class="mb-2 flex justify-center rounded-3xl text-center text-sm font-medium"
    />
  </div>
</template>

<style></style>
