<template>
  <v-hover v-slot="{ hover }">
    <v-img :src="data.path" contain class="position-relative">
      <template v-slot:default>
        <div
          class="position-absolute image__feat pr-2 pt-2"
          :class="{ 'image__feat--hover': hover }"
        >
          <v-btn small icon class="white" @click="copyImageUrl(data)">
            <v-icon small>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            class="white"
            @click="$emit('open-delete-item-dialog')"
          >
            <v-icon small>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-img>
  </v-hover>
</template>

<script>
export default {
  name: "BaseGalleryItem",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    copyImageUrl(item) {
      navigator.clipboard.writeText(item.path);
      this.$toast.success(this.$t("Copied to clipboard"));
    },
  },
};
</script>

<style scoped>
.image__feat {
  top: 0;
  right: 0;
  display: none;
}
.image__feat--hover {
  display: block !important;
}
</style>
