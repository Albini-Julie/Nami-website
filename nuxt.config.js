// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  components: true,
  devtools: { enabled: true },
  css: ['@/scss/main.scss'],
  runtimeConfig: {
    public: {
      apiUrl: ''
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/scss/foundations/_variables.scss";
          @import "@/scss/foundations/_mixins.scss";`
        }
      }
    }
  }
})
