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
        v-if="!!category_pagination.to"
        identifier="categories"
        spinner="spiral"
        @infinite="
          ($state) => {
            getMoreCategories({
              page: category_pagination.current_page + 1,
              query: post_search_query,
              categories: categories_filters,
            }).then((categories) => {
              !categories || (categories && categories.length === 0)
                ? $state.complete()
                : $state.loaded();
            });
          }
        "
      >
        <div slot="no-more">{{ $t("No more categories") }}</div>
      </infinite-loading>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <div
        class="text__description text-sm-body-2 text-uppercase text-center grey--text"
      >
        <span class="app-body" v-html="$t('No data available')"></span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import categoryMixins from "@/mixins/category";
import BaseCategoryItem from "@/components/category/BaseCategoryItem";

export default {
  name: "BaseCategory",
  mixins: [categoryMixins],
  components: { BaseCategoryItem },
  async fetch() {
    try {
      await this.GET_OUTSTANDING_CATEGORIES_PAGINATED();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.card {
  max-width: inherit;
}
</style>
