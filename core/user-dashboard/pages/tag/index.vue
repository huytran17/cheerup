<template>
  <BaseArticles />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { seo_post_schema } from "../../seo";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  head() {
    return {
      ...seo_post_schema,
      title: this.$route.query.tag,
    };
  },
  async asyncData({ store, query }) {
    try {
      const tag = query.tag;
      store.commit("post/SET_TAG_FILTERS", { data: [tag] });

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        tags: [tag],
        user_id: _.get(store.getters["auth/me"], "_id"),
      });
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
    }),
  },
  methods: {
    ...mapMutations({
      SET_TAGS_FILTERS: "post/SET_TAGS_FILTERS",
    }),
  },

  beforeDestroy() {
    this.SET_TAGS_FILTERS({ data: [] });
  },
};
</script>
