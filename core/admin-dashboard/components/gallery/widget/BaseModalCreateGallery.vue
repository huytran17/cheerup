<template>
  <v-dialog :value="is_open" width="500" persistent>
    <div
      class="d-flex flex-column white soft-box-shadow rounded-lg py-4 px-3 position-relative"
    >
      <v-btn icon class="close-dialog-btn" @click="close">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>

      <v-container class="mt-2">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="folder_name"
              :label="$t('Folder Name')"
              required
              :rules="folderNameRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <div class="d-flex justify-center mt-2">
        <v-btn depressed color="primary" text @click="close">
          <span v-html="$t('Cancel')"></span>
        </v-btn>
        <v-btn depressed color="error" text @click="confirm">
          <span v-html="$t('Create')"></span>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import galleryMixins from "@/mixins/gallery";
export default {
  name: "BaseModalCreateGallery",
  mixins: [galleryMixins],
  props: {
    is_open: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      folder_name: "",
    };
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },

    confirm() {
      this.$emit("confirm-dialog");
    },
  },
};
</script>
