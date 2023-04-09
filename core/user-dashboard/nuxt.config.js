import colors from "vuetify/es5/util/colors";
import vi from "./locales/vi.json";
import en from "./locales/en.json";

export default {
  ssr: false,

  head: {
    titleTemplate: "%s",
    title: "Cherrup",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Description" },
      {
        hid: "",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
    OWNER_EMAIL: process.env.OWNER_EMAIL,
  },
};
