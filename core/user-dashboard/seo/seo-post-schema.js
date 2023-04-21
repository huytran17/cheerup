import { join } from "lodash";

const seo_post_schema = {
  titleTemplate: "%s - Cheerup",
  title: "The best articles on featured topics",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Discover the best articles on topics of the most interest",
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
      hid: "og:title",
      property: "og:title",
      content: "The best articles on featured topics",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "blog",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `${process.env.APP_URL}/post`,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: "Discover the best articles on topics of the most interest",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "http://localhost:8082/logo.png",
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content: "cheerup_logo",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "The best articles on featured topics",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: "Discover the best articles on topics of the most interest",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "http://localhost:8082/logo.png",
    },
    {
      hid: "twitter:image:alt",
      name: "twitter:image:alt",
      content: "cheerup_logo",
    },
  ],
};

export { seo_post_schema };
