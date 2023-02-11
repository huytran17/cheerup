<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="8">
        <BaseDashboardBanner />
      </v-col>
      <v-col cols="12" sm="6" lg="2">
        <BaseOverallUserCard />
      </v-col>
      <v-col cols="12" sm="6" lg="2">
        <BaseOverallAdminCard />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8">
        <BaseUserOverviewChart
          :options="user_chart.options"
          :series="user_chart.series"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <v-row>
          <v-col cols="12" md="6">
            <BaseOverallSubscriptionCard />
          </v-col>
          <v-col cols="12" md="6">
            <BaseOverallPostCard />
          </v-col>
          <v-col cols="12">
            <BaseUserGrowthChart
              :options="user_growth_chart.options"
              :series="user_growth_chart.series"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <BaseStatisticPost />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import chartMixins from "~/mixins/apex-chart";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
import BaseOverallAdminCard from "@/components/dashboard/BaseOverallAdminCard";
import BaseOverallUserCard from "@/components/dashboard/BaseOverallUserCard";
import BaseOverallSubscriptionCard from "@/components/dashboard/BaseOverallSubscriptionCard";
import BaseOverallPostCard from "@/components/dashboard/BaseOverallPostCard";
import BaseUserGrowthChart from "@/components/dashboard/BaseUserGrowthChart";
import BaseUserOverviewChart from "@/components/dashboard/BaseUserOverviewChart";
import BaseStatisticPost from "@/components/dashboard/BaseStatisticPost";

export default {
  name: "BaseDashboardAnalysis",
  mixins: [chartMixins],
  components: {
    BaseDashboardBanner,
    BaseOverallAdminCard,
    BaseOverallUserCard,
    BaseOverallSubscriptionCard,
    BaseOverallPostCard,
    BaseUserGrowthChart,
    BaseUserOverviewChart,
    BaseStatisticPost,
  },
};
</script>
