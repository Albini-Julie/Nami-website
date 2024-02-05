// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    'nuxt3-leaflet'],
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
  },
  head: {
  link: [
    { rel: 'icon', type: 'image/png', href: '/soleil.png' }, // Assurez-vous de mettre le bon nom de fichier et l'extension
  ],
},
})
