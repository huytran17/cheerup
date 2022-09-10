<template>
  <div>
    <BasePostPanel :post_data="post" />
    <BaseSuggestionPosts :posts_data="suggestion_posts" />
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import BasePostPanel from "@/components/post/BasePostPanel";
import BaseSuggestionPosts from "@/components/post/BaseSuggestionPosts";
export default {
  name: "PostPanel",
  mixins: [postMixins],
  components: {
    BasePostPanel,
    BaseSuggestionPosts,
  },
  async fetch() {
    try {
      const post_id = this.$route.params.id;
      const post = await this.GET_POST({ id: post_id });
      const category_ids = post.categories?.map((category) => category._id);

      await this.GET_SUGGESTION_POSTS({
        categories: _.join(category_ids, ","),
      });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
