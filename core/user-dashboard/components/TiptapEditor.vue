<template>
  <v-sheet>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :value="content[attr]"
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
  Blockquote,
  HardBreak,
  History,
} from "tiptap-vuetify";

export default {
  name: "BaseEditor",
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
  },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
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
