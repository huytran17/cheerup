<template>
  <v-row v-if="is_post_blocked_comment || is_user_blocked_comment">
    <v-col cols="12" class="pb-11">
      <div
        class="text__description text-sm-body-2 text-uppercase text-center grey--text"
      >
        <span
          v-if="is_post_blocked_comment"
          class="app-body"
          v-html="$t('This post has been locked from comments')"
        ></span>
        <span
          v-else-if="is_user_blocked_comment"
          class="app-body"
          v-html="$t('You has been locked from comments')"
        ></span>
      </div>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12" class="pb-0">
      <div
        class="text-h6 text-uppercase pb-11 comment__header position-relative"
      >
        <span
          class="app-body"
          v-html="
            $tc('{count} Comment', comment_pagination.total, {
              count: comment_pagination.total,
            })
          "
        ></span>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <TiptapEditor
        :content="new_comment"
        attr="content"
        @on-input="
          updateNewCommentObject({ variable_path: 'content', data: $event })
        "
        :key="`comment-editor-${refresh_comment_editor_key}`"
      />
      <div class="d-flex pt-4">
        <div v-if="!has_user" class="text-body-2 primary--text mr-auto">
          <span
            class="app-body clickable"
            @click="redirectToLoginPage"
            v-html="$t('Login to your account')"
          ></span>
        </div>
        <div class="ml-auto">
          <v-btn
            depressed
            tile
            :disabled="!has_user"
            color="black"
            class="white--text"
            @click="createComment"
          >
            <span class="app-body" v-html="$t('Submit')"></span>
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-col v-if="has_comments" cols="12">
      <v-row v-for="comment in comments_data" :key="comment._id">
        <v-col cols="12">
          <BaseCommentItem :comment_data="comment" />
          <div v-if="comment.children && comment.children.length">
            <v-row
              v-for="child in comment.children"
              :key="child._id"
              class="pl-13 mt-6"
            >
              <v-col cols="12" class="pt-0">
                <BaseCommentItem :comment_data="child" />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="pa-0"> <BaseReplyForm /> </v-col>
    <v-col cols="12" class="pa-0"> <BaseEditForm /> </v-col>
    <v-col v-if="has_more_comments" cols="12" class="pa-4">
      <div
        class="text__description text-sm-body-2 text-uppercase text-center brick--text"
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
import { mapMutations } from "vuex";
import commentMixins from "@/mixins/comment";
import authMixins from "@/mixins/auth";
import TiptapEditor from "@/components/TiptapEditor";
import BaseCommentItem from "@/components/comment/BaseCommentItem";
import BaseReplyForm from "@/components/comment/BaseReplyForm";
import BaseEditForm from "@/components/comment/BaseEditForm";

export default {
  name: "BaseCommentPanel",
  mixins: [commentMixins, authMixins],
  components: {
    TiptapEditor,
    BaseCommentItem,
    BaseReplyForm,
    BaseEditForm,
  },
  props: {
    post_data: {
      type: Object,
      default: () => {},
    },
    comments_data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      refresh_comment_editor_key: 0,
    };
  },
  computed: {
    has_more_comments() {
      return (
        this.comment_pagination.current_page !==
        this.comment_pagination.total_pages
      );
    },

    is_post_blocked_comment() {
      const is_post_blocked_comment = _.get(
        this.post_data,
        "is_blocked_comment",
        false
      );

      return is_post_blocked_comment;
    },

    is_user_blocked_comment() {
      const is_user_blocked_comment = _.get(
        this.me,
        "is_blocked_comment",
        false
      );

      return is_user_blocked_comment;
    },

    has_comments() {
      return !_.isEmpty(this.comments_data);
    },
  },
  methods: {
    ...mapMutations({
      SET_LOGIN_REDIRECT_URL: "SET_LOGIN_REDIRECT_URL",
      SET_POST: "post/SET_POST",
    }),

    async createComment() {
      try {
        this.SET_COMMENT_LOADING({ data: true });

        const new_comment_content = _.get(this.new_comment, "content", "");
        if (!new_comment_content) {
          return;
        }

        const post_id = _.get(this.post_data, "_id");
        const final_comment_data = Object.assign({}, this.new_comment, {
          post: post_id,
        });

        const new_comment_data = await this.CREATE_COMMENT({
          data: final_comment_data,
        });

        this.updateNewCommentObject({
          variable_path: "content",
          data: "",
        });

        ++this.refresh_comment_editor_key;

        const cloned_comments_data = _.cloneDeep(this.comments);
        cloned_comments_data.unshift(new_comment_data);
        this.UPDATE_COMMENTS_DATA({
          data: cloned_comments_data,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.SET_COMMENT_LOADING({ data: false });
      }
    },

    redirectToLoginPage() {
      this.SET_LOGIN_REDIRECT_URL({ data: this.$route.fullPath });
      return this.$router.push(this.localePath("/login"));
    },

    async getMoreComments() {
      try {
        this.SET_COMMENT_LOADING({ data: true });

        const post_id = _.get(this.post_data, "_id");

        await this.GET_COMMENTS_BY_POST_PAGINATED({
          page: this.comment_pagination.current_page + 1,
          new_state: false,
          post_id,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.SET_COMMENT_LOADING({ data: false });
      }
    },
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
