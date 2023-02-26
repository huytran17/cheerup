<template>
  <BaseStatisticCard>
    <v-row class="pa-3">
      <v-col cols="12" lg="4" class="pa-0">
        <BaseCategoryAnalysisChart
          :options="category_chart.options"
          :series="category_chart.series"
        />
      </v-col>
      <v-col cols="12" lg="8"></v-col>
    </v-row>
  </BaseStatisticCard>
</template>

<script>
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
    ...mapGetters({}),
  },
};
</script>
