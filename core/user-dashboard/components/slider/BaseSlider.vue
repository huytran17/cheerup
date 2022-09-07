<template>
  <div class="carousel__wrapper">
    <v-carousel
      v-if="has_posts"
      hide-delimiters
      show-arrows-on-hover
      class="h-100"
    >
      <v-carousel-item
        v-for="(post, i) in posts"
        :key="i"
        :src="post.thumbnail_url"
      >
        <BaseSlideItem :post_data="post" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import BaseSlideItem from "@/components/slider/BaseSlideItem";

export default {
  name: "BaseSlider",
  components: {
    BaseSlideItem,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    has_posts() {
      return !_.isEmpty(this.posts);
    },
  },
};
</script>

<style scoped>
.carousel__wrapper {
  height: 580px;
}
:deep(.v-carousel__item) {
  height: 100% !important;
}
@media only screen and (max-width: 960px) {
  .carousel__wrapper {
    height: 444px;
  }
}
@media only screen and (max-width: 479px) {
  .carousel__wrapper {
    height: 220px;
  }
}
</style>
