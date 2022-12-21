<template>
  <div v-if="is_published">
    <a href="#" ref="scrollToMe"></a>

    <BasePostPanel :post_data="post" id="post" />
    <div class="pt-12">
      <BaseSuggestionPosts :posts_data="suggestion_posts" />
    </div>
    <div class="pt-12">
      <BaseCommentPanel :post_data="post" :comments_data="comments" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import postMixins from "@/mixins/post";
import commentMixins from "@/mixins/comment";
import BasePostPanel from "@/components/post/BasePostPanel";
import BaseSuggestionPosts from "@/components/post/BaseSuggestionPosts";
import BaseCommentPanel from "@/components/comment/BaseCommentPanel";

export default {
  name: "PostPanel",
  middleware: ["authentication"],
  async asyncData({ store, params }) {
    try {
      const post_id = params.id;
      const post = await store.dispatch("post/GET_POST", {
        id: post_id,
        user_id: _.get(store.getters["auth/me"], "_id"),
      });

      const post_categories = _.get(post, "categories", []) || [];
      const category_ids = post_categories.map((category) => category._id);

      await Promise.all([
        store.dispatch("post/GET_SUGGESTION_POSTS", {
          categories: category_ids,
          exclude_ids: [post_id],
        }),
        store.dispatch("comment/GET_COMMENTS_BY_POST_PAGINATED", {
          post_id,
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
  mixins: [postMixins, commentMixins],
  components: {
    BasePostPanel,
    BaseSuggestionPosts,
    BaseCommentPanel,
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),

    is_published() {
      return _.get(this.post, "is_published", false);
    },
  },
};
</script>
