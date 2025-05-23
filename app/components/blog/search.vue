<script setup lang="ts">
import { UButton } from "#components";
import type { Post } from "~/types/type";
import { useDebounceFn } from "@vueuse/core";

const router = useRouter();
const blogStore = useBlogStore();
const { searchQuery, searchResults, isSearching } = storeToRefs(blogStore);
const { searchPosts, clearSearch } = blogStore;

// Search state to track when we're searching


// Use debounce to prevent excessive searches while typing
const debouncedSearch = useDebounceFn(() => {
  isSearching.value = true;
  searchPosts();
  isSearching.value = false;
}, 1000); // 300ms debounce delay - adjust as needed

// Watch for changes in searchQuery to trigger search as user types
watch(searchQuery, (newValue) => {
  if (!newValue || newValue.trim() === "") {
    clearSearch();
    return;
  }
  isSearching.value = true;
  debouncedSearch();
});

const goToBlog = (blogId: Post["id"]) => {
  router.push(`/blogs/${blogId}`);
  clearSearch(); // Clear search when navigating
};

// Clear search when component unmounts
onUnmounted(() => {
  clearSearch();
});

// Close results when clicking outside
const searchContainer = ref<HTMLElement | null>(null);
const closeSearchResults = (event: MouseEvent) => {
  if (
    searchContainer.value &&
    !searchContainer.value.contains(event.target as Node)
  ) {
    clearSearch();
  }
};

onMounted(() => {
  document.addEventListener("click", closeSearchResults);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeSearchResults);
});
</script>

<template>
  <div ref="searchContainer" class="relative mx-auto max-w-3xl px-4 py-4">
    <div class="relative">
      <UIcon
        name="i-lucide-search"
        size="20"
        class="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform"
      />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search posts..."
        class="border-border bg-background w-full rounded-lg border py-3 pr-12 pl-10 shadow-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <div class="absolute top-1/2 right-3 -translate-y-1/2 transform">
        <!-- Show spinner when searching -->
        <UIcon
          v-if="isSearching"
          name="i-lucide-loader-circle"
          class="h-5 w-5 animate-spin text-primary"
        />
        <!-- Show clear button when there's text in the search -->
        <UButton
          v-else-if="searchQuery"
          @click="clearSearch"
          class=" "
          variant="ghost"
          size="xs"
        >
          <UIcon name="i-lucide-x" class="h-5 w-5" />
        </UButton>
      </div>
    </div>

    <!-- Search results container with transition - now positioned absolutely -->
    <transition name="fade">
      <div
        v-if="searchQuery"
        class="absolute right-0 left-0 z-50 mx-4 mt-2 overflow-hidden rounded-lg border shadow-md"
        style="max-height: 80vh"
      >
        <!-- Results found -->
        <div v-if="searchResults.length > 0" class="divide-y">
          <div class="border-b bg-(--ui-bg-elevated) px-4 py-2">
            <p class="text-sm font-medium">
              {{ searchResults.length }} result{{
                searchResults.length !== 1 ? "s" : ""
              }}
              found
            </p>
          </div>
          <div class="max-h-72 overflow-y-auto">
            <div
              v-for="result in searchResults"
              :key="result.id"
              @click="goToBlog(result.id)"
              class="cursor-pointer transition-colors hover:bg-primary/10"
            >
              <div class="px-4 py-3">
                <div class="flex items-start">
                  <div
                    class="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded"
                  >
                    <UIcon
                      name="i-lucide-file-text"
                      class="h-5 w-5 text-primary"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="mb-1 font-medium text-(--ui-text-highlighted)">
                      {{ result.title }}
                    </h4>
                    <p class="truncate text-sm text-toned">
                      {{ result.excerpt }}
                    </p>
                    <div class="mt-1 flex items-center gap-2">
                      <span
                        class="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {{ result.category }}
                      </span>
                      <span class="text-xs text-(--ui-text-muted)">{{
                        result.date
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No results found -->
        <div v-else class="flex flex-col items-center justify-center px-4 py-8">
          <UIcon
            v-if="isSearching"
            name="i-lucide-loader"
            class="mb-3 h-12 w-12 animate-spin text-primary"
          />
          <template v-else>
            <UIcon
              name="i-lucide-search-x"
              class="mb-3 h-12 w-12 text-(--ui-text-muted)"
            />
            <p class="font-medium text-(--ui-text-highlighted)">No results found</p>
            <p class="mt-1 text-center text-sm text-(--ui-text-muted)">
              Try different keywords or browse categories
            </p>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
