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

    <v-row>
      <v-col cols="12">
        <v-dropzone
          ref="upload_item_dropzone"
          id="thumbnail"
          :options="uploadGalleryItemOptions({ id: gallery._id })"
          :destroyDropzone="true"
          @vdropzone-success="
            (file, response) => onUploadItemSuccsess({ file, response })
          "
        ></v-dropzone>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-btn text @click="$router.go(-1)" outlined>
          <v-icon>mdi-arrow-left-thin</v-icon>
          <span v-html="$t('Back')"></span>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end">
        <v-btn text @click="$router.go(1)" outlined>
          <span v-html="$t('Next')"></span>
          <v-icon>mdi-arrow-right-thin</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex flex-column">
        <div class="text-body-1 text-sm-h6">
          <span class="app-body" v-html="$t('Folders')"></span>
        </div>
      </v-col>
    </v-row>
    <BaseGalleryFolders />

    <v-row class="mt-4">
      <v-col cols="12" class="d-flex flex-column">
        <div class="text-body-1 text-sm-h6">
          <span class="app-body" v-html="$t('Items')"></span>
        </div>
      </v-col>
    </v-row>
    <BaseGalleryItems :data="gallery_items" />

    <BaseModalCreateGallery
      ref="modalCreateGallery"
      :is_open="is_open_create_gallery_dialog"
      @close-dialog="is_open_create_gallery_dialog = false"
      @confirm-dialog="createGallery"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import { mapActions } from "vuex";
import BaseGalleryFolders from "@/components/gallery/widget/BaseGalleryFolders";
import BaseGalleryItems from "@/components/gallery/widget/BaseGalleryItems";
import dropzoneMixins from "@/mixins/dropzone";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
import BaseModalCreateGallery from "@/components/gallery/widget/BaseModalCreateGallery";
import galleryMixins from "@/mixins/gallery";

export default {
  components: {
    BaseModalCreateGallery,
    BaseHardDeleteDialog,
    BaseGalleryFolders,
    BaseGalleryItems,
  },
  mixins: [galleryMixins, dropzoneMixins],
  head() {
    return {
      title: this.$t("Update gallery"),
    };
  },
  data() {
    return {
      is_open_create_gallery_dialog: false,
    };
  },
  computed: {
    gallery_items() {
      return get(this.gallery, "items", []);
    },
  },
  methods: {
    ...mapActions({
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
    }),

    async createGallery() {
      try {
        const parent_id = this.$route.params.id;

        await this.CREATE_GALLERY({
          data: {
            name: this.$refs.modalCreateGallery.folder_name,
            parent: parent_id,
          },
        });

        this.is_open_create_gallery_dialog = false;
        await this.$fetch();
      } catch (error) {
        console.error(error);
      }
    },

    async onUploadItemSuccsess({ file, response }) {
      this.$refs.upload_item_dropzone.removeFile(file);

      const gallery_id = this.$route.params.id;

      await this.GET_GALLERY({ _id: gallery_id });
      this.$toast.success(this.$t("Uploaded successfully"));
    },
  },
  async fetch() {
    try {
      const gallery_id = this.$route.params.id;

      await Promise.all([
        this.GET_GALLERIES_BY_PARENT({ parent_id: gallery_id }),
        this.GET_GALLERY({ _id: gallery_id }),
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
