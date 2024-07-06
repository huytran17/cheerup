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
          <span class="app-title">{{ $t("Editing for: ") }}</span>
          <span v-html="comment.content"></span>
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
            color="brick"
            tile
            class="white--text"
            :disabled="is_app_loading"
            @click="updateComment"
          >
            {{ $t("Save") }}
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
      is_app_loading: "is_app_loading",
    }),
  },
  methods: {
    async updateComment() {
      try {
        const new_comment_content = get(this.editing_comment, "content", "");
        if (!new_comment_content) {
          return;
        }

        const final_comment_data = {
          ...this.comment,
          content: new_comment_content,
        };

        await this.UPDATE_COMMENT({ data: final_comment_data });

        this.updateEditingCommentObject({
          variable_path: "content",
          data: "",
        });

        await this.GET_COMMENT({ id: this.comment._id });
        this.replaceCommentData({ data: this.comment });

        ++this.refresh_edit_comment_editor_key;
      } catch (error) {
        console.error(error);
      } finally {
        this.SET_IS_OPEN_EDIT_COMMENT({ data: false });
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
