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
        @infinite="fetchMorePosts"
      >
        <div slot="no-more">{{ $t("No more data") }}</div>
      </infinite-loading>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <BaseNoData message="No data available" />
    </v-col>
  </v-row>
</template>

<script>
import { get, isEmpty, throttle } from "lodash";
import { mapGetters } from "vuex";
import postMixins from "@/mixins/post";
import BaseArticle from "@/components/article/BaseArticle";
import BaseNoData from "@/components/BaseNoData";
export default {
  name: "BaseArticles",
  mixins: [postMixins],
  components: { BaseArticle, BaseNoData },
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),

    user_id() {
      return get(this.me, "_id");
    },

    has_posts() {
      return !isEmpty(this.posts);
    },
  },
  methods: {
    fetchMorePosts(state) {
      const throttled = throttle(
        (state) =>
          this.getMorePosts({
            page: this.post_pagination.current_page + 1,
            query: this.post_search_query,
            categories: this.categories_filters,
            tags: this.tags_filters,
          }).then((posts) => {
            !posts || (posts && posts.length === 0)
              ? state.complete()
              : state.loaded();
          }),
        5000
      );

      throttled(state);
    },
  },
};
</script>

<style lang="scss" scoped>
.card__article {
  border-bottom: toRem(1) solid var(--color-article-baseline);
}
</style>
