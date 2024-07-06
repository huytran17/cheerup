<template>
  <v-bottom-sheet :value="is_open_reply_comment" inset persistent>
    <v-sheet class="px-4 position-relative" height="300px">
      <v-btn
        class="position-absolute button__close"
        icon
        color="black"
        @click="SET_IS_OPEN_REPLY_COMMENT({ data: false })"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex flex-column justify-center pt-10">
        <div class="text-body-2">
          <span class="app-title">{{ $t("Replying to: ") }}</span>
          <span v-html="comment.content"></span>
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
        <div class="d-flex justify-end pt-4 pb-4">
          <v-btn
            depressed
            color="brick"
            tile
            class="white--text"
            :disabled="is_app_loading"
            @click="replyComment"
          >
            {{ $t("Send") }}
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { get } from "lodash";
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
      is_app_loading: "is_app_loading",
    }),
  },
  methods: {
    async replyComment() {
      try {
        if (!this.new_reply_comment?.content) {
          return;
        }

        const post_id = get(this.post, "_id");

        await this.REPLY_COMMENT({
          data: {
            ...this.new_reply_comment,
            post: post_id,
            parent: get(this.comment, "_id"),
          },
        });

        this.updateNewReplyCommentObject({
          variable_path: "content",
          data: "",
        });

        ++this.refresh_comment_reply_editor_key;

        const comment_data_from_list = this.comments?.find(
          (comment) => comment._id === this.comment._id
        );

        await Promise.all([
          this.COUNT_COMMENT_BY_POST({ post_id }),
          this.GET_COMMENT({
            id: this.comment._id,
            is_show_children: comment_data_from_list?.is_shown_children,
          }),
        ]);

        this.replaceCommentData({
          data: this.comment,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.SET_IS_OPEN_REPLY_COMMENT({ data: false });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button__close {
  top: toRem(4) !important;
  right: toRem(4) !important;
  z-index: 999 !important;
}
</style>
