<template>
  <div>
    <BaseArticles :posts_data="posts" />
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  mixins: [postMixins],
  components: {
    BaseArticles,
  },

  async fetch() {
    try {
      await Promise.all([this.GET_POSTS_PAGINATED()]);
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
