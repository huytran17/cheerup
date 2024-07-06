<template>
  <BaseStatisticCard>
    <v-row class="pa-3">
      <v-col cols="12">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title">{{ $t("Category Statistics") }}</span>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        class="pa-0 d-flex flex-column justify-center chart-wrapper"
      >
        <BaseCategoryAnalysisChart
          :options="category_chart.options"
          :series="category_chart.series"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-row>
          <v-col
            v-for="category in most_popular_categories"
            :key="category._id"
            cols="12"
            md="6"
            class="pa-1"
          >
            <div
              class="d-flex category-item pa-2 rounded-lg clickable"
              @click="$router.push(localePath(`/category/${category._id}`))"
            >
              <div class="d-flex flex-column justify-center">
                <div
                  class="blue lighten-4 w-fit-content h-fit-content pa-1 rounded-lg"
                >
                  <v-icon color="brick">mdi-shape-outline</v-icon>
                </div>
              </div>
              <div class="d-flex flex-column ml-3">
                <div class="text-body-2 primary--text">
                  <span class="app-title">{{ category.title }}</span>
                </div>
                <div class="d-flex">
                  <v-icon small :color="category.badge_color"
                    >mdi-circle</v-icon
                  >
                </div>
              </div>
              <div
                class="text-body-2 ml-auto text-decoration-underline"
                @click.stop="goToCategoryView({ id: category._id })"
              >
                <span>{{
                  $tc(`{count} post`, category.total_post_related_count, {
                    count: category.total_post_related_count,
                  })
                }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </BaseStatisticCard>
</template>

<script>
import { get } from "lodash";
import { mapGetters } from "vuex";
import chartMixins from "~/mixins/apex-chart";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";
import BaseCategoryAnalysisChart from "@/components/dashboard/BaseCategoryAnalysisChart";
export default {
  name: "BaseStatisticCategory",
  mixins: [chartMixins],
  components: {
    BaseStatisticCard,
    BaseCategoryAnalysisChart,
  },
  computed: {
    ...mapGetters({
      category_analys_data: "category/category_analys_data",
    }),

    most_popular_categories() {
      return get(this.category_analys_data, "most_popular_categories", []);
    },
  },
  methods: {
    goToCategoryView({ id }) {
      const url = new URL(`${process.env.USER_DASHBOARD_URL}/category/${id}`);
      window.open(url, "__blank");
    },
  },
};
</script>

<style scoped>
.category-item {
  transition: all 0.2s linear;
  background-color: var(--color-category-item-bg);
}
.category-item:hover {
  background-color: var(--color-category-item-hover-bg);
}
.chart-wrapper div:first-child {
  display: flex;
  justify-content: center;
}
</style>
