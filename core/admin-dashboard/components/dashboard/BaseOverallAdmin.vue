<template>
  <div>
    <div class="d-flex justify-center">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="pink darken-1">mdi-account-heart-outline</v-icon>
      </div>
    </div>
    <div class="text-body-1 py-3 primary--text">
      <span class="app-title" v-html="$t('Total Admin')"></span>
    </div>
    <span class="text-h6">{{ total_admin }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
export default {
  name: "BaseOverallAdmin",
  components: {
    BaseDashboardBanner,
  },
  computed: {
    ...mapGetters({
      admin_analys_data: "admin/admin_analys_data",
    }),

    total_admin() {
      return _.get(this.admin_analys_data, "total_count", 0);
    },
  },
};
</script>

<style></style>
