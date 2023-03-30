<template>
  <v-row v-if="has_posts">
    <v-col
      cols="12"
      v-for="(post, index) in posts"
      :key="index"
      class="card__article"
      :class="index === 0 ? '' : 'mt-5'"
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
              categories: categories_filters,
              tags: tags_filters,
            }).then((posts) => {
              !posts || (posts && posts.length === 0)
                ? $state.complete()
                : $state.loaded();
            });
          }
        "
      >
        <div slot="no-more">{{ $t("No more posts") }}</div>
      </infinite-loading>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <div
        class="text__description text-sm-body-2 text-uppercase text-center grey--text"
      >
        <span class="app-body" v-html="$t('No posts available')"></span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import postMixins from "@/mixins/post";
import BaseArticle from "@/components/article/BaseArticle";
export default {
  name: "BaseArticles",
  mixins: [postMixins],
  components: { BaseArticle },
  computed: {
    ...mapGetters({
      me: "auth/me",
      posts: "post/posts",
    }),

    user_id() {
      return _.get(this.me, "_id");
    },

    has_posts() {
      return !_.isEmpty(this.posts);
    },
  },
};
</script>

<style scoped>
.card__article {
  border-bottom: 1px solid var(--color-article-baseline);
}
</style>
