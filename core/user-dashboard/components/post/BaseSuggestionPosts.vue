<template>
  <div>
    <div
      class="text-h6 text-uppercase pb-11 suggestion__header position-relative"
    >
      <span class="app-body" v-html="$t('You may also like')"></span>
    </div>
    <slick
      v-if="posts_data.length"
      :arrows="true"
      :dots="true"
      :slidesToShow="3"
      :touchThreshold="5"
      :infinite="true"
      :focusOnSelect="true"
      :speed="500"
      :slidesToScroll="3"
      :centerMode="true"
      :autoplay="true"
      :autoplaySpeed="2500"
    >
      <div
        class="d-flex flex-column post__card rounded"
        v-for="post in posts_data"
        :key="post._id"
      >
        <v-img :src="post.thumbnail_url" :lazy-src="post.thumbnail_url" cover />
        <div
          class="text-uppercase text--small grey--text text-center pt-4 pb-2 px-2"
        >
          <span class="app-body">{{ formatDate(post.created_at, "LL") }}</span>
          <span>/</span>
          <span v-if="post.author" class="app-body">{{
            post.author.full_name
          }}</span>
        </div>
        <div class="text-body-1 text-center text--ellipsis px-2">
          <span
            class="app-body clickable"
            @click="$router.push(localePath(`/post/${post_data._id}`))"
            >{{ post.title }}</span
          >
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "BaseSuggestionPosts",
  mixins: [systemMixins],
  props: {
    posts_data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
:deep(.slick-slide) {
  margin: 0 5px !important;
}

:deep(.slick-list) {
  margin: 0 -5px !important;
  max-height: 245px !important;
}
.suggestion__header::before {
  position: absolute;
  content: "";
  bottom: 32px;
  left: 0;
  width: 70px;
  height: 2px;
  border-bottom: 1px solid var(--color-header-baseline-border);
}
.text--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.post__card {
  border: 1px solid var(--color-article-baseline);
  max-height: 239.75px;
  min-height: 239.75px;
}
</style>
