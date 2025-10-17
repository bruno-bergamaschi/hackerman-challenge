// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@pinia/nuxt"],
  typescript: {
    typeCheck: true,
  },
  css: ["~/assets/styles/default.scss", "~/assets/styles/variables.scss"],
});
