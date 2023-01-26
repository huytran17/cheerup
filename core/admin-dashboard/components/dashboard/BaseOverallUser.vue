<template>
  <div>
    <div class="d-flex justify-center">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="blue darken-1">mdi-account-supervisor-circle</v-icon>
      </div>
    </div>
    <div class="text-body-1 py-3 primary--text">
      <span class="app-title" v-html="$t('Total User')"></span>
    </div>
    <span class="text-h6">{{ total_user }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
export default {
  name: "BaseOverallUser",
  components: {
    BaseDashboardBanner,
  },
  computed: {
    ...mapGetters({
      user_analys_data: "user/user_analys_data",
    }),

    total_user() {
      return _.get(this.user_analys_data, "total_count", 0);
    },
  },
};
</script>

<style></style>
