<template>
  <div>
    <v-menu bottom left origin="right right" transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" class="folder__menu-button">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in folder_menu_items"
          :key="index"
          @click.stop="() => item.action()"
          dense
        >
          <v-list-item-title>
            <v-icon small>{{ item.icon }}</v-icon>
            <span class="text-body-2">
              <span class="app-body" v-html="item.text"></span>
            </span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="d-flex flex-column clickable" @click.stop="openFolder">
      <div class="folder__symbol">
        <v-img
          :src="folder_image"
          contain
          :max-width="is_mobile ? '50' : '70'"
          :max-height="is_mobile ? '50' : '70'"
          :alt="$t('image')"
        ></v-img>
      </div>
      <div class="text-body-2">
        <span class="app-body">{{ data.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "BaseFolderItem",
  mixins: [systemMixins],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      folder_image: require("@/assets/images/app/folder.png"),
      folder_menu_items: [
        {
          text: this.$t("Delete"),
          icon: "mdi-close",
          action: () => this.$emit("open-delete-folder-dialog"),
        },
        {
          text: this.$t("Rename"),
          icon: "mdi-pencil-outline",
          action: () => this.$emit("open-rename-folder-dialog"),
        },
      ],
    };
  },
  methods: {
    openFolder() {
      this.$router.push(this.localePath(`/gallery/${this.data._id}`));
    },
  },
};
</script>

<style scoped>
.folder__menu-button {
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
