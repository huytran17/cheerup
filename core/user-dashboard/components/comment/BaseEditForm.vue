<template>
  <v-bottom-sheet :value="is_open_edit_comment" inset persistent>
    <v-sheet class="px-4 position-relative" height="300px">
      <v-btn
        class="position-absolute button__close"
        icon
        color="black"
        @click="SET_IS_OPEN_EDIT_COMMENT({ data: false })"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex flex-column justify-center pt-10">
        <div class="text-body-2">
          <span class="app-title" v-html="$t('Editing for: ')"></span>
          <span class="app-body" v-html="comment.content"></span>
        </div>
        <div>
          <TiptapEditor
            :key="`edit-comment-editor-${refresh_edit_comment_editor_key}`"
            :content="comment"
            attr="content"
            @on-input="
              updateEditingCommentObject({
                variable_path: 'content',
                data: $event,
              })
            "
          />
        </div>
        <div class="d-flex justify-end pt-4 pb-4">
          <v-btn
            depressed
            color="black"
            tile
            class="white--text"
            @click="updateComment"
          >
            <span class="app-body" v-html="$t('Save')"></span>
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
  name: "BaseEditForm",
  mixins: [systemMixins, commentMixins],
  components: { TiptapEditor },
  data() {
    return {
      refresh_edit_comment_editor_key: 0,
    };
  },
  computed: {
    ...mapGetters({
      post: "post/post",
    }),
  },
  methods: {
    async updateComment() {
      try {
        const new_comment_content = _.get(this.editing_comment, "content", "");
        if (!new_comment_content) {
          return;
        }

        this.SET_COMMENT_LOADING({ data: true });

        const post_id = _.get(this.post, "_id");

        const final_comment_data = Object.assign({}, this.comment, {
          content: new_comment_content,
        });

        await this.UPDATE_COMMENT({ data: final_comment_data });

        this.updateEditingCommentObject({
          variable_path: "content",
          data: "",
        });

        ++this.refresh_edit_comment_editor_key;

        await this.GET_COMMENTS_BY_POST({ post_id });
      } catch (err) {
        console.error(err);
      } finally {
        this.SET_COMMENT_LOADING({ data: false });
        this.SET_IS_OPEN_EDIT_COMMENT({ data: false });
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
