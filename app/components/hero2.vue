<!-- Hero.vue -->
<template>
  <div class="relative overflow-hidden py-20 md:py-32">
    <!-- Background blobs -->
    <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 rounded-full opacity-50 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full opacity-40 blur-3xl"></div>
    
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <span class="text-primary-500 font-medium">Welcome to BlogVerse</span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
              Where Ideas <span class="text-primary-500">Flourish</span>
            </h1>
            <p class="text-lg text-gray-600 max-w-lg" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
              Discover thought-provoking articles, share your perspectives, and join a community of curious minds exploring the world together.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }">
            <UButton size="lg" color="primary" to="/blogs">
              <template #leading>
                <UIcon name="i-heroicons-book-open" />
              </template>
              Browse All Blogs
            </UButton>
            <UButton size="lg" color="gray" variant="soft" to="/login">
              <template #leading>
                <UIcon name="i-heroicons-user-circle" />
              </template>
              Login
            </UButton>
          </div>
          
          <div class="flex items-center gap-6" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 800 } }">
            <span class="text-sm text-gray-500">Connect with us:</span>
            <div class="flex gap-4">
              <UButton variant="ghost" color="gray" icon="i-simple-icons-twitter" aria-label="Twitter" class="transition-transform hover:-translate-y-1" />
              <UButton variant="ghost" color="gray" icon="i-simple-icons-instagram" aria-label="Instagram" class="transition-transform hover:-translate-y-1" />
              <UButton variant="ghost" color="gray" icon="i-simple-icons-linkedin" aria-label="LinkedIn" class="transition-transform hover:-translate-y-1" />
            </div>
          </div>
        </div>
        
        <!-- Hero Illustration -->
        <div class="relative flex justify-center lg:justify-end" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { delay: 300 } }">
          <div class="w-full max-w-lg relative illustration">
            <img src="@/assets/images/rocket.png" alt="Blog Illustration" class="w-full h-auto" />
            
            <!-- Floating elements -->
            <div class="absolute -top-8 -right-8 bg-white rounded-full p-4 shadow-lg animate-bounce-slow">
              <UIcon name="i-heroicons-pencil-square" class="w-8 h-8 text-primary-500" />
            </div>
            
            <div class="absolute -bottom-4 left-12 bg-white rounded-full p-3 shadow-lg animate-pulse">
              <UIcon name="i-heroicons-heart" class="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    
    <!-- Stats section -->
    <UContainer class="mt-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, stagger: 100, transition: { delay: 700 } }">
        <div class="space-y-2">
          <div class="text-3xl font-bold text-gray-900">5k+</div>
          <div class="text-sm text-gray-500">Articles</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-gray-900">2.3k+</div>
          <div class="text-sm text-gray-500">Writers</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-gray-900">15k+</div>
          <div class="text-sm text-gray-500">Readers</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-gray-900">98%</div>
          <div class="text-sm text-gray-500">Satisfaction</div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
// You can add any necessary script setup here
</script>

<style scoped>
.illustration {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* Add this to your app.css or a global style file */
@layer utilities {
  .animate-bounce-slow {
    animation: bounce 3s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
}
</style>