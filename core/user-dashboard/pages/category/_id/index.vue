<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  components: {
    BaseArticles,
  },
  computed: {
    ...mapGetters({
      posts: "post/posts",
      categories_filters: "post/categories_filters",
      me: "auth/me",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),

    ...mapMutations({
      SET_CATEGORIES_FILTERS: "post/SET_CATEGORIES_FILTERS",
    }),
  },
  async fetch() {
    try {
      const category_id = this.$route.params.id;
      this.SET_CATEGORIES_FILTERS({ data: [category_id] });

      await this.GET_POSTS_PAGINATED({
        categories: this.categories_filters,
        user_id: _.get(this.me, "_id"),
      });
    } catch (err) {
      console.error(err);
    }
  },

  beforeDestroy() {
    this.SET_CATEGORIES_FILTERS({ data: [] });
  },
};
</script>

<style></style>
