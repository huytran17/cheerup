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

    <v-row>
      <v-col cols="12">
        <v-dropzone
          ref="upload_item_dropzone"
          id="thumbnail"
          :options="
            getDropzoneOptions({
              upload_url: gallery_upload_item_url,
            })
          "
          :destroyDropzone="true"
          @vdropzone-success="
            (file, response) => onUploadItemSuccsess({ file, response })
          "
        ></v-dropzone>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-btn text @click="$router.go(-1)">
          <v-icon>mdi-arrow-left-thin</v-icon>
          <span v-html="$t('Back')"></span>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end">
        <v-btn text @click="$router.go(1)">
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
        <div class="grid-container grid-container--fill mt-8">
          <div
            v-for="gallery in galleries"
            :key="gallery._id"
            class="folder__item position-relative mx-auto mt-4"
          >
            <BaseFolderItem :data="gallery" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column">
        <div class="text-body-1 text-sm-h6">
          <span class="app-body" v-html="$t('Items')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row class="item-container">
      <v-col
        v-for="(item, index) in gallery_items"
        :key="index"
        class="image-item"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <BaseGalleryItem
          :data="item"
          @open-delete-item-dialog="
            (data) => {
              is_open_delete_item_dialog = true;
              selected_item = data;
            }
          "
        />
      </v-col>
    </v-row>

    <BaseModalCreateGallery
      ref="modalCreateGallery"
      :is_open="is_open_create_gallery_dialog"
      @close-dialog="is_open_create_gallery_dialog = false"
      @confirm-dialog="createGallery"
    />

    <BaseHardDeleteDialog
      :is_open="is_open_delete_item_dialog"
      @close-dialog="is_open_delete_item_dialog = false"
      @confirm-dialog="deleteGalleryItem"
      :title="`item ${selected_item.originalname}`"
    />
  </v-container>
</template>

<script>
import BaseFolderItem from "@/components/gallery/widget/BaseFolderItem";
import BaseGalleryItem from "@/components/gallery/widget/BaseGalleryItem";
import dropzoneMixins from "@/mixins/dropzone";
import { S3_UPLOAD_URL_TYPES } from "@/constants";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
import BaseModalCreateGallery from "@/components/gallery/widget/BaseModalCreateGallery";
import galleryMixins from "@/mixins/gallery";
export default {
  components: {
    BaseModalCreateGallery,
    BaseHardDeleteDialog,
    BaseFolderItem,
    BaseGalleryItem,
  },
  mixins: [galleryMixins, dropzoneMixins],
  data() {
    return {
      is_open_create_gallery_dialog: false,
      is_open_delete_item_dialog: false,
      folder_image: require("@/assets/images/app/folder.png"),
      selected_item: {},
    };
  },
  computed: {
    gallery_items() {
      return _.get(this.gallery, "items", []);
    },

    gallery_upload_item_url() {
      const gallery_id = this.$route.params.id;
      return `${S3_UPLOAD_URL_TYPES.GALLERY_ITEM}/${gallery_id}`;
    },
  },
  methods: {
    async deleteGalleryItem() {
      try {
        const gallery_id = this.$route.params.id;

        const payload = {
          _id: gallery_id,
          bucket: _.get(this.selected_item, "bucket"),
          key: _.get(this.selected_item, "key"),
        };

        await this.DELETE_GALLERY_ITEM({ data: payload });

        await this.GET_GALLERY({ _id: gallery_id });
        this.is_open_delete_item_dialog = false;

        this.$toast.success("Updated gallery successfully");
      } catch (err) {
        console.error(err);
      }
    },
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
      } catch (err) {
        console.error(err);
      }
    },

    async onUploadItemSuccsess({ file, response }) {
      this.$refs.upload_item_dropzone.removeFile(file);

      const gallery_id = this.$route.params.id;

      await this.GET_GALLERY({ _id: gallery_id });
      this.$toast.success("Uploaded successfully");
    },
  },
  async fetch() {
    try {
      const gallery_id = this.$route.params.id;
      await Promise.all([
        this.GET_GALLERIES_BY_PARENT({ parent_id: gallery_id }),
        this.GET_GALLERY({ _id: gallery_id }),
      ]);
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