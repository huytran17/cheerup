<template>
  <BarChart />
</template>

<script>
import { mapActions } from "vuex";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "IndexPage",
  components: {
    BarChart,
  },
  data() {
    return {
      loading: true,
    };
  },

  methods: {
    ...mapActions({
      GET_USER_ANALYTICS: "user/GET_USER_ANALYTICS",
      GET_ADMIN_ANALYTICS: "admin/GET_ADMIN_ANALYTICS",
      GET_FEEDBACK_ANALYTICS: "feedback/GET_FEEDBACK_ANALYTICS",
      GET_POST_ANALYTICS: "post/GET_POST_ANALYTICS",
      GET_SUBSCRIPTION_ANALYTICS: "subscription/GET_SUBSCRIPTION_ANALYTICS",
    }),
  },

  async fetch() {
    try {
      this.loading = true;
      await Promise.all([
        this.GET_USER_ANALYTICS(),
        this.GET_ADMIN_ANALYTICS(),
        this.GET_FEEDBACK_ANALYTICS(),
        this.GET_POST_ANALYTICS(),
        this.GET_SUBSCRIPTION_ANALYTICS(),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
