<script setup lang="ts">
const email = ref("");

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const submitNewsletter = () => {
  console.log("Subscribed email:", email.value);

  email.value = "";
};
</script>

<template>
  <footer
    class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 dark:from-gray-900 dark:to-gray-950"
  >
    <!-- Decorative background elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
      ></div>
      <div
        class="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/3 blur-2xl dark:bg-primary/5"
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top section with logo and quick links -->
      <div
        class="grid grid-cols-1 gap-8 border-b border-gray-200 pb-12 md:grid-cols-3 lg:grid-cols-10 dark:border-gray-800"
      >
        <!-- Logo and description -->
        <div class="flex flex-col md:col-span-4 lg:col-span-4">
          <div class="mb-4 flex items-center cursor-pointer" @click="scrollToTop()">
            <!-- Logo -->
            <div
              class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <!-- <UIcon name="i-lucide-pen-tool" class="h-5 w-5 text-white" /> -->
              <img src="~/assets/svgs/logo.svg" alt="Logo" />
            </div>
            <span class="font-raleway text-2xl font-extrabold uppercase"
              >My<span class="text-primary transition-colors duration-300"
                >-Blog</span
              ></span
            >
          </div>

          <p class="mb-6 w-[20rem] text-sm text-gray-600 dark:text-gray-400">
            A platform for sharing ideas, stories, and knowledge. Connect with
            writers from around the world.
          </p>
          <!-- Social media icons -->
          <div class="mt-auto flex space-x-4">
            <a href="#" class="social-icon-link" aria-label="Twitter">
              <UIcon name="i-lucide-twitter" class="h-5 w-5" />
            </a>
            <a href="#" class="social-icon-link" aria-label="Facebook">
              <UIcon name="i-lucide-facebook" class="h-5 w-5" />
            </a>
            <a href="#" class="social-icon-link" aria-label="Instagram">
              <UIcon name="i-lucide-instagram" class="h-5 w-5" />
            </a>
            <a href="#" class="social-icon-link" aria-label="Github">
              <UIcon name="i-lucide-github" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterQuickLinks />

        <FooterResources />

        <FooterNewsLetter v-model="email" @submit="submitNewsletter()" />
      </div>

      <FooterFeatures />

      <FooterCopyright />
    </div>
  </footer>
</template>

<style scoped>
@import "~/assets/css/footer.css";
</style>
