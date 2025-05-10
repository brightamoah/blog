<template>
  <div
    class="flex min-h-[60dvh] flex-col justify-center px-4 py-4 sm:px-6 sm:py-8 lg:px-8"
  >
    <div
      class="mt-4 w-full sm:mx-auto sm:mt-8 sm:w-[90%] sm:max-w-md md:w-[80%] lg:w-[70%]"
    >
      <div
        class="rounded-lg px-4 py-6 shadow-lg sm:rounded-lg sm:px-8 sm:py-8 md:px-10 dark:bg-gray-800"
      >
        <div class="mb-4 sm:mx-auto sm:mb-6 sm:w-full sm:max-w-md">
          <h2 class="text-center text-xl font-bold sm:text-2xl">
            Welcome Back To
            <span class="text-primary">My-Blog!</span>
          </h2>
          <p class="text-center text-sm sm:text-base">
            Please login to continue
          </p>
        </div>

        <UForm
          :state="loginFormData"
          class="space-y-4 sm:space-y-6"
          @submit.prevent="handleLogin"
        >
          <div>
            <UFormField
              required
              label="Email"
              name="email"
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="email"
                v-model="loginFormData.email"
                name="email"
                type="email"
                color="neutral"
                highlight
                leading-icon="i-lucide-mail"
                autocomplete="email"
                size="xl"
                placeholder="Enter your email"
                required
                class="block w-full rounded-full"
              />
            </UFormField>
          </div>

          <div>
            <UFormField
              required
              name="password"
              label="Password"
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="password"
                v-model="loginFormData.password"
                name="password"
                color="neutral"
                highlight
                size="xl"
                placeholder="Enter your password"
                leading-icon="i-lucide-lock"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="block w-full rounded-full"
                :ui="{ trailing: 'pe-1 ' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="xl"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="
                      showPassword ? 'Hide password' : 'Show password'
                    "
                    :aria-pressed="showPassword"
                    aria-controls="password"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </UInput>
            </UFormField>
          </div>

          <div class="mt-6 mb-5 flex items-center justify-between">
            <div class="flex shrink-0 items-center">
              <UCheckbox
                v-model="loginFormData.rememberMe"
                size="lg"
                sm:size="md"
                color="primary"
                label="Remember me"
              />
            </div>

            <div class="text-sm sm:text-sm">
              <a
                href="#"
                class="hover:text-primary-dark font-semibold whitespace-nowrap text-primary"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-center sm:mt-6">
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              label="Log In"
              size="xl"
              trailing-icon="i-lucide-log-in"
              :loading="isLoading"
              :disabled="!isLoginFormValid"
              class="flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all focus:ring-2 focus:outline-none sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%]"
            />
          </div>
        </UForm>

        <div class="mt-4">
          <div class="relative">
            <USeparator
              label="OR"
              size="xs"
              :ui="{
                border: 'border-(--ui-border-inverted)',
              }"
            />
          </div>

          <div class="mt-4 flex items-center justify-center sm:mt-6">
            <UButton
              variant="solid"
              label="Sign in with Google"
              class="flex w-full cursor-pointer justify-center rounded-full border-2 border-primary bg-white px-4 py-3 text-center text-sm font-semibold text-gray-800 shadow-md transition-all duration-200 hover:border-4 hover:bg-white sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%] dark:bg-gray-100"
              :loading="isLoading"
              leading-icon="i-logos-google-icon"
              trailing-icon="i-lucide-arrow-right"
            />
          </div>
        </div>

        <p class="mt-4 text-center text-sm sm:mt-6 sm:text-sm">
          Don't have an account?
          <NuxtLink
            :to="{ name: 'auth-signup' }"
            class="hover:border-primary-dark hover:text-primary-dark ml-1 border-b border-primary text-base font-semibold text-primary"
          >
            Sign Up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { loginFormData, isLoading, showPassword, isLoginFormValid } =
  storeToRefs(authStore);

const { handleLogin } = authStore;
</script>
