import colors from "vuetify/es5/util/colors";
import { seo_home_schema } from "./seo";
import vi from "./locales/vi.json";
import en from "./locales/en.json";

export default {
  ssr: false,

  target: "server",

  head: seo_home_schema,

  css: ["~/assets/style", "~/assets/variables"],

  server: {
    port: 8080,
  },

  plugins: [
    "~/plugins/vuetify",
    "~/plugins/router",
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vue-sidebar-menu-akahon", ssr: false },
    { src: "~/plugins/vue2-dropzone", ssr: false },
    { src: "~/plugins/vue-avatar", mode: "client" },
    { src: "~/plugins/vue-context-menu", mode: "client" },
    { src: "~/plugins/vue-line-clamp", mode: "client" },
    { src: "~/plugins/vue-scroll-to-top", mode: "client" },
    { src: "~/plugins/apex-chart", mode: "client" },
  ],

  components: true,

  loadingIndicator: {
    name: "pulse",
    color: "#FF2E55",
    background: "#ffffff",
  },

  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
    "nuxt-compress",
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "nuxt-purgecss",
    "nuxt-speedkit",
    "nuxt-helmet",
    "@nuxtjs/imagemin",
  ],

  build: {
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
      maxSize: 300000,
    },
    transpile: [
      "vue-avatar",
      "vue-context-menu",
      "vue-line-clamp",
      "v-scroll-to-top",
      "vue-sidebar-menu-akahon",
      "vue-toastification",
      "vue2-dropzone",
      "apex-chart",
      /^vuetify/,
    ],
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },
    extend(config, { isClient }) {
      config.performance = config.performance || {};
      config.performance.maxEntrypointSize = 244 * 1024;

      if (isClient) {
        config.optimization.splitChunks.minSize = 10000;
        config.optimization.splitChunks.maxSize = 300000;
      }
    },
  },

  speedkit: {
    detection: {
      performance: true,
      browserSupport: true,
    },
    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },

    componentAutoImport: false,
    componentPrefix: undefined,

    lazyOffset: {
      component: "0%",
      asset: "0%",
    },

    loader: {
      dataUri: null,
      size: "100px",
      backgroundColor: "grey",
    },
  },

  "nuxt-compress": {
    gzip: {
      cache: true,
      threshold: 4096,
    },
    brotli: {
      threshold: 4096,
    },
  },

  purgeCSS: {
    mode: "webpack",
    enabled: ({ isDev, isClient }) => !isDev && isClient,
    paths: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
    ],
    styleExtensions: [".css"],
    whitelist: ["body", "html", "nuxt-progress"],
    extractors: [
      {
        extractor: (content) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ["html", "vue", "js"],
      },
    ],
  },

  i18n: {
    baseUrl: process.env.BASE_URL,
    strategy: "prefix",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
      },
      {
        code: "vi",
        iso: "vi-VN",
        file: "vi.json",
      },
    ],
    defaultLocale: "en",
    langDir: "./locales",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
      onlyOnRoot: true,
    },
    vueI18n: {
      fallbackLocale: "en",
      messages: { en, vi },
      silentTranslationWarn: true,
    },
    skipSettingLocaleOnNavigate: true,
  },

  axios: {
    baseURL: `${process.env.SERVER_URL}/admin`,
    https: false,
    progress: true,
    retry: { retries: 3 },
    credentials: false,
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },

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
          background: "#F5F5F9",
        },
      },
    },
  },

  env: {
    SERVER_URL: process.env.SERVER_URL || "http://server.cheerup.blog",
    USER_DASHBOARD_URL: process.env.USER_DASHBOARD_URL || "http://cheerup.blog",
  },
};
