<template>
  <div class="position-relative w-100 h-100">
    <div class="position-absolute post__card white pa-4">
      <v-chip class="ma-2" color="pink" label text-color="white">
        <span
          v-if="post_data.category"
          v-html="$t(post_data.category.title)"
        ></span>
      </v-chip>
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
