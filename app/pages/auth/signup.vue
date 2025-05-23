<template>
  <div
    class="flex min-h-[80dvh] flex-col justify-center px-4 py-4 sm:px-6 sm:py-8 lg:px-8"
  >
    <div
      class="mt-4 w-full sm:mx-auto sm:mt-8 sm:w-[90%] sm:max-w-md md:w-[80%] lg:w-[70%]"
    >
      <div
        class="rounded-lg px-4 py-6 shadow-lg sm:rounded-lg sm:px-8 sm:py-8 md:px-10 dark:bg-gray-800"
      >
        <h2 class="-mt-5 text-center text-xl font-bold">
          Join <span class="text-primary">My-Blog</span> Today!
        </h2>
        <AuthErrorAlert :errorMessage class="mt-3" />

        <UForm
          :state="registerFormData"
          class="space-y-4 sm:space-y-6"
          @submit.prevent="handleSignup"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <UFormField
                label="First Name"
                name="firstName"
                size="xl"
                required
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="firstName"
                  v-model="registerFormData.firstName"
                  name="firstName"
                  type="text"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-user"
                  autocomplete="given-name"
                  size="xl"
                  placeholder="First name"
                  required
                  class="block w-full rounded-full"
                />
              </UFormField>
            </div>

            <div>
              <UFormField
                label="Last Name"
                name="lastName"
                required
                size="xl"
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="lastName"
                  v-model="registerFormData.lastName"
                  name="lastName"
                  type="text"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-user"
                  autocomplete="family-name"
                  size="xl"
                  placeholder="Last name"
                  required
                  class="block w-full rounded-full"
                />
              </UFormField>
            </div>
          </div>

          <div>
            <UFormField
              label="Email"
              name="email"
              required
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="email"
                v-model="registerFormData.email"
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

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <UFormField
                name="password"
                label="Password"
                required
                size="xl"
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="password"
                  v-model="registerFormData.password"
                  name="password"
                  color="neutral"
                  highlight
                  size="xl"
                  placeholder="Enter Password"
                  leading-icon="i-lucide-lock"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
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

            <div>
              <UFormField
                name="confirmPassword"
                label="Confirm Password"
                required
                size="xl"
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="confirmPassword"
                  v-model="registerFormData.confirmPassword"
                  name="confirmPassword"
                  color="neutral"
                  highlight
                  size="xl"
                  placeholder="Confirm your password"
                  leading-icon="i-lucide-shield-check"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="block w-full rounded-full"
                  :ui="{ trailing: 'pe-1 ' }"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="xl"
                      :icon="
                        showConfirmPassword
                          ? 'i-lucide-eye-off'
                          : 'i-lucide-eye'
                      "
                      :aria-label="
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      "
                      :aria-pressed="showConfirmPassword"
                      aria-controls="confirmPassword"
                      @click="showConfirmPassword = !showConfirmPassword"
                    />
                  </template>
                </UInput>
              </UFormField>
              <p v-if="passwordMismatch" class="mt-1 text-xs text-red-600">
                Passwords do not match
              </p>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-center sm:mt-6">
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              label="Create Account"
              :loading="isLoading"
              size="xl"
              trailing-icon="i-lucide-user-plus"
              :disabled="!isSignupFormValid"
              class="flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%]"
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

          <AuthGoogleButton
            :isLoading="isLoading"
            label="Sign up with Google"
          />
        </div>

        <p class="mt-4 text-center text-sm sm:mt-6 sm:text-sm">
          Already have an account?
          <NuxtLink
            :to="{ name: 'auth-login' }"
            class="hover:border-primary-dark hover:text-primary-dark ml-1 border-b border-primary text-base font-semibold text-primary"
          >
            Log In
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const {
  registerFormData,
  isLoading,
  passwordMismatch,
  showPassword,
  showConfirmPassword,
  isSignupFormValid,
  errorMessage,
} = storeToRefs(authStore);

const { handleSignup } = authStore;
</script>
