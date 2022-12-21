<template>
  <div class="d-flex">
    <div>
      <v-img
        :src="user_avatar"
        :lazy-src="user_avatar"
        :alt="user_fullname"
        max-height="45px"
        max-width="45px"
        cover
        class="rounded-circle"
      ></v-img>
    </div>
    <div class="d-flex flex-column pl-4">
      <div class="text-body-2">
        <span class="app-body">{{ user_fullname }}</span>
      </div>
      <div class="text-caption grey--text">
        <span class="app-body">{{ formatDate(comment_data.created_at) }}</span>
      </div>
      <div class="text-body-2 pt-1">
        <span class="app-body" v-html="comment_data.content"></span>
      </div>
      <div class="d-flex">
        <div class="d-flex">
          <v-icon
            :color="is_liked ? 'brick' : 'black'"
            small
            class="mr-1 clickable"
            @click="likeComment"
            >{{ is_liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
          >
          <span class="text-body-2">
            <span class="app-body">{{ comment_likes }}</span>
          </span>
        </div>

        <div class="d-flex pl-3">
          <v-icon
            :color="is_disliked ? 'brick' : 'black'"
            small
            class="mr-1 clickable"
            @click="dislikeComment"
          >
            {{
              is_disliked ? "mdi-thumb-down" : "mdi-thumb-down-outline"
            }}</v-icon
          >
          <span class="text-body-2">
            <span class="app-body">{{ comment_dislikes }}</span>
          </span>
        </div>

        <div v-if="is_own_comment" class="d-flex pl-5">
          <v-icon
            small
            class="mr-1 clickable icon__font--medium"
            @click="
              () => {
                SET_COMMENT({ data: comment_data });
                SET_IS_OPEN_EDIT_COMMENT({ data: true });
              }
            "
            >mdi-playlist-edit</v-icon
          >
        </div>

        <div
          v-if="is_parent"
          class="d-flex pl-2"
          @click="
            () => {
              SET_COMMENT({ data: comment_data });
              SET_IS_OPEN_REPLY_COMMENT({ data: true });
            }
          "
        >
          <v-icon small class="mr-1 clickable icon__font--medium"
            >mdi-reply-outline</v-icon
          >
        </div>

        <div v-if="is_own_comment" class="d-flex pl-2">
          <v-icon
            small
            class="mr-1 clickable icon__font--medium"
            @click="deleteComment"
            >mdi-delete-outline</v-icon
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";
import commentMixins from "@/mixins/comment";
export default {
  name: "BaseCommentItem",
  mixins: [systemMixins, commentMixins],
  props: {
    comment_data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
      post: "post/post",
    }),

    is_parent() {
      const parent = _.get(this.comment_data, "parent");
      const is_parent_comment = _.isNil(parent);
      return is_parent_comment;
    },

    is_liked() {
      const users_liked = _.get(this.comment_data, "meta.likes", []);
      const user_id = _.get(this.me, "_id");
      return _.includes(users_liked, user_id);
    },

    is_disliked() {
      const users_disliked = _.get(this.comment_data, "meta.dislikes", []);
      const user_id = _.get(this.me, "_id");
      return _.includes(users_disliked, user_id);
    },

    user_avatar() {
      return (
        _.get(this.comment_data, "user.avatar_url") ||
        require("@/assets/images/default/user-avatar.png")
      );
    },

    user_fullname() {
      return _.get(this.comment_data, "user.full_name");
    },

    comment_likes() {
      return _.get(this.comment_data, "likes_count");
    },

    comment_dislikes() {
      return _.get(this.comment_data, "dislikes_count");
    },

    is_own_comment() {
      return _.get(this.me, "_id") === _.get(this.comment_data, "user._id");
    },
  },
  methods: {
    async likeComment() {
      try {
        await this.LIKE_COMMENT({ id: _.get(this.comment_data, "_id") });
        await this.GET_COMMENTS_BY_POST_PAGINATED({
          post_id: _.get(this.post, "_id", ""),
        });
      } catch (error) {
        console.error(error);
      }
    },

    async dislikeComment() {
      try {
        await this.DISLIKE_COMMENT({ id: _.get(this.comment_data, "_id") });
        await this.GET_COMMENTS_BY_POST_PAGINATED({
          post_id: _.get(this.post, "_id", ""),
        });
      } catch (error) {
        console.error(error);
      }
    },

    async deleteComment() {
      try {
        const post_id = _.get(this.post, "_id");

        await this.DELETE_COMMENT({ id: _.get(this.comment_data, "_id") });
        await Promise.all([
          this.GET_COMMENTS_BY_POST_PAGINATED({
            post_id,
          }),
          this.COUNT_COMMENT_BY_POST({ post_id }),
        ]);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
:deep(button.v-icon::after) {
  background: transparent !important;
}
</style>
