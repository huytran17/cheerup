<template>
  <div v-if="data.length" class="grid-container grid-container--fill mt-8">
    <div
      v-for="gallery in data"
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
      />
    </div>

    <BaseHardDeleteDialog
      :is_open="is_open_delete_dialog"
      @close-dialog="is_open_delete_dialog = false"
      @confirm-dialog="deleteFolder"
      :title="`folder ${selected_item.name}`"
    />
  </div>

  <div v-else class="text-body-2 text-sm-body-1 text-center">
    <span class="app-body grey--text" v-html="$t('No folders')"></span>
  </div>
</template>

<script>
import galleryMixins from "@/mixins/gallery";
import BaseFolderItem from "@/components/gallery/widget/BaseFolderItem";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
export default {
  name: "BaseGalleryFolders",
  mixins: [galleryMixins],
  components: {
    BaseFolderItem,
    BaseHardDeleteDialog,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      is_open_delete_dialog: false,
      selected_item: {},
    };
  },
  methods: {
    async deleteFolder() {
      try {
        await this.HARD_DELETE_GALLERY({ id: this.selected_item._id });
        this.is_open_delete_dialog = false;
        this.$toast.success("Updated gallery successfully");

        const gallery_id = this.$route.params.id;
        if (gallery_id) {
          return await this.GET_GALLERIES_BY_PARENT({ parent_id: gallery_id });
        }

        await this.GET_GALLERIES_PAGINATED({ is_parent: true });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style></style>
