<template>
  <v-container class="px-6">
    <v-row>
      <v-col cols="12" md="8">
        <BaseDashboardBanner />
      </v-col>
      <v-col cols="12" md="2">
        <BaseOverallUser />
      </v-col>
      <v-col cols="12" md="2">
        <BaseOverallAdmin />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <BarChart :chartData="user_chart_data" :height="375" />
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12" md="6">
            <BaseOverallSubscription />
          </v-col>
          <v-col cols="12" md="6">
            <BaseOverallPost />
          </v-col>
          <v-col cols="12">
            <BaseOverallSubscription />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row> </v-row>
  </v-container>
</template>

<script>
import chartMixins from "@/mixins/chart";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
import BaseOverallAdmin from "@/components/dashboard/BaseOverallAdmin";
import BaseOverallUser from "@/components/dashboard/BaseOverallUser";
import BaseOverallSubscription from "@/components/dashboard/BaseOverallSubscription";
import BaseOverallPost from "@/components/dashboard/BaseOverallPost";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "BaseDashboardAnalysis",
  mixins: [chartMixins],
  components: {
    BaseDashboardBanner,
    BarChart,
    BaseOverallAdmin,
    BaseOverallUser,
    BaseOverallSubscription,
    BaseOverallPost,
  },
};
</script>

<style></style>
