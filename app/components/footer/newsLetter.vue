<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}>();

const email = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <div class="md:col-span-4 lg:col-span-2">
    <h3 class="footer-heading">Newsletter</h3>
    <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Subscribe to our newsletter for the latest updates.
    </p>
    <UForm
      :state="{ email }"
      @submit.prevent="handleSubmit()"
      class="flex flex-col space-y-2"
    >
      <UFormField name="email">
        <UInput
          v-model="email"
          placeholder="Enter your email"
          type="email"
          class="w-full bg-white dark:bg-gray-800"
          required
        />
      </UFormField>

      <UButton type="submit" color="primary" label=" Subscribe" size="lg" trailing-icon="i-lucide-mail" class="mt-2 flex justify-center items-center"></UButton>
    </UForm>
  </div>
</template>

<style scoped></style>
