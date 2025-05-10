<script setup lang="ts">
const user = useCurrentUser();
const name = user?.value?.displayName;

const { data, status } = useFetch(`/api/hello?name=${name || "Anonymous"} `);

definePageMeta({
  layout: "default",
});

onMounted(() => {
  console.log("mounted");
  const firebase = useRuntimeConfig().public.firebaseConfig;
  const recaptcha = useRuntimeConfig().public.recaptchaSiteKey;
  console.log(firebase);
  console.log(recaptcha);
  console.log(user);
});
</script>

<template>
 <div>
  <Hero/>
 </div>
</template>

<style scoped></style>
