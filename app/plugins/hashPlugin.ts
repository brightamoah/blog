export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    // Get the hash from the URL
    const hash = window.location.hash;
    console.log("Hash:", hash);

    // If there's a hash, scroll to it after a short delay
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Small delay to ensure the element is in the DOM
      console.log("Scrolling to element:", hash);
    }
  });
});
