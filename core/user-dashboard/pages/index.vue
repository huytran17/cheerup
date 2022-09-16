<template>
  <div>
    <BaseArticles :posts_data="posts" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  components: {
    BaseArticles,
  },

  computed: {
    ...mapGetters({
      posts: "post/posts",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),
  },

  async fetch() {
    try {
      await this.GET_POSTS_PAGINATED();
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
