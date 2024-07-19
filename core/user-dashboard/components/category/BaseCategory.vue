<template>
  <v-row v-if="categories.length">
    <v-col
      v-for="category in categories"
      :key="category._id"
      cols="12"
      class="d-flex"
    >
      <BaseCategoryItem :data="category" />
    </v-col>

    <v-col cols="12">
      <infinite-loading
        v-if="category_pagination.has_more"
        identifier="categories"
        spinner="spiral"
        @infinite="fetchMoreCategories"
      >
        <div slot="no-more">{{ $t("No more categories") }}</div>
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
import categoryMixins from "@/mixins/category";
import BaseCategoryItem from "@/components/category/BaseCategoryItem";
import BaseNoData from "@/components/BaseNoData";
import { throttle } from "lodash";

export default {
  name: "BaseCategory",
  mixins: [categoryMixins],
  components: { BaseCategoryItem, BaseNoData },
  async fetch() {
    try {
      await this.GET_OUTSTANDING_CATEGORIES_PAGINATED();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    fetchMoreCategories(state) {
      const throttled = throttle(
        (state) =>
          this.getMoreCategories({
            page: this.category_pagination.current_page + 1,
            query: this.post_search_query,
            categories: this.categories_filters,
          }).then((categories) => {
            !categories || (categories && categories.length === 0)
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

<style scoped>
.card {
  max-width: inherit;
}
</style>
