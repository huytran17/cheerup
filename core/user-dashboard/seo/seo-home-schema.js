import { join } from "lodash";

const seo_home_schema = {
  titleTemplate: "%s - Cheerup",
  title: "Be yourself, think your way",
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0",
    },
    { name: "format-detection", content: "telephone=no" },
    {
      hid: "author",
      name: "author",
      content: "Huy Tran",
    },
    {
      hid: "description",
      name: "description",
      content:
        "Share thoughts on topics about love, work, life style, perspective and outlook on life",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: join(
        [
          "best articles",
          "discuss about life",
          "fashion blog",
          "food blog",
          "featured topics",
          "job knowledge",
          "knowledge sharing",
          "life style",
          "life style blog",
          "life perspective",
          "life knowledge",
          "programming blog",
          "share thoughts",
          "the best articles about life",
          "the best articles about life style",
          "the best articles about love",
          "the best articles about programming",
          "the best articles about fashion",
          "the best articles about travel",
          "the best blog",
          "the best topics",
          "the best articles",
          "web programming blog",
        ],
        ","
      ),
    },
    {
      hid: "robots",
      name: "robots",
      content: "all",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "Be yourself, think your way",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "blog",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: process.env.BASE_URL,
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "Share thoughts on topics about love, work, life style, perspective and outlook on life",
    },
    {
      hid: "og:locale",
      property: "og:locale",
      content: "en_US",
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: "Cheerup",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "http://cheerup.blog/logo.png",
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content: "cheerup_logo",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "Be yourself, think your way",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content:
        "Share thoughts on topics about love, work, life style, perspective and outlook on life",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "http://cheerup.blog/logo.png",
    },
    {
      hid: "twitter:image:alt",
      name: "twitter:image:alt",
      content: "cheerup_logo",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: process.env.BASE_URL },
  ],
  script: [
    {
      hid: "jsonld",
      type: "application/ld+json",
      json: {
        "@context": "http://schema.org",
      },
    },
  ],
};

export { seo_home_schema };
