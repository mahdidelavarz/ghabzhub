// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    'nuxt-svgo',
    '@vueuse/nuxt',
    "@nuxt/image"
  ],
  svgo: {
    componentPrefix: 'i',
    autoImportPath: "~/assets/svg/"
  },
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/default.css'
  ],
  app: {
    head: {
      meta: [
        {name: "theme-color", content: "#0f93ff"},
        {name: 'enamad' , content: "57248274"}
      ],
      bodyAttrs: {
        class: "bg-custom-whitesmoke"
      }
    }
  },
  runtimeConfig: {
    secret: 'wcoR4wECX8FQg9u',
    apiBase: 'http://localhost:3000/api',
    inquiryToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQzZWExYWIwZDI3ZWFmNjE2NjVmZTIiLCJ1dWlkIjoiZjZhZjkyNjctYTgyMC00OWI4LWFmYmYtMGM5ZWY4YWEyZjgzIiwiaWF0IjoxNzYxODM3OTQzfQ.K1oD29fT__feHMCP7Gvtk_bZAYbVKdj7zVaQ-3FnhPw',
    inquiryApiBase: 'https://bhub.satpay.ir/service'
  },
  tailwindcss: {
    config: {
      darkMode: "media",
      theme: {
        extend: {
          colors: {
           'custom-blue': '#0078d7',
           'custom-green': '#35c759',
           'custom-orange': '#ffa94d',
           'custom-white': '#fff',
           'custom-whitesmoke': '#f9f9f9',
           'custom-neutral': '#2e2e2e',
           'custom-cyan': '#00bfa6' 
          }
        },
        fontFamily: {
          sans: 'iransans'
        }
      }
    }
  },
  router: {
    options: {
      linkActiveClass: "active-link",
      linkExactActiveClass: "exact-active-link"
    }
  },
  devtools: { enabled: false },
  devServer: {
    port: 3001
  }
})