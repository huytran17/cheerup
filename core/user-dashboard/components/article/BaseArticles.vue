<template>
  <v-row v-if="has_posts">
    <v-col
      cols="12"
      v-for="(post, index) in posts_data"
      :key="index"
      class="mt-15 card__article"
    >
      <BaseArticle :post_data="post" />
    </v-col>

    <v-col cols="12">
      <infinite-loading
        v-if="!!post_pagination.to"
        identifier="posts"
        spinner="spiral"
        @infinite="
          ($state) => {
            getMorePosts({
              page: post_pagination.current_page + 1,
              query: post_search_query,
            }).then((posts) => {
              if (!posts || (posts && posts.length === 0)) {
                $state.complete();
              } else {
                $state.loaded();
              }
            });
          }
        "
      >
        <div slot="no-more">{{ $t("No more posts") }}</div>
      </infinite-loading>
    </v-col>
  </v-row>
</template>

<script>
import postMixins from "@/mixins/post";
import BaseArticle from "@/components/article/BaseArticle";
export default {
  name: "BaseArticles",
  mixins: [postMixins],
  components: { BaseArticle },
  props: {
    posts_data: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    has_posts() {
      return !_.isEmpty(this.posts_data);
    },
  },
};
</script>

<style scoped>
.card__article {
  border-bottom: 1px solid var(--color-article-baseline);
}
</style>
