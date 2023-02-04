<template>
  <BaseDashboardAnalysis />
</template>

<script>
import { mapActions } from "vuex";
import BaseDashboardAnalysis from "@/components/dashboard/BaseDashboardAnalysis";
export default {
  name: "AdminDashboard",
  components: {
    BaseDashboardAnalysis,
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
        this.GET_USER_ANALYTICS(),
        this.GET_ADMIN_ANALYTICS(),
        this.GET_POST_ANALYTICS(),
        this.GET_SUBSCRIPTION_ANALYTICS(),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
