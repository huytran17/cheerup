<template>
  <BaseArticles :posts_data="posts" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  async asyncData({ store }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      await store.dispatch("post/GET_POSTS_PAGINATED", {
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
};
</script>
