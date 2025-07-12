import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import colors from "vuetify/util/colors";

// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi },
    },
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            background: colors.shades.white,
            surface: colors.grey.lighten5,
            primary: colors.red.accent3,
            secondary: colors.red.accent2,
            success: colors.green.accent4,
            warning: colors.orange.accent4,
            error: colors.deepOrange.accent3,
            info: colors.cyan.accent4,
          },
        },
        dark: {
          colors: {
            background: colors.grey.darken3,
            surface: colors.grey.lighten5,
            primary: colors.red.accent3,
            secondary: colors.red.accent2,
            success: colors.green.accent4,
            warning: colors.orange.accent4,
            error: colors.deepOrange.accent3,
            info: colors.cyan.accent4,
          },
        },
      },
    },
  });

  app.vueApp.use(vuetify);
});
