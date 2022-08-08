<template>
  <div :style="item_margin">
    <div
      class="text-body-2 primary--text clickable"
      @click="$router.push(localePath(`/category/${item._id}`))"
    >
      <span class="app-body" v-html="$t(category.title)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCategoryChildrenItem",
  props: {
    category: {
      type: Object,
      required: true,
    },
    spacing: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  computed: {
    item_margin() {
      return `margin: ${this.spacing}px`;
    },

    has_children() {
      return _.get(this.category, "children.length", 0);
    },
  },
};
</script>

<style></style>
