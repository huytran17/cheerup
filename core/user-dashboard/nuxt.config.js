import colors from "vuetify/es5/util/colors";
import axios from "axios";
import { get, findIndex, map, flattenDeep, concat } from "lodash";

import { SEO_TYPE } from "./constants";
import {
  seo_home_schema,
  seo_category_schema,
  seo_post_schema,
  exclude_pages,
} from "./seo";

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
    exclude: exclude_pages,
    fallback: "404.html",
    async routes() {
      try {
        const seo_post_payload = await axios.get(
          `${process.env.SERVER_URL}/api/seo/posts`
        );

        const seo_post_data = get(seo_post_payload, "data.data", []);
        const seo_post_promises = map(seo_post_data, (post) => ({
          route: `/post/${post._id}`,
          payload:
            {
              ...post.seo,
              url: `${process.env.BASE_URL}/post/${post._id}`,
              type: SEO_TYPE.POST,
            } || {},
        }));

        const seo_category_payload = await axios.get(
          `${process.env.SERVER_URL}/api/seo/categories`
        );

        const seo_category_data = get(seo_category_payload, "data.data", []);
        const seo_category_promises = map(seo_category_data, (category) => ({
          route: `/category/${category._id}`,
          payload:
            {
              ...category.seo,
              url: `${process.env.BASE_URL}/category/${category._id}`,
              type: SEO_TYPE.CATEGORY,
            } || {},
        }));

        const seo_pages_promises = new Promise((res) =>
          res([
            {
              route: "/category",
              payload: {
                ...seo_category_schema,
                url: `${process.env.BASE_URL}/category`,
              },
            },
            {
              route: "/post",
              payload: {
                ...seo_post_schema,
                url: `${process.env.BASE_URL}/post`,
              },
            },
          ])
        );

        const seo_routes = await Promise.all([
          seo_post_promises,
          seo_category_promises,
          seo_pages_promises,
        ]);

        return flattenDeep(concat(seo_routes));
      } catch (error) {
        console.error(error);
      }
    },
  },

  hooks: {
    "vue-renderer": {
      spa: {
        prepareContext({ head, payload }) {
          if (!payload) {
            return;
          }

          const seo_title = get(payload, "title", "");
          const seo_description = get(payload, "description", "");
          const seo_url = get(payload, "url", "");
          const seo_image_url = get(payload, "thumbnail", "");
          const seo_type = get(payload, "type", "");
          const seo_keywords = get(payload, "keywords", "");

          head.title = seo_title;

          if (seo_title) {
            const seo_og_title_index = findIndex(head.meta, [
              "hid",
              "og:title",
            ]);
            head.meta[seo_og_title_index].content = seo_title;

            const seo_twitter_title_index = findIndex(head.meta, [
              "hid",
              "twitter:title",
            ]);
            head.meta[seo_twitter_title_index].content = seo_title;

            const seo_twitter_image_alt_index = findIndex(head.meta, [
              "hid",
              "twitter:image:alt",
            ]);
            head.meta[seo_twitter_image_alt_index].content = seo_title;

            const seo_og_image_alt_index = findIndex(head.meta, [
              "hid",
              "og:image:alt",
            ]);
            head.meta[seo_og_image_alt_index].content = seo_title;
          }

          if (seo_description) {
            const seo_og_description_index = findIndex(head.meta, [
              "hid",
              "og:description",
            ]);
            head.meta[seo_og_description_index].content = seo_description;

            const seo_twitter_description_index = findIndex(head.meta, [
              "hid",
              "twitter:description",
            ]);
            head.meta[seo_twitter_description_index].content = seo_description;
          }

          if (seo_url) {
            const seo_og_url_index = findIndex(head.meta, ["hid", "og:url"]);
            head.meta[seo_og_url_index].content = seo_url;
          }

          if (seo_keywords) {
            const seo_og_keywords_index = findIndex(head.meta, [
              "hid",
              "keywords",
            ]);
            head.meta[seo_og_keywords_index].content = seo_keywords;
          }

          if (seo_image_url) {
            const seo_og_image_index = findIndex(head.meta, [
              "hid",
              "og:image",
            ]);
            head.meta[seo_og_image_index].content = seo_image_url;
          }

          if (seo_image_url) {
            const seo_twitter_image_index = findIndex(head.meta, [
              "hid",
              "twitter:image",
            ]);
            head.meta[seo_twitter_image_index].content = seo_image_url;
          }

          if (seo_type === SEO_TYPE.POST) {
            const seo_og_type_index = findIndex(head.meta, ["hid", "og:type"]);
            head.meta[seo_og_type_index].content = seo_type;

            head.link.push({
              rel: "canonical",
              href: `${process.env.BASE_URL}/post`,
            });
          }

          seo_type === SEO_TYPE.CATEGORY &&
            head.link.push({
              rel: "canonical",
              href: `${process.env.BASE_URL}/category`,
            });
        },
      },
    },
  },

  build: {
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
      maxSize: 300000,
    },
    transpile: [
      "vue-avatar",
      "vue-line-clamp",
      "v-scroll-to-top",
      "vue-slick-carousel",
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

  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    "@nuxtjs/sitemap",
    "@nuxtjs/moment",
    "nuxt-purgecss",
  ],

  modules: ["@nuxtjs/axios", "@nuxtjs/i18n", "@nuxtjs/pwa"],

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
        iso: "vi",
        file: "vi.json",
      },
    ],
    defaultLocale: "en",
    langDir: "./locales",
    lazy: true,
    seo: true,
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

  pwa: {
    meta: {
      title: "The best topics about life",
      description:
        "Share thoughts on topics about love, work, life style, perspective and outlook on life",
      author: "Huy Tran",
      ogHost: process.env.BASE_URL,
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

  axios: {
    baseURL: `${process.env.SERVER_URL}/api`,
    https: false,
    progress: true,
    retry: { retries: 3 },
    credentials: false,
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    exclude: ["/.env", "/.env.example", ...exclude_pages],
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
    BASE_URL: process.env.BASE_URL || "http://localhost:8082",
    OWNER_EMAIL: process.env.OWNER_EMAIL,
  },
};
