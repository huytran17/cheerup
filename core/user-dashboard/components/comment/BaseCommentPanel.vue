<template>
  <v-row v-if="can_not_show_comment_panel">
    <v-col cols="12" class="pb-11">
      <div
        class="text__content text-sm-body-2 text-uppercase text-center grey--text"
      >
        <span
          v-if="is_post_blocked_comment"
          class="app-body"
          v-html="$t('This post has been locked from commenting')"
        ></span>
        <span
          v-else-if="is_user_blocked_comment"
          class="app-body"
          v-html="$t('You have been blocked from commenting')"
        ></span>
        <span
          v-else-if="!has_user"
          class="app-body"
          v-html="$t('You must be logged in to view comments')"
        ></span>
      </div>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12" class="pb-0">
      <div
        class="text-body-1 text-sm-h6 text-uppercase pb-11 comment__header position-relative"
      >
        <span
          class="app-body"
          v-html="
            $tc('{count} Comment', comment_count_by_post, {
              count: comment_count_by_post,
            })
          "
        ></span>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <TiptapEditor
        :content="new_comment"
        :disabled="!has_user"
        attr="content"
        @on-input="
          updateNewCommentObject({ variable_path: 'content', data: $event })
        "
        :key="`comment-editor-${refresh_comment_editor_key}`"
      />
      <div class="d-flex pt-4">
        <div class="ml-auto">
          <v-btn
            depressed
            tile
            small
            :disabled="!has_user || is_app_loading"
            color="brick"
            class="white--text"
            @click="createComment"
          >
            <span class="app-body" v-html="$t('Submit')"></span>
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-col v-if="has_comments" cols="12">
      <v-row v-for="comment in comments" :key="comment._id">
        <v-col cols="12">
          <BaseCommentItem :comment_data="comment" />
          <div v-if="comment.has_children">
            <div v-if="comment.is_shown_children">
              <v-row
                v-for="child in comment.children"
                :key="child._id"
                class="pl-15 mt-6"
              >
                <v-col cols="12" class="pt-0">
                  <BaseCommentItem :comment_data="child" />
                </v-col>
              </v-row>
            </div>
            <div
              v-else
              class="text-body-3 text-sm-body-2 text-uppercase brick--text pl-15 mt-4"
            >
              <span
                class="app-body clickable"
                v-html="$t('Show reply')"
                @click="getChildComments(comment)"
              ></span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="pa-0"> <BaseReplyForm /> </v-col>
    <v-col cols="12" class="pa-0"> <BaseEditForm /> </v-col>
    <v-col v-if="has_more_comments" cols="12" class="pa-4">
      <div
        class="text__content text-sm-body-2 text-uppercase text-center brick--text"
      >
        <span
          class="app-body clickable"
          v-html="$t('View more comments')"
          @click="getMoreComments"
        ></span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { get, isEmpty, cloneDeep, merge } from "lodash";
import { mapMutations, mapGetters } from "vuex";
import commentMixins from "@/mixins/comment";
import postMixins from "@/mixins/post";
import authMixins from "@/mixins/auth";
import TiptapEditor from "@/components/TiptapEditor";
import BaseCommentItem from "@/components/comment/BaseCommentItem";
import BaseReplyForm from "@/components/comment/BaseReplyForm";
import BaseEditForm from "@/components/comment/BaseEditForm";

export default {
  name: "BaseCommentPanel",
  mixins: [commentMixins, authMixins, postMixins],
  components: {
    TiptapEditor,
    BaseCommentItem,
    BaseReplyForm,
    BaseEditForm,
  },
  data() {
    return {
      refresh_comment_editor_key: 0,
    };
  },
  computed: {
    ...mapGetters({
      is_app_loading: "is_app_loading",
    }),

    has_more_comments() {
      return (
        this.comment_pagination.total_pages &&
        this.comment_pagination.current_page !==
          this.comment_pagination.total_pages
      );
    },

    can_not_show_comment_panel() {
      return this.is_post_blocked_comment || this.is_user_blocked_comment;
    },

    is_post_blocked_comment() {
      const is_post_blocked_comment = get(
        this.post,
        "is_blocked_comment",
        false
      );

      return is_post_blocked_comment;
    },

    is_user_blocked_comment() {
      const is_user_blocked_comment = get(this.me, "is_blocked_comment", false);

      return is_user_blocked_comment;
    },

    has_comments() {
      return !isEmpty(this.comments);
    },
  },
  methods: {
    ...mapMutations({
      SET_POST: "post/SET_POST",
    }),

    async getChildComments(comment) {
      try {
        const parent_id = comment._id;

        const child_comments = await this.GET_COMMENTS_BY_PARENT({
          parent_id,
          user_id: this.me?._id,
        });

        this.replaceCommentDataAtPath({
          _id: parent_id,
          data: child_comments,
        });

        this.replaceCommentDataAtPath({
          _id: parent_id,
          data: true,
          path: "is_shown_children",
        });
      } catch (err) {
        console.error(err);
      }
    },

    async createComment() {
      try {
        const new_comment_content = get(this.new_comment, "content", "");
        if (!new_comment_content) {
          return;
        }

        const post_id = get(this.post, "_id");
        const final_comment_data = merge({}, this.new_comment, {
          post: post_id,
        });

        const new_comment_data = await this.CREATE_COMMENT({
          data: final_comment_data,
        });

        await this.COUNT_COMMENT_BY_POST({ post_id });

        this.updateNewCommentObject({
          variable_path: "content",
          data: "",
        });

        ++this.refresh_comment_editor_key;

        const cloned_comments_data = cloneDeep(this.comments);
        cloned_comments_data.unshift(new_comment_data);
        this.UPDATE_COMMENTS_DATA({
          data: cloned_comments_data,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async getMoreComments() {
      try {
        const post_id = get(this.post, "_id");

        await this.GET_COMMENTS_BY_POST_PAGINATED({
          page: this.comment_pagination.current_page + 1,
          new_state: false,
          post_id,
          user_id: this.me?._id,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  async fetch() {
    try {
      await this.COUNT_COMMENT_BY_POST({
        post_id: get(this.post, "_id"),
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.comment__header::before {
  position: absolute;
  content: "";
  bottom: 32px;
  left: 0;
  width: 70px;
  height: 2px;
  border-bottom: 1px solid var(--color-header-baseline-border);
}
</style>
