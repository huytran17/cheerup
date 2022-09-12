<template>
  <div class="d-flex">
    <div>
      <v-img
        :src="user_avatar"
        :lazy-src="user_avatar"
        :alt="user_fullname"
        max-width="35px"
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
            small
            class="mr-1 clickable"
            @click="likeComment({ _id: comment_data._id })"
            >mdi-heart-outline</v-icon
          >
          <span class="text-body-2">
            <span class="app-body">{{ comment_likes }}</span>
          </span>
        </div>

        <div class="d-flex pl-3">
          <v-icon small class="mr-1 clickable">mdi-thumb-down-outline</v-icon>
          <span class="text-body-2">
            <span class="app-body">{{ comment_dislikes }}</span>
          </span>
        </div>

        <div v-if="is_own_comment" class="d-flex pl-5">
          <v-icon small class="mr-1 clickable icon__font--medium"
            >mdi-playlist-edit</v-icon
          >
        </div>

        <div class="d-flex pl-2">
          <v-icon small class="mr-1 clickable icon__font--medium"
            >mdi-reply-outline</v-icon
          >
        </div>

        <div v-if="is_own_comment" class="d-flex pl-2">
          <v-icon small class="mr-1 clickable icon__font--medium"
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
    }),

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
    async likeComment({ _id }) {
      try {
        await this.LIKE_COMMENT({ id: _id });
      } catch (err) {
        console.error(err);
      }
    },

    dislikeComment({ _id }) {},
  },
};
</script>

<style></style>
