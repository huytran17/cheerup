<template>
  <div v-if="galleries.length" class="grid-container grid-container--fill">
    <div
      v-for="gallery in galleries"
      :key="gallery._id"
      class="folder__item position-relative mx-auto mt-4"
    >
      <BaseFolderItem
        :data="gallery"
        @open-delete-folder-dialog="
          () => {
            is_open_delete_dialog = true;
            selected_item = gallery;
          }
        "
        @open-update-folder-dialog="
          () => {
            is_open_update_dialog = true;
            selected_item = gallery;
          }
        "
      />
    </div>

    <BaseHardDeleteDialog
      :is_open="is_open_delete_dialog"
      @close-dialog="is_open_delete_dialog = false"
      @confirm-dialog="deleteFolder"
      :title="`folder ${selected_item.name}`"
    />

    <BaseModalUpdateGallery
      ref="modalUpdateGallery"
      :data="selected_item"
      :is_open="is_open_update_dialog"
      @close-dialog="is_open_update_dialog = false"
      @confirm-dialog="updateFolder"
    />
  </div>

  <div v-else class="text-body-2 text-sm-body-1 text-center mt-4">
    <span class="grey--text">{{ $t("No folders") }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import galleryMixins from "@/mixins/gallery";
import BaseFolderItem from "@/components/gallery/widget/BaseFolderItem";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
import BaseModalUpdateGallery from "@/components/gallery/widget/BaseModalUpdateGallery";

export default {
  name: "BaseGalleryFolders",
  mixins: [galleryMixins],
  components: {
    BaseFolderItem,
    BaseHardDeleteDialog,
    BaseModalUpdateGallery,
  },
  data() {
    return {
      is_open_delete_dialog: false,
      is_open_update_dialog: false,
      selected_item: {},
    };
  },
  computed: {
    ...mapGetters({
      galleries: "gallery/galleries",
    }),
  },
  methods: {
    async deleteFolder() {
      try {
        const gallery_id = this.selected_item._id;

        await this.HARD_DELETE_GALLERY({ id: gallery_id });
        this.is_open_delete_dialog = false;
        this.$toast.success(this.$t("Updated gallery successfully"));

        if (gallery_id) {
          return await this.GET_GALLERIES_BY_PARENT({ parent_id: gallery_id });
        }

        await this.GET_GALLERIES_PAGINATED({ is_parent: true });
      } catch (error) {
        console.error(error);
      }
    },

    async updateFolder() {
      try {
        await this.UPDATE_GALLERY({
          data: {
            ...this.selected_item,
            name: this.$refs.modalUpdateGallery.folder_name,
          },
        });

        this.is_open_update_dialog = false;

        const gallery_id = this.$route.params.id;
        if (!gallery_id) {
          return await this.GET_GALLERIES_PAGINATED({ is_parent: true });
        }

        await Promise.all([
          this.GET_GALLERIES_BY_PARENT({ parent_id: gallery_id }),
          this.GET_GALLERY({ _id: gallery_id }),
        ]);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.folder__item {
  max-width: toRem(80);
  max-height: toRem(80);
}
</style>
