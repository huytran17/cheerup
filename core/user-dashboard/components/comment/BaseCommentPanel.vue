<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <div
        class="text-h6 text-uppercase pb-11 comment__header position-relative"
      >
        <span
          class="app-body"
          v-html="
            $tc('{count} Comment', post_data.comments_count, {
              count: post_data.comments_count,
            })
          "
        ></span>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <TiptapEditor
        :content="comment"
        attr="content"
        @on-input="
          updateCommentObject({ variable_path: 'description', data: $event })
        "
      />
    </v-col>
  </v-row>
</template>

<script>
import commentMixins from "@/mixins/comment";
import TiptapEditor from "@/components/TiptapEditor";

export default {
  name: "BaseCommentPanel",
  mixins: [commentMixins],
  components: {
    TiptapEditor,
  },
  props: {
    post_data: {
      type: Object,
      default: () => {},
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
