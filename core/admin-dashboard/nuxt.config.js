import colors from "vuetify/es5/util/colors";
import vi from "./locales/vi.json";
import en from "./locales/en.json";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - admin-dashboard",
    title: "admin-dashboard",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/style", "~/assets/variables"],

  server: {
    port: 8080,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuetify",
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vue-sidebar-menu-akahon", ssr: false },
    { src: "~/plugins/vue2-dropzone", ssr: false },
    { src: "~/plugins/vue-avatar", mode: "client" },
    { src: "~/plugins/vue-context-menu", mode: "client" },
    { src: "~/plugins/vue-line-clamp", mode: "client" },
    { src: "~/plugins/vue-scroll-to-top", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", "@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/i18n"],

  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en,
        vi,
      },
      silentTranslationWarn: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${process.env.SERVER_URL}/admin`,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [],
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
  },
};
