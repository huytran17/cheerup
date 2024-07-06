<template>
  <BaseStatisticCard>
    <v-row>
      <v-col cols="12">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title">{{ $t("Post Statistics") }}</span>
        </div>
      </v-col>
      <v-col cols="12">
        <BasePostAnalysisChart
          :options="post_chart.options"
          :series="post_chart.series"
        />
      </v-col>
    </v-row>
  </BaseStatisticCard>
</template>

<script>
import chartMixins from "~/mixins/apex-chart";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";
import BasePostAnalysisChart from "@/components/dashboard/BasePostAnalysisChart";
export default {
  name: "BaseStatisticAdmin",
  mixins: [chartMixins],
  components: {
    BaseStatisticCard,
    BasePostAnalysisChart,
  },
};
</script>
