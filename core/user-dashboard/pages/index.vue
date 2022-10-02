<template>
  <div v-if="loading"></div>
  <div v-else>
    <BaseArticles :posts_data="posts" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  components: {
    BaseArticles,
  },

  computed: {
    ...mapGetters({
      posts: "post/posts",
      loading: "post/loading",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),

    ...mapMutations({
      SET_POST_LOADING: "post/SET_LOADING",
    }),
  },

  async fetch() {
    try {
      this.SET_POST_LOADING({ data: true });

      await this.GET_POSTS_PAGINATED();
    } catch (err) {
      console.error(err);
    } finally {
      this.SET_POST_LOADING({ data: false });
    }
  },
};
</script>
