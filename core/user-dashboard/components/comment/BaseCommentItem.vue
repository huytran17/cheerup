<template>
  <div class="d-flex">
    <div>
      <v-img
        :src="user_avatar"
        :lazy-src="user_avatar"
        :alt="user_fullname"
        cover
        class="rounded-circle avatar"
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-private="
                  $t('You need to be logged in to perform this action')
                "
                :color="is_liked ? 'brick' : 'black'"
                small
                class="mr-1 clickable"
                @click="likeComment"
                >{{ is_liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
              >
              <span class="text-body-2">
                <span class="app-body">{{ comment_likes }}</span>
              </span>
            </template>
            <span v-html="$t('Like')"></span>
          </v-tooltip>
        </div>

        <div class="d-flex pl-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-private="
                  $t('You need to be logged in to perform this action')
                "
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
            </template>
            <span v-html="$t('Dislike')"></span>
          </v-tooltip>
        </div>

        <div v-if="is_own_comment" class="d-flex pl-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
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
            </template>
            <span v-html="$t('Edit')"></span>
          </v-tooltip>
        </div>

        <div
          v-if="can_reply"
          class="d-flex pl-2"
          @click="
            () => {
              SET_COMMENT({ data: comment_data });
              SET_IS_OPEN_REPLY_COMMENT({ data: true });
            }
          "
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                class="mr-1 clickable icon__font--medium"
                >mdi-reply-outline</v-icon
              >
            </template>
            <span v-html="$t('Reply')"></span>
          </v-tooltip>
        </div>

        <div v-if="is_own_comment" class="d-flex pl-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                class="mr-1 clickable icon__font--medium"
                @click="deleteComment"
                >mdi-delete-outline</v-icon
              >
            </template>
            <span v-html="$t('Delete')"></span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";
import commentMixins from "@/mixins/comment";
import commentLikeMixins from "@/mixins/comment-like";
import { COMMENT_LIKE_TYPE } from "@/constants";

export default {
  name: "BaseCommentItem",
  mixins: [systemMixins, commentMixins, commentLikeMixins],
  props: {
    comment_data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
      has_user: "auth/has_user",
      post: "post/post",
    }),

    can_reply() {
      return get(this.comment_data, "is_parent") && this.has_user;
    },

    is_liked() {
      return get(this.comment_data, "is_liked", false);
    },

    is_disliked() {
      return get(this.comment_data, "is_disliked", false);
    },

    user_avatar() {
      return (
        get(this.comment_data, "user.avatar_url") ||
        require("@/assets/images/default/user-avatar.webp")
      );
    },

    user_fullname() {
      return get(this.comment_data, "user.full_name");
    },

    comment_likes() {
      return get(this.comment_data, "likes_count");
    },

    comment_dislikes() {
      return get(this.comment_data, "dislikes_count");
    },

    is_own_comment() {
      return get(this.me, "_id") === get(this.comment_data, "user._id");
    },
  },
  methods: {
    async likeComment() {
      try {
        if (!this.has_user) {
          return;
        }

        const comment_id = get(this.comment_data, "_id");
        await this.CREATE_OR_UPDATE_COMMENT_LIKE({
          data: {
            comment_id,
            type: COMMENT_LIKE_TYPE.LIKE,
          },
        });

        await this.GET_COMMENT({
          id: comment_id,
          is_show_children: this.comment_data.is_shown_children,
        });

        this.replaceCommentData({
          data: this.comment,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async dislikeComment() {
      try {
        if (!this.has_user) {
          return;
        }

        const comment_id = get(this.comment_data, "_id");
        await this.CREATE_OR_UPDATE_COMMENT_LIKE({
          data: {
            comment_id,
            type: COMMENT_LIKE_TYPE.DISLIKE,
          },
        });

        await this.GET_COMMENT({
          id: comment_id,
          is_show_children: this.comment_data.is_shown_children,
        });

        this.replaceCommentData({
          data: this.comment,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async deleteComment() {
      try {
        const comment_id = get(this.comment_data, "_id");

        await this.HARD_DELETE_COMMENT({ id: comment_id });
        await this.COUNT_COMMENT_BY_POST({ post_id: this.post?._id });

        this.deleteCommentData({ _id: comment_id });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button.v-icon::after {
  background: transparent;
}

.v-image.avatar {
  max-width: toRem(45);
  max-height: toRem(45);
  aspect-ratio: 1;
}
</style>
