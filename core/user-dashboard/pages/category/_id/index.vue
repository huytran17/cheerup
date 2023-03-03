<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  middleware: ["authenticate"],
  async asyncData({ store, params }) {
    try {
      const category_id = params.id;

      store.commit("post/SET_CATEGORIES_FILTERS", { data: [category_id] }); // use for infinite loading

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        categories: [category_id],
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
