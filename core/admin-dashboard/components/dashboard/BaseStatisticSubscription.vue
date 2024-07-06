<template>
  <BaseStatisticCard>
    <v-row>
      <v-col cols="12">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title">{{ $t("Subscription Statistics") }}</span>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <BaseCategoryAnalysisChart
          :options="subscription_chart.options"
          :series="subscription_chart.series"
        />
      </v-col>
    </v-row>
  </BaseStatisticCard>
</template>

<script>
import chartMixins from "~/mixins/apex-chart";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";
import BaseCategoryAnalysisChart from "@/components/dashboard/BaseCategoryAnalysisChart";
export default {
  name: "BaseStatisticSubscription",
  mixins: [chartMixins],
  components: {
    BaseStatisticCard,
    BaseCategoryAnalysisChart,
  },
};
</script>
