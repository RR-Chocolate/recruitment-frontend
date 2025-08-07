// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Enable file-based routing
  pages: true,

  // Configure SSR
  ssr: true,

  // Auto-import configuration
  imports: {
    autoImport: true,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
  ],

  // CSS framework
  css: [],

  // App configuration
  app: {
    head: {
      title: "RR Chocolatte",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Premium chocolate experience with RR Chocolatte",
        },
      ],
    },
  },
});
