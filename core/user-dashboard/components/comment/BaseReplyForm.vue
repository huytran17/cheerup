<template>
  <v-bottom-sheet :value="is_open_reply_comment" inset persistent>
    <v-sheet class="px-4 position-relative" height="300px">
      <v-btn
        class="position-absolute button__close"
        icon
        color="primary"
        @click="SET_IS_OPEN_REPLY_COMMENT({ data: false })"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex flex-column justify-center pt-10">
        <div class="text-body-2">
          <span class="app-title" v-html="$t('Replying to: ')"></span>
          <span class="app-body" v-html="comment.content"></span>
        </div>
        <div>
          <TiptapEditor
            :key="`comment-reply-editor-${refresh_comment_reply_editor_key}`"
            :content="new_reply_comment"
            attr="content"
            @on-input="
              updateNewReplyCommentObject({
                variable_path: 'content',
                data: $event,
              })
            "
          />
        </div>
        <div class="d-flex justify-end pt-4">
          <v-btn
            depressed
            color="black"
            tile
            class="white--text"
            @click="replyComment"
          >
            <span class="app-body" v-html="$t('Send')"></span>
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import commentMixins from "@/mixins/comment";
import systemMixins from "@/mixins/system";
import TiptapEditor from "@/components/TiptapEditor";

export default {
  name: "BaseReplyForm",
  mixins: [systemMixins, commentMixins],
  components: { TiptapEditor },
  data() {
    return {
      refresh_comment_reply_editor_key: 0,
    };
  },
  computed: {
    ...mapGetters({
      post: "post/post",
    }),
  },
  methods: {
    async replyComment() {
      try {
        const new_reply_comment_content = _.get(
          this.new_reply_comment,
          "content",
          ""
        );
        if (!new_reply_comment_content) {
          return;
        }

        this.SET_COMMENT_LOADING({ data: true });

        const post_id = _.get(this.post, "_id");

        const final_reply_comment_data = Object.assign(
          {},
          this.new_reply_comment,
          {
            post: post_id,
            parent: _.get(this.comment, "_id"),
          }
        );

        await this.REPLY_COMMENT({ data: final_reply_comment_data });

        this.updateNewReplyCommentObject({
          variable_path: "content",
          data: "",
        });

        ++this.refresh_comment_reply_editor_key;

        await this.GET_COMMENTS_BY_POST({ post_id });
      } catch (err) {
        console.error(err);
      } finally {
        this.SET_COMMENT_LOADING({ data: false });
        this.SET_IS_OPEN_REPLY_COMMENT({ data: false });
      }
    },
  },
};
</script>

<style scoped>
.button__close {
  top: 4px !important;
  right: 4px !important;
  z-index: 999 !important;
}
</style>
