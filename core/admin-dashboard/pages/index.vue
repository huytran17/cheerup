<template>
  <BaseDashboardAnalysis />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseDashboardAnalysis from "@/components/dashboard/BaseDashboardAnalysis";
export default {
  name: "AdminDashboard",
  components: {
    BaseDashboardAnalysis,
  },

  computed: {
    ...mapGetters({
      analysis_unit: "analysis_unit",
    }),
  },

  methods: {
    ...mapActions({
      GET_USER_ANALYTICS: "user/GET_USER_ANALYTICS",
      GET_ADMIN_ANALYTICS: "admin/GET_ADMIN_ANALYTICS",
      GET_POST_ANALYTICS: "post/GET_POST_ANALYTICS",
      GET_SUBSCRIPTION_ANALYTICS: "subscription/GET_SUBSCRIPTION_ANALYTICS",
    }),
  },

  async fetch() {
    try {
      await Promise.all([
        this.GET_USER_ANALYTICS({ unit: this.analysis_unit }),
        this.GET_ADMIN_ANALYTICS({ unit: this.analysis_unit }),
        this.GET_POST_ANALYTICS({ unit: this.analysis_unit }),
        this.GET_SUBSCRIPTION_ANALYTICS({ unit: this.analysis_unit }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
