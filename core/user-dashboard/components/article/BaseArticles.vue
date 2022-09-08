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
  </v-row>
</template>

<script>
import BaseArticle from "@/components/article/BaseArticle";
export default {
  name: "BaseArticles",
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
