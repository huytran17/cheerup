<template>
  <div>
    <div class="d-flex justify-center">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="purple darken-1">mdi-account-switch</v-icon>
      </div>
    </div>
    <div class="text-body-1 py-3 primary--text">
      <span class="app-title" v-html="$t('Total Subscription')"></span>
    </div>
    <span class="text-h6">{{ total_subscription }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
export default {
  name: "BaseOverallSubscription",
  components: {
    BaseDashboardBanner,
  },
  computed: {
    ...mapGetters({
      subscription_analys_data: "subscription/subscription_analys_data",
    }),

    total_subscription() {
      return _.get(this.subscription_analys_data, "total_count", 0);
    },
  },
};
</script>

<style></style>
