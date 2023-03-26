<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Gallery')"></span>
        </div>

        <div class="d-flex justify-center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                icon
                @click="is_open_create_gallery_dialog = true"
              >
                <v-icon>mdi-view-grid-plus-outline</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Create a new folder')"></span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex flex-column mt-8">
      <div class="text-body-1 text-sm-h6">
        <span class="app-body" v-html="$t('Folders')"></span>
      </div>
      <BaseGalleryFolders />
    </div>

    <BaseModalCreateGallery
      ref="modalCreateGallery"
      :is_open="is_open_create_gallery_dialog"
      @close-dialog="is_open_create_gallery_dialog = false"
      @confirm-dialog="createFolder"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseModalCreateGallery from "@/components/gallery/widget/BaseModalCreateGallery";
import BaseGalleryFolders from "@/components/gallery/widget/BaseGalleryFolders";
import galleryMixins from "@/mixins/gallery";

export default {
  components: { BaseModalCreateGallery, BaseGalleryFolders },
  mixins: [galleryMixins],
  data() {
    return {
      is_open_create_gallery_dialog: false,
    };
  },
  methods: {
    ...mapActions({
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
    }),

    async createFolder() {
      try {
        await this.CREATE_GALLERY({
          data: {
            name: this.$refs.modalCreateGallery.folder_name,
          },
        });

        this.is_open_create_gallery_dialog = false;
        await this.$fetch();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async fetch() {
    try {
      await Promise.all([
        this.GET_GALLERIES_PAGINATED({ is_parent: true }),
        this.GET_LATEST_SYSTEM_CONFIGURATION(),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.folder__item {
  max-width: 80px;
  max-height: 80px;
  position: relative;
}
.grid-container--fill {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
.grid-container {
  display: grid;
}
:deep(.v-image) {
  margin: 0 !important;
}
</style>
