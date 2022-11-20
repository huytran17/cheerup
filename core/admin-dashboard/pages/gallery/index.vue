<template>
  <v-container>
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

    <div class="d-flex flex-column">
      <div class="text-body-1 text-sm-h6">
        <span class="app-body" v-html="$t('Folders')"></span>
      </div>
      <div class="grid-container grid-container--fill mt-8">
        <div
          v-for="gallery in galleries"
          :key="gallery._id"
          class="folder__item position-relative mx-auto mt-4"
        >
          <BaseFolderItem :data="gallery" />
        </div>
      </div>
    </div>

    <BaseModalCreateGallery
      ref="modalCreateGallery"
      :is_open="is_open_create_gallery_dialog"
      @close-dialog="is_open_create_gallery_dialog = false"
      @confirm-dialog="createFolder"
    />
  </v-container>
</template>

<script>
import BaseModalCreateGallery from "@/components/gallery/widget/BaseModalCreateGallery";
import BaseFolderItem from "@/components/gallery/widget/BaseFolderItem";
import galleryMixins from "@/mixins/gallery";
export default {
  components: { BaseModalCreateGallery, BaseFolderItem },
  mixins: [galleryMixins],
  data() {
    return {
      is_open_create_gallery_dialog: false,
    };
  },
  methods: {
    async createFolder() {
      try {
        await this.CREATE_GALLERY({
          data: {
            name: this.$refs.modalCreateGallery.folder_name,
          },
        });

        this.is_open_create_gallery_dialog = false;
        await this.$fetch();
      } catch (err) {
        console.error(err);
      }
    },
  },
  async fetch() {
    try {
      await this.GET_GALLERIES_PAGINATED({ is_parent: true });
    } catch (err) {
      console.error(err);
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
