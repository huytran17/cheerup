<template>
  <v-row v-if="data.length" class="item-container">
    <v-col
      v-for="(item, index) in data"
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
          () => {
            is_open_delete_dialog = true;
            SET_GALLERY({ data: item });
          }
        "
      />
    </v-col>

    <BaseHardDeleteDialog
      :is_open="is_open_delete_dialog"
      @close-dialog="is_open_delete_dialog = false"
      @confirm-dialog="deleteGalleryItem"
      :title="`item ${gallery.originalname}`"
    />
  </v-row>

  <div v-else>
    <div class="text-body-2 text-sm-body-1 text-center mt-4">
      <span class="app-body grey--text" v-html="$t('No items')"></span>
    </div>
  </div>
</template>

<script>
import galleryMixins from "@/mixins/gallery";
import BaseGalleryItem from "@/components/gallery/widget/BaseGalleryItem";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
export default {
  name: "BaseGalleryItems",
  mixins: [galleryMixins],
  components: {
    BaseGalleryItem,
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
    };
  },
  methods: {
    async deleteGalleryItem() {
      try {
        const gallery_id = this.gallery._id;

        const payload = {
          _id: gallery_id,
          bucket: _.get(this.gallery, "bucket"),
          key: _.get(this.gallery, "key"),
        };

        await this.DELETE_GALLERY_ITEM({ data: payload });

        this.is_open_delete_item_dialog = false;

        this.$toast.success("Updated gallery successfully");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style></style>
