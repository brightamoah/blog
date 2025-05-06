<script setup lang="ts">
const { data, status } = useFetch('/api/hello?name=bright')
</script>

<template>
    <div>
        <h1 class="text-2xl ">home page</h1>
        <h2>{{ status }}</h2>
        <h2>{{ data?.greeting }}</h2>

        
    </div>
</template>

<style scoped>

</style>