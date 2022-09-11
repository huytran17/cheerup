<template>
  <v-sheet>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :value="content[attr]"
      :extensions="extensions"
      :placeholder="placeholder"
      :toolbar-attributes="toolbarAttrs"
      :disabled="disabled"
      :loading="loading"
      :card-props="{ flat: true, outlined: true, tile: true }"
      @input="onInput"
    >
    </tiptap-vuetify>
  </v-sheet>
</template>

<script>
/**
 * @description Find out more information here https://github.com/iliyaZelenko/tiptap-vuetify
 */
// import the component and the necessary extensions
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
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  name: "BaseCommentEditor",
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  props: {
    content: {
      type: Object,
      required: true,
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // declare extensions you want to use
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
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "black", dark: true }
        : { color: "#ffffff" };
    },
  },
  methods: {
    onInput(data) {
      this.$emit("on-input", data);
    },
  },
};
</script>
