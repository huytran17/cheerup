<template>
  <div class="d-flex flex-column">
    <div class="d-flex">
      <div></div>
      <div class="d-flex flex-column">
        <div class="d-flex"></div>
        <div></div>
      </div>
    </div>

    <div class="d-flex">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import BubbleChart from "@/components/charts/BubbleChart";
import DoughnutChart from "@/components/charts/DoughnutChart";

export default {
  name: "IndexPage",
  components: {
    BarChart,
    LineChart,
    PieChart,
    PolarAreaChart,
    BubbleChart,
    DoughnutChart,
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
      const [
        user_analys_data,
        admin_analys_data,
        feedback_analys_data,
        post_analys_data,
        subscription_analys_data,
      ] = await Promise.all([
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
