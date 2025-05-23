<script setup lang="ts">
import type { Feature } from '~/types/type';


const features: Feature[] = [
    {
        icon: "i-lucide-pen",
        title: "Creative Writing",
        description: "Express yourself through words and stories",
    },
    {
        icon: "i-lucide-users",
        title: "Community",
        description: "Connect with like-minded individuals",
    },
    {
        icon: "i-lucide-bookmark",
        title: "Save Favorites",
        description: "Bookmark posts to read later",
    },
    {
        icon: "i-lucide-shield",
        title: "Privacy First",
        description: "Your data is secure and protected",
    },
];
</script>

<template>
    <div class="border-b border-gray-200 py-10 dark:border-gray-800">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(feature, index) in features" :key="index" class="flex items-start">
                <div class="feature-icon-container">
                    <UIcon :name="feature.icon" class="h-7 w-7 text-primary" />
                </div>
                <div class="ml-4">
                    <h4 class="mb-1 text-sm font-semibold">{{ feature.title }}</h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                        {{ feature.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
