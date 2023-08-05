import colors from "vuetify/es5/util/colors";
import axios from "axios";
import { get, findIndex, map, flattenDeep, concat, filter } from "lodash";

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
        const [seo_post_payload, seo_category_payload] = await Promise.all([
          axios.get(`${process.env.SERVER_URL}/api/seo/posts`),
          axios.get(`${process.env.SERVER_URL}/api/seo/categories`),
        ]);

        const seo_post_data = filter(
          get(seo_post_payload, "data.data", []),
          (post) => post.slug
        );
        const seo_post_routes = map(seo_post_data, (post) => ({
          route: `/post/${post.slug}`,
          payload:
            {
              ...post.seo,
              url: `${process.env.BASE_URL}/post/${post.slug}`,
              type: SEO_TYPE.POST,
            } || {},
        }));

        const seo_category_data = filter(
          get(seo_category_payload, "data.data", []),
          (category) => category.slug
        );
        const seo_category_routes = map(seo_category_data, (category) => ({
          route: `/category/${category.slug}`,
          payload:
            {
              ...category.seo,
              url: `${process.env.BASE_URL}/category/${category.slug}`,
              type: SEO_TYPE.CATEGORY,
            } || {},
        }));

        const seo_pages_routes = [
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
        ];

        return flattenDeep(
          concat(seo_post_routes, seo_category_routes, seo_pages_routes)
        );
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
          const seo_date_published = get(payload, "date_published", "");
          const seo_date_modified = get(payload, "date_modified", "");
          const seo_publisher = get(payload, "publisher", "");
          const seo_author = get(payload, "author", "");

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

          const schema_json = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: seo_title,
            image: [seo_image_url],
            datePublished: seo_date_published,
            dateModified: seo_date_modified,
            author: [
              {
                "@type": "Person",
                name: seo_author,
              },
            ],
            publisher: {
              name: seo_publisher,
            },
          };

          const schema_json_index = findIndex(head.script, ["hid", "jsonld"]);
          head.script[schema_json_index].json = schema_json;

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
      "vue-infinite-loading",
      "vue2-dropzone",
      "vue-toastification",
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
    "~/directives/otp-auto-focus",
    "~/plugins/router",
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/vue-infinite-loading", mode: "client" },
    { src: "~/plugins/vue-scroll-to-top", mode: "client" },
    { src: "~/plugins/vue2-dropzone", ssr: false },
    { src: "~/plugins/vue-avatar", mode: "client" },
    { src: "~/plugins/vue-line-clamp", mode: "client" },
    { src: "~/plugins/vue-slick-carousel", mode: "client" },
    { src: "~/plugins/vue-simple-otp-input", mode: "client" },
  ],

  components: true,

  loadingIndicator: {
    name: "pulse",
    color: "#FF2E55",
    background: "ffffff",
  },

  loading: {
    color: "#FF2E55",
    continuous: true,
  },

  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
    "nuxt-compress",
    "@nuxtjs/pwa",
  ],

  modules: [
    "nuxt-helmet",
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "nuxt-speedkit",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-purgecss",
    "@nuxtjs/imagemin",
    "@nuxtjs/toast",
  ],

  toast: {
    position: "top-center",
    duration: 5000,
    className: "cheerup-toast",
    containerClass: "cheerup-toast-container",
  },

  robots: {
    UserAgent: "*",
    Allow: "/",
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

  i18n: {
    baseUrl: process.env.BASE_URL,
    strategy: "no_prefix",
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
    seo: true,
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

  pwa: {
    meta: {
      title: "Be yourself, think your way",
      description:
        "Share thoughts on topics about love, work, life style, perspective and outlook on life",
      author: "Huy Tran",
      ogHost: process.env.BASE_URL,
    },
    icon: false,
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
    APP_NAME: process.env.APP_NAME || "Cheerup",
  },
};
