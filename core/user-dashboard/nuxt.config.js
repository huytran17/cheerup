import colors from "vuetify/es5/util/colors";

import { seo_home_schema } from "./seo";

import vi from "./locales/vi.json";
import en from "./locales/en.json";

export default {
  ssr: false,

  target: "static",

  head: seo_home_schema,

  generate: {
    cache: {
      ignore: [
        ".nuxt",
        "static",
        "dist",
        "node_modules",
        ".**/*",
        ".*",
        "README.md",
      ],
    },
    subFolders: false,
    interval: 50,
    crawler: true,
    routes() {
      const default_routes = new Promise((res) => {
        res([
          {
            route: "/category",
            payload: {},
          },
        ]);
      });
      return default_routes;
    },
  },

  hooks: {
    "vue-renderer": {
      spa: {
        prepareContext({ head, payload }) {},
      },
    },
  },

  server: {
    port: 8082,
  },

  css: ["~/assets/style", "~/assets/variables"],

  plugins: [
    "~/plugins/vuetify",
    "~/directives/private",
    "~/plugins/router",
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vue-infinite-loading", mode: "client" },
    { src: "~/plugins/vue-scroll-to-top", mode: "client" },
    { src: "~/plugins/vue2-dropzone", ssr: false },
    { src: "~/plugins/vue-avatar", mode: "client" },
    { src: "~/plugins/vue-line-clamp", mode: "client" },
    { src: "~/plugins/vue-slick-carousel", mode: "client" },
  ],

  components: true,

  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", "@nuxtjs/moment"],

  modules: ["@nuxtjs/axios", "@nuxtjs/i18n"],

  i18n: {
    baseUrl: process.env.APP_URL,
    strategy: "prefix",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
      },
      {
        code: "vi",
        iso: "vi",
        file: "vi.json",
      },
    ],
    defaultLocale: "en",
    langDir: "./locales",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en,
        vi,
      },
      silentTranslationWarn: true,
    },
    skipSettingLocaleOnNavigate: true,
  },

  axios: {
    baseURL: `${process.env.SERVER_URL}/api`,
  },

  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          brick: "#FF2E55",
          matte__black: "#343434",
          twitter: "#1DA1F2",
          facebook: "#4267B2",
          google_plus: "#DD4B39",
          pinterest: "#E60023",
          linkedin: "#0A66C2",
          github: "#171515",
        },
      },
    },
  },

  env: {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
    APP_URL: process.env.SERVER_URL || "http://localhost:8082",
    OWNER_EMAIL: process.env.OWNER_EMAIL,
  },
};
