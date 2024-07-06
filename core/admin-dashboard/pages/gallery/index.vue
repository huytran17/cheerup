<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Gallery") }}</h3>
        </div>

        <div class="toolbar">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                height="auto"
                class="px-2"
                outlined
                tile
                @click="is_open_create_gallery_dialog = true"
              >
                <v-icon small>mdi-plus</v-icon>
                <span>{{ $t("Add") }}</span>
              </v-btn>
            </template>
            {{ $t("Create a new folder") }}
          </v-tooltip>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex flex-column mt-8">
      <div class="text-body-1 text-sm-h6">
        <span>{{ $t("Folders") }}</span>
      </div>
      <BaseGalleryFolders :search="search" />
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
  head() {
    return {
      title: this.$t("Galleries"),
    };
  },
  data() {
    return {
      is_open_create_gallery_dialog: false,
      search: "",
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

<style scoped lang="scss">
.grid-container--fill {
  grid-template-columns: repeat(auto-fill, minmax(toRem(100), 1fr));
}
.grid-container {
  display: grid;
}
:deep(.v-image) {
  margin: 0;
}
</style>
