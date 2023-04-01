<template>
  <BaseArticles />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  middleware: ["authenticate"],
  async asyncData({ store, query }) {
    try {
      const tags = query.tags;
      store.commit("post/SET_TAGS_FILTERS", { data: [tags] });

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        tags: [tags],
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
