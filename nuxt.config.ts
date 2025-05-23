import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2024-11-01",

   future: {
      compatibilityVersion: 4,
   },

   //set environment to production
   dev: false,
   ssr: true,
   nitro: {
      preset: 'vercel',
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

   modules: [
      "@pinia/nuxt",
      "@vueuse/nuxt",
      "@nuxt/ui",
      "nuxt-typed-router",
      "nuxt-vuefire",
      "@nuxt/fonts",
      "@nuxt/image",
      "@formkit/auto-animate",
      "@nuxt/content",
   ],

   image: {
      dir: "assets/images",
   },

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
         serviceAccount:
            process.env.NODE_ENV === "production"
               ? (() => {
                    try {
                       const base64Creds =
                          process.env.GOOGLE_APPLICATION_CREDENTIALS_PROD || "";
                       return JSON.parse(
                          Buffer.from(base64Creds, "base64").toString("utf-8")
                       );
                    } catch (error) {
                       console.error(
                          "Error parsing Firebase credentials:",
                          error
                       );
                       return null;
                    }
                 })()
               : process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
   },

   content: {},
});
