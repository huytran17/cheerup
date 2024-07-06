<template>
  <v-dialog :value="is_open" width="500" persistent>
    <div
      class="d-flex flex-column white soft-box-shadow rounded-lg py-4 px-3 position-relative"
    >
      <v-btn icon class="close-dialog-btn" @click="close">
        <v-icon color="brick">mdi-close</v-icon>
      </v-btn>

      <v-container class="mt-6">
        <v-row>
          <v-col cols="12">
            <v-text-field
              required
              outlined
              color="brick"
              :value="data.name"
              :label="$t('Folder Name')"
              :rules="folderNameRules"
              @input="folder_name = $event"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <div class="d-flex justify-center">
        <v-btn depressed tile flat color="primary" class="mr-2" @click="close">
          {{ $t("Cancel") }}
        </v-btn>
        <v-btn
          depressed
          tile
          flat
          color="brick"
          class="white--text"
          @click="confirm"
        >
          {{ $t("Save") }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import galleryMixins from "@/mixins/gallery";
export default {
  name: "BaseModalUpdateGallery",
  mixins: [galleryMixins],
  props: {
    is_open: {
      type: Boolean,
      default() {
        return false;
      },
    },
    data: {
      type: Object,
      default: () => {},
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
