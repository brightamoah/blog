<!-- components/HeroSection.vue -->
<template>
  <section class="relative overflow-hidden bg-white dark:bg-gray-900">
    <!-- Background gradient blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-[40%] -left-[40%] h-[80%] w-[80%] rounded-full bg-primary/10 blur-3xl"
      ></div>
      <div
        class="absolute right-[10%] -bottom-[30%] h-[60%] w-[60%] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
      ></div>
    </div>

    <div
      class="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div
        class="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
      >
        <!-- Text Content - Enhanced for visual appeal -->
        <div class="flex-1 text-center lg:text-left">
          <!-- Feature badge -->
          <div
            class="animate-fade-in mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2"
          >
            <UIcon name="i-lucide-sparkles" class="mr-2 h-4 w-4 text-primary" />
            <span class="text-sm font-medium text-primary"
              >Discover new perspectives</span
            >
          </div>

          <!-- Enhanced heading with decorative elements -->
          <h1
            class="animate-fade-in via-primary-dark relative mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text pb-2 font-curve text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl"
          >
            Welcome to
            <span class="relative inline-block">
              <span class="font-raleway font-extrabold text-(--ui-text)"
                >My-Blog</span
              >
              <svg
                class="absolute -bottom-2 left-0 h-3 w-full text-primary opacity-70"
                viewBox="0 0 200 9"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,5 Q40,0 80,5 T160,5 T200,5"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <!-- Improved paragraph layout with visual enhancements -->
          <div class="md:ml-10">
            <div class="animate-fade-in-delayed-1 relative mb-10">
              <div
                class="absolute top-0 -left-6 hidden h-full w-1 rounded bg-primary opacity-20 lg:block"
              ></div>
              <p
                class="max-w-2xl font-curve text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300"
              >
                <span class="font-medium">Discover insightful articles</span>,
                thought-provoking ideas, and the latest trends in technology,
                design, and digital culture.
              </p>
              <p
                class="mt-3 max-w-2xl font-curve text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300"
              >
                Share your perspectives and connect with a community of
                <span class="font-cursive font-medium text-primary"
                  >creative thinkers</span
                >.
              </p>
            </div>
          </div>

          <!-- Enhanced buttons with hover effects -->
          <div
            class="animate-fade-in-delayed-2 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <UButton
              to="/blogs"
              color="primary"
              variant="solid"
              size="xl"
              class="rounded-full px-6 py-3 font-medium shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
              trailing-icon="i-lucide-arrow-right"
            >
              Explore All Blogs
            </UButton>

            <UButton
              to="/auth/login"
              color="white"
              variant="outline"
              size="xl"
              class="rounded-full border-2 border-primary px-6 py-3 font-medium text-primary transition-all hover:-translate-y-1 hover:bg-primary/5 dark:border-primary dark:text-white dark:hover:bg-primary/20"
              trailing-icon="i-lucide-user"
            >
              My Personal Blogs
            </UButton>
          </div>

          <!-- Enhanced user showcase with rating display -->
          <div
            class="animate-fade-in-delayed-3 mt-8 flex items-center justify-center gap-4 lg:justify-start"
          >
            <div class="flex -space-x-3">
              <UAvatar
                src="https://github.com/benjamincanac.png"
                size="xl"
                alt="User avatar"
                class="ring-2 ring-white dark:ring-gray-800"
              />
              <UAvatar
                src="https://github.com/benjamincanac.png"
                size="xl"
                alt="User avatar"
                class="ring-2 ring-white dark:ring-gray-800"
              />
              <UAvatar
                src="https://github.com/benjamincanac.png"
                size="xl"
                alt="User avatar"
                class="ring-2 ring-white dark:ring-gray-800"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200"
                >Join 200+ readers</span
              >
              <div class="flex items-center text-xs text-yellow-500">
                <HeroRating :rating="4.5" :star-size="4" />
                <span class="ml-1 text-gray-600 dark:text-gray-400">4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Illustration with proper animation sequence -->
        <div
          class="relative flex-1 lg:flex-shrink-0 lg:flex-grow-0 lg:basis-[45%]"
        >
          <div class="illustration-container relative mx-auto max-w-lg">
            <!-- Main illustration SVG -->
            <!-- <SvgHero/> -->
            <NuxtImg
              src="/rocket.png"
              alt="Blog Illustration"
              class="illustration-image h-auto w-full"
            />

            <!-- Decorative elements with staggered animations -->
            <div
              class="animate-bounce-delayed absolute top-1/3 -left-6 h-12 w-12 rounded-full bg-primary/30 blur-xl delay-300"
            ></div>
            <div
              class="animate-bounce-slow absolute -right-4 bottom-1/4 h-8 w-8 rounded-full bg-primary/20 blur-lg delay-500"
            ></div>
          </div>
        </div>
      </div>

      <!-- Stats and features section - Using our new dynamic component -->
      <HeroCards :cards="featureCards" :delay="true" />
    </div>
  </section>
</template>

<script setup>
// import { HeroCards } from '#components';

// Define your feature cards data dynamically
const featureCards = ref([
  {
    id: 1,
    title: "User-friendly",
    description:
      "Clean and intuitive interface for the best reading experience",
    icon: "i-lucide-layout-dashboard",
    color: "primary",
  },
  {
    id: 2,
    title: "Rich Editor",
    description: "Powerful tools to create beautiful and engaging content",
    icon: "i-lucide-pen-tool",
    color: "emerald",
  },
  {
    id: 3,
    title: "Community",
    description: "Connect with like-minded readers and writers",
    icon: "i-lucide-users",
    color: "indigo",
  },
  {
    id: 4,
    title: "Privacy First",
    description: "Your data is secure and your privacy is respected",
    icon: "i-lucide-shield",
    color: "amber",
  },
]);
</script>

<style>
/* Animation keyframes */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slide-in-right {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-left {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

.animate-spin-delayed {
  animation: spin-slow 8s linear infinite reverse;
}

.animate-bounce-slow {
  animation: bounce-slow 5s ease-in-out infinite;
}

.animate-bounce-delayed {
  animation: bounce-slow 7s ease-in-out infinite 1s;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-delayed-1 {
  opacity: 0;
  animation: fade-in 0.8s ease-out forwards 0.2s;
}

.animate-fade-in-delayed-2 {
  opacity: 0;
  animation: fade-in 0.8s ease-out forwards 0.4s;
}

.animate-fade-in-delayed-3 {
  opacity: 0;
  animation: fade-in 0.8s ease-out forwards 0.6s;
}

.animate-fade-in-delayed-4 {
  opacity: 0;
  animation: fade-in 0.8s ease-out forwards 0.8s;
}

.animate-slide-in-right {
  animation: slide-in-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-500 {
  animation-delay: 500ms;
}

/* New animation sequence for illustration */
.illustration-container {
  animation: slide-in-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.illustration-image {
  animation: float 6s ease-in-out infinite;
  animation-delay: 1s; /* Start floating after slide-in completes */
}

/* Add animation-fill-mode to properly handle animation states */
.illustration-container,
.illustration-image,
.animate-fade-in,
.animate-fade-in-delayed-1,
.animate-fade-in-delayed-2,
.animate-fade-in-delayed-3,
.animate-fade-in-delayed-4 {
  animation-fill-mode: both;
}
</style>
