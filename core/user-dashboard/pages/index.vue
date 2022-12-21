<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  async asyncData({ store, route }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      await store.dispatch("post/GET_POSTS_PAGINATED", {
        user_id: _.get(store.getters["auth/me"], "_id"),
        query: route.query.search,
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

  watch: {
    "$route.query": {
      async handler(query) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        await this.GET_POSTS_PAGINATED({
          query: query.search,
        });
      },
    },
  },

  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),
  },
};
</script>
