// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/device", "@nuxthub/core", "@vueuse/nuxt", "nuxt-auth-utils"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
});
