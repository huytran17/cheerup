<template>
  <div>
    <a
      href="#"
      id="post-panel__top"
      ref="scrollToMe"
      target="post"
      name="post"
    ></a>
    <BasePostPanel :post_data="post" id="post" />
    <div class="pt-12">
      <BaseSuggestionPosts :posts_data="suggestion_posts" />
    </div>
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
  updated() {
    const el = this.$refs.scrollToMe;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
};
</script>

<style></style>
