<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  async asyncData({ store, params }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      const category_id = params.id;

      store.commit("post/SET_CATEGORIES_FILTERS", { data: [category_id] });

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        categories: store.getters["category/categories_filters"],
        user_id: _.get(store.getters["auth/me"], "_id"),
      });
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    BaseArticles,
  },
  computed: {
    ...mapGetters({
      posts: "post/posts",
      me: "auth/me",
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

<style></style>
