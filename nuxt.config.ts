// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  app:{
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  srcDir:'src',
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: ['~/plugins/socket.client'],
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },

})