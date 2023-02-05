<template>
  <v-container fluid class="mt-4">
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
        <v-row>
          <v-col cols="12" lg="8">
            <div class="card-box-shadow rounded-lg white pa-4">
              <apex-chart
                :height="315"
                :options="user_chart.options"
                :series="user_chart.series"
              />
            </div>
          </v-col>
        </v-row>
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
            <BaseOverallSubscriptionCard />
          </v-col>
        </v-row>
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

export default {
  name: "BaseDashboardAnalysis",
  mixins: [chartMixins],
  components: {
    BaseDashboardBanner,
    BaseOverallAdminCard,
    BaseOverallUserCard,
    BaseOverallSubscriptionCard,
    BaseOverallPostCard,
  },
};
</script>

<style scoped></style>
