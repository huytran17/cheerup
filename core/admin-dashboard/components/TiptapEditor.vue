<template>
  <v-sheet>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :value="content && content[attr]"
      :extensions="extensions"
      :placeholder="placeholder"
      :toolbar-attributes="toolbarAttrs"
      :disabled="disabled"
      :card-props="{ flat: true, outlined: true, tile: true }"
      @input="onInput"
    >
    </tiptap-vuetify>
  </v-sheet>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  History,
  Image,
} from "tiptap-vuetify";

export default {
  name: "BaseEditor",
  components: { TiptapVuetify },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    attr: {
      type: String,
      default: "content",
    },
    placeholder: {
      type: String,
      default: "Write something …",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        Bold,
        Code,
        Paragraph,
        HardBreak,
        Image,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3, 4, 5, 6],
            },
          },
        ],
      ],
    };
  },
  computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "black", dark: true }
        : { color: "brick" };
    },
  },
  methods: {
    onInput(data) {
      this.$emit("on-input", data);
    },
  },
};
</script>

<style scoped>
:deep(
    .tiptap-vuetify-editor
      .tiptap-vuetify-editor__toolbar
      .tiptap-vuetify-editor__btn-icon
  ) {
  color: var(--color-white);
}
</style>
