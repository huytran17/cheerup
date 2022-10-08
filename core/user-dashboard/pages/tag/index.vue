<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";

export default {
  name: "CategoryIndexPage",
  async asyncData({ store, query }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      const tags = query.tags;
      store.commit("post/SET_TAGS_FILTERS", { data: [tags] }); // use for infinite loading

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        tags: [tags],
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
      SET_TAGS_FILTERS: "post/SET_TAGS_FILTERS",
    }),
  },

  beforeDestroy() {
    this.SET_TAGS_FILTERS({ data: [] });
  },
};
</script>

<style></style>
