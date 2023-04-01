<template>
  <BaseArticles />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  async asyncData({ store, params }) {
    try {
      const category_id = params.id;

      store.commit("post/SET_CATEGORIES_FILTERS", { data: [category_id] });

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
