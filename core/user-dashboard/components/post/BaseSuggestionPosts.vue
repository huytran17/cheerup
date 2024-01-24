<template>
  <div>
    <div
      class="text-body-1 text-sm-h6 text-uppercase pb-11 suggestion__header position-relative"
    >
      <span class="app-body" v-html="$t('You may also like')"></span>
    </div>
    <slick-carousel
      :arrows="false"
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
        class="d-flex flex-column post__card rounded pb-2"
        v-for="post in suggestion_posts"
        :key="post._id"
      >
        <div class="d-flex justify-center">
          <v-img
            :src="post.thumbnail_url"
            :lazy-src="post.thumbnail_url"
            cover
            max-width="182px"
            max-height="135px"
            width="182px"
            height="135px"
            class="clickable"
            @click="$router.push(localePath(`/post/${post.slug}`))"
          />
        </div>
        <div
          class="text-uppercase text-body-3 brick--text text-center pt-4 pb-1 px-2"
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
            @click="$router.push(localePath(`/post/${post.slug}`))"
            >{{ post.title }}</span
          >
        </div>
      </div>
    </slick-carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseSuggestionPosts",
  mixins: [systemMixins],
  computed: {
    ...mapGetters({
      suggestion_posts: "post/suggestion_posts",
    }),
  },
};
</script>

<style lang="scss" scoped>
.slick-track {
  display: flex !important;
}
.slick-slide {
  margin: 0 toRem(5) !important;
  width: toRem(182) !important;
}
.v-icon::after {
  background: transparent !important;
}
.suggestion__header::before {
  position: absolute;
  content: "";
  bottom: toRem(32);
  left: 0;
  width: toRem(70);
  height: toRem(2);
  border-bottom: toRem(1) solid var(--color-header-baseline-border);
}
.text--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.slick-list {
  margin: 0 toRem(-5) !important;
  max-height: toRem(250) !important;
}
.post__card {
  border: 1px solid var(--color-article-baseline);
  max-height: toRem(250);
  min-height: toRem(250);
}
</style>
