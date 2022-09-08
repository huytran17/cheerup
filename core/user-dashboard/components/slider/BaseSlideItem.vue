<template>
  <div class="position-relative w-100 h-100">
    <div class="position-absolute post__card white py-4 px-6">
      <div v-if="has_categories" class="d-flex justify-center">
        <v-chip
          v-for="(category, index) in post_data.categories"
          :key="index"
          class="ma-1 clickable"
          :color="category.badge_color"
          label
          text-color="white"
          small
          @click="$router.push(localePath(`/category/${category._id}`))"
        >
          <span v-html="$t(category.title)"></span>
        </v-chip>
      </div>

      <div class="text-h6 text-sm-h5 text-uppercase text-center py-4">
        <span
          class="app-body post__title position-relative clickable"
          v-html="$t(post_data.title)"
        ></span>
      </div>

      <div class="text-uppercase small--text grey--text text-center">
        <span class="app-body">{{
          formatDate(post_data.created_at, "LL")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "BaseSlideItem",
  mixins: [systemMixins],
  props: {
    post_data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    has_categories() {
      return !_.isEmpty(this.post_data.categories);
    },
  },
};
</script>

<style scoped>
.post__card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.post__card::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 30px);
  height: calc(100% + 30px);
  outline: 1px solid var(--color-white);
}
:deep(.v-chip--label) {
  border-radius: 0 !important;
}
.post__title:hover {
  color: var(--color-title-hover);
}
.post__title {
  z-index: 9999;
}
</style>
