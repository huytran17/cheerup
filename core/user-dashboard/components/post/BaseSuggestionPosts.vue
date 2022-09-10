<template>
  <v-carousel hide-delimiters cycle>
    <v-carousel-item
      v-for="post in posts_data"
      :key="post._id"
      :src="post.thumbnail_url"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "BaseSuggestionPosts",
  props: {
    posts_data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
