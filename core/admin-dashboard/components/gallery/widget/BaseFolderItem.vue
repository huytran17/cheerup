<template>
  <div class="item-wrapper">
    <div
      class="d-flex flex-column clickable item-wrapper__item"
      @contextmenu.prevent="$refs.ctxMenu.open"
      @click="openFolder"
    >
      <div class="folder__symbol rounded-lg">
        <v-img
          :src="system_configuration.admin_folder_icon_url"
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

    <context-menu ref="ctxMenu">
      <li
        v-for="(item, index) in options"
        :key="index"
        @click.stop="() => item.action()"
        class="d-flex ctx-menu__item clickable"
      >
        <v-icon small class="mr-2">{{ item.icon }}</v-icon>
        <span class="text-body-2">
          <span class="app-body" v-html="item.text"></span>
        </span>
      </li>
    </context-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
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
      options: [
        {
          text: this.$t("Delete"),
          icon: "mdi-delete-outline",
          action: () => this.$emit("open-delete-folder-dialog"),
        },
        {
          text: this.$t("Rename"),
          icon: "mdi-pencil-outline",
          action: () => this.$emit("open-update-folder-dialog"),
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      system_configuration: "system-configuration/system_configuration",
    }),
  },
  methods: {
    ...mapMutations({
      SET_GALLERY: "gallery/SET_GALLERY",
    }),

    openFolder() {
      this.SET_GALLERY({ data: this.data });
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

.folder__symbol:hover {
  background: rgba(172, 172, 172, 0.5);
}
:deep(#folderContextMenu) {
  top: 100% !important;
  left: 100% !important;
}
:deep(.ctx-menu) {
  padding: 0;
  box-shadow: none;
  border-radius: 0;
  border: 1px solid var(--color-grey);
}
:deep(.ctx-menu__item) {
  padding: 6px 8px;
}
:deep(.ctx-menu__item:hover) {
  background: var(--color-brick);
}
:deep(.ctx-menu__item:hover > *) {
  color: var(--color-white);
}
</style>
