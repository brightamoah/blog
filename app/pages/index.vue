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

  // This will handle direct navigation with hash
  if (window.location.hash === "#faq") {
    setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
});
</script>

<template>
  <div>
    <Hero />
    <AppFaq class="mt-10 mb-10" id="faq" style="scroll-margin-top: 80px" />
  </div>
</template>

<style scoped></style>
