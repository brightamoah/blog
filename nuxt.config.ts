import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2024-11-01",

   future: {
      compatibilityVersion: 4,
   },

   modules: [
      "@pinia/nuxt",
      "@vueuse/nuxt",
      "@nuxt/ui",
      "nuxt-typed-router",
      "nuxt-vuefire",
      "@nuxt/fonts",
      "@nuxt/image",
      "@formkit/auto-animate",
      "@nuxtjs/seo",
      "@nuxt/content",
   ],

   //set environment to production
   dev: false,
   ssr: true,
   nitro: {
      preset: "vercel",
   },

   runtimeConfig: {
      public: {
         firebaseConfig: {
            apiKey: "",
            authDomain: "",
            projectId: "",
            appId: "",
            storageBucket: "",
            messagingSenderId: "",
            measurementId: "",
         },
         recaptchaSiteKey: "",
         rapidApiKey: "",
         rapidApiHost: "",
         rapidApiUrl: "",
      },
   },

   app: {
      pageTransition: { name: "page", mode: "out-in" },
   },

   devtools: { enabled: true },
   css: ["@/assets/css/main.css"],

   vite: {
      plugins: [tailwindcss()],
   },

   // image: {
   //    dir: "assets/images",
   // },

   vuefire: {
      config: {
         apiKey: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
         authDomain: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
         projectId: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
         appId: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_APP_ID,
         storageBucket: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
         messagingSenderId:
            process.env.NUXT_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
         measurementId: process.env.NUXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
      },
      auth: {
         enabled: true,
      },
      appCheck: {
         debug: process.env.NODE_ENV !== "production",
         isTokenAutoRefreshEnabled: true,
         provider: "ReCaptchaV3",
         key: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      },
      admin: {
         serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
   },

   content: {
      preview: {
         api: "https://api.nuxt.studio",
      },
   },
});
