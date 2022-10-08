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
  mixins: [postMixins, commentMixins],
  async asyncData({ store, params }) {
    const access_token = localStorage.getItem("access_token");
    if (!_.isNil(access_token)) {
      await store.dispatch("auth/GET_ME");
    }

    const post_id = params.id;
    await store.dispatch("post/GET_POST", {
      id: post_id,
      user_id: _.get(store.getters["auth/me"], "_id"),
    });
  },
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

  async fetch() {
    try {
      this.SET_POST_LOADING({ data: true });

      const post_id = this.$route.params.id;

      const category_ids = this.post.categories?.map(
        (category) => category._id
      );

      await Promise.all([
        this.GET_SUGGESTION_POSTS({
          categories: category_ids,
          exclude_ids: [post_id],
        }),
        this.GET_COMMENTS_BY_POST({ post_id }),
      ]);
    } catch (err) {
      console.log(err);
      this.$toast.error(`Encountered error while getting post`);
    } finally {
      this.SET_POST_LOADING({ data: false });
    }
  },
  updated() {
    if (this.comment_loading) {
      return;
    }

    const el = this.$refs.scrollToMe;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
};
</script>

<style></style>
