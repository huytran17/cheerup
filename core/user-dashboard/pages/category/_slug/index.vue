<template>
  <BaseArticles />
</template>

<script>
import { get } from "lodash";
import { mapGetters, mapMutations } from "vuex";
import { get } from "lodash";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  head() {
    const seo_title = get(this.category, "seo.title");
    const seo_description = get(this.category, "seo.description");
    const seo_keywords = get(this.category, "seo.keywords");
    const seo_author = get(this.category, "seo.author");
    const seo_thumbnail = get(this.category, "thumbnail_url");

    return {
      title: seo_title,
      meta: [
        {
          hid: "author",
          name: "author",
          content: seo_author,
        },
        {
          hid: "description",
          name: "description",
          content: seo_description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: seo_keywords,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: seo_title,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.BASE_URL}/category/${this.$route.params.slug}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: seo_description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: seo_thumbnail,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: seo_title,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: seo_title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: seo_description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: seo_thumbnail,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: seo_title,
        },
      ],
      link: [{ rel: "canonical", href: `${process.env.BASE_URL}/category` }],
    };
  },
  async asyncData({ store, params }) {
    try {
      const slug = params.slug;

      const category = await store.dispatch("category/GET_CATEGORY_BY_SLUG", {
        slug,
      });

      store.commit("post/SET_CATEGORIES_FILTERS", { data: [category._id] });

      await Promise.all([
        store.dispatch("post/GET_POSTS_PAGINATED", {
          categories: [category._id],
          user_id: get(store.getters["auth/me"], "_id"),
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    BaseArticles,
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
      category: "category/category",
    }),
  },
  methods: {
    ...mapMutations({
      SET_CATEGORIES_FILTERS: "post/SET_CATEGORIES_FILTERS",
    }),
  },

  beforeDestroy() {
    this.SET_CATEGORIES_FILTERS({ data: [] });
  },
};
</script>
