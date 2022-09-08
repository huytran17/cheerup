<template>
  <div class="position-relative w-100 h-100">
    <div class="position-absolute post__card white pa-4">
      <div v-if="has_categories">
        <v-chip
          v-for="(category, index) in post_data.categories"
          :key="index"
          class="ma-2 clickable"
          color="pink"
          label
          text-color="white"
        >
          <span v-html="$t(category.title)"></span>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSlideItem",
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
  width: 120%;
  height: 150%;
  outline: 1px solid var(--color-white);
}
</style>
