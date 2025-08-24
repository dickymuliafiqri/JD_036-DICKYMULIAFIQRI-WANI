// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/device",
    "@nuxthub/core",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
});