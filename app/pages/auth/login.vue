<script setup>
const authStore = useAuthStore()
const { email } = storeToRefs(authStore)

</script>

<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>login</h1>
        <input type="text" placeholder="email" v-model="email" class="border-2 p-3 text-green-400 border-red-300" />
        <UButton label="Go To Home" icon="i-lucide-home" variant="soft" to="/"/>
    </div>
</template>

<style scoped></style>