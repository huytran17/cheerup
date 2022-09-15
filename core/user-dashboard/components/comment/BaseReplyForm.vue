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
            :content="new_comment"
            attr="content"
            @on-input="
              updateNewCommentObject({ variable_path: 'content', data: $event })
            "
          />
        </div>
        <div class="d-flex justify-end pt-4">
          <v-btn depressed color="primary" tile>
            <span class="app-body" v-html="$t('Send')"></span>
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import commentMixins from "@/mixins/comment";
import systemMixins from "@/mixins/system";
import TiptapEditor from "@/components/TiptapEditor";

export default {
  name: "BaseReplyForm",
  mixins: [systemMixins, commentMixins],
  components: { TiptapEditor },
};
</script>

<style scoped>
.button__close {
  top: 4px !important;
  right: 4px !important;
  z-index: 999 !important;
}
</style>
