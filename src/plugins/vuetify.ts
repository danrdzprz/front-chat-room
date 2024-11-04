import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from "vuetify/components/VDataTable";
import { MAIN_THEME, mainDarkTheme, mainTheme, shopTheme } from "../utils/vuetify-theme";
import { defaults } from "../utils/vuetify-defaults";
import { mdi } from 'vuetify/iconsets/mdi';
import { es } from 'vuetify/locale';
import { VTreeview } from 'vuetify/labs/VTreeview';
import { VNumberInput } from 'vuetify/lib/labs/components.mjs';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale:{
      locale: 'es',
      fallback: 'es',
      messages: { es },
    },
    ssr: true,
    components: {
        VDataTable,
        VTreeview,
        VNumberInput,
    },
    defaults: defaults,
    theme: {
        defaultTheme: MAIN_THEME,
        themes: {
            mainTheme,
            mainDarkTheme,
            shopTheme
        },
        variations: {
            colors: ["primary", "secondary"],
            lighten: 4,
            darken: 4,
        },
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})