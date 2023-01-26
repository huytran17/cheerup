<template>
  <v-container v-if="!loading" class="px-6">
    <v-row class="my-4">
      <v-col cols="12" class="rounded-lg soft-box-shadow">
        <BaseDashboardBanner :admin_data="me" />
      </v-col>
    </v-row>
    <v-row class="my-4">
      <v-col cols="12" md="8" class="d-flex flex-column rounded-lg">
        <div class="text-body-1 pb-4 primary--text">
          <v-icon color="primary" class="mb-1"
            >mdi-account-group-outline</v-icon
          >
          <span class="app-title" v-html="$t('User Analytics')"></span>
        </div>
        <BarChart :chartData="user_chart_data" />
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12" class="d-flex flex-column rounded-lg">
            <div class="text-body-1 pb-4 primary--text">
              <v-icon color="primary" class="mb-1"
                >mdi-shield-crown-outline</v-icon
              >
              <span class="app-title" v-html="$t('Admin Analytics')"></span>
            </div>
            <LineChart :chartData="admin_chart_data" />
          </v-col>
          <v-col cols="12" class="d-flex flex-column rounded-lg">
            <div class="text-body-1 pb-4 primary--text">
              <v-icon color="primary" class="mb-1"
                >mdi-book-open-page-variant-outline</v-icon
              >
              <span class="app-title" v-html="$t('Post Analytics')"></span>
            </div>
            <LineChart :chartData="post_chart_data" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="my-4">
      <v-col cols="12" md="6" class="d-flex flex-column rounded-lg">
        <div class="text-body-1 pb-4 primary--text">
          <v-icon color="primary" class="mb-1">mdi-email-fast-outline</v-icon>
          <span class="app-title" v-html="$t('Subscription Analytics')"></span>
        </div>
        <RadarChart :chartData="subscription_chart_data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import BubbleChart from "@/components/charts/BubbleChart";
import RadarChart from "@/components/charts/RadarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";

export default {
  name: "IndexPage",
  components: {
    BarChart,
    LineChart,
    PieChart,
    PolarAreaChart,
    BubbleChart,
    DoughnutChart,
    RadarChart,
    BaseDashboardBanner,
  },

  computed: {
    ...mapGetters({
      me: "auth/me",
      user_analys_data: "user/user_analys_data",
      admin_analys_data: "admin/admin_analys_data",
      post_analys_data: "post/post_analys_data",
      subscription_analys_data: "subscription/subscription_analys_data",
    }),

    admin_chart_data() {
      return {
        labels: _.get(this.admin_analys_data, "formatted_dates", []),
        datasets: [
          {
            label: "Created",
            border: false,
            backgroundColor: "rgba(0, 255, 46, 1)",
            data: _.get(this.admin_analys_data, "total_created_counts", []),
          },
          {
            label: "Deleted",
            backgroundColor: "rgba(232, 60, 60, 1)",
            data: _.get(this.admin_analys_data, "total_deleted_counts", []),
          },
          {
            label: "Super Admin",
            backgroundColor: "rgba(57, 137, 216,1)",
            data: _.get(this.admin_analys_data, "total_super_admin_counts", []),
          },
          {
            label: "Normal Admin",
            backgroundColor: "rgba(0, 255, 246, 1)",
            data: _.get(
              this.admin_analys_data,
              "total_normal_admin_counts",
              []
            ),
          },
          {
            label: "Verified Email",
            backgroundColor: "rgba(250, 0, 255, 1)",
            data: _.get(
              this.admin_analys_data,
              "total_verified_email_counts",
              []
            ),
          },
        ],
      };
    },

    user_chart_data() {
      return {
        labels: _.get(this.user_analys_data, "formatted_dates", []),
        datasets: [
          {
            label: "Created",
            backgroundColor: "rgba(0, 255, 46, 1)",
            data: _.get(this.user_analys_data, "total_created_counts", []),
          },
          {
            label: "Deleted",
            backgroundColor: "rgba(232, 60, 60, 1)",
            data: _.get(this.user_analys_data, "total_deleted_counts", []),
          },
          {
            label: "Blocked Commenting",
            backgroundColor: "rgba(255, 229, 0, 1)",
            data: _.get(
              this.user_analys_data,
              "total_blocked_comment_counts",
              []
            ),
          },
          {
            label: "Verified Email",
            backgroundColor: "rgba(250, 0, 255, 1)",
            data: _.get(
              this.user_analys_data,
              "total_verified_email_counts",
              []
            ),
          },
        ],
      };
    },

    post_chart_data() {
      return {
        labels: _.get(this.user_analys_data, "formatted_dates", []),
        datasets: [
          {
            label: "Created",
            backgroundColor: "rgba(0, 255, 46, 1)",
            data: _.get(this.post_analys_data, "total_created_counts", []),
          },
          {
            label: "Deleted",
            backgroundColor: "rgba(232, 60, 60, 1)",
            data: _.get(this.post_analys_data, "total_deleted_counts", []),
          },
          {
            label: "Blocked Commenting",
            backgroundColor: "rgba(255, 229, 0, 1)",
            data: _.get(
              this.post_analys_data,
              "total_blocked_comment_counts",
              []
            ),
          },
          {
            label: "Published",
            backgroundColor: "rgba(250, 0, 255, 1)",
            data: _.get(this.post_analys_data, "total_published_counts", []),
          },
        ],
      };
    },

    subscription_chart_data() {
      return {
        labels: _.get(this.subscription_analys_data, "formatted_dates", []),
        datasets: [
          {
            label: "Created",
            backgroundColor: "rgba(0, 255, 46, 1)",
            data: _.get(
              this.subscription_analys_data,
              "total_created_counts",
              []
            ),
          },
          {
            label: "Activating",
            backgroundColor: "rgba(57, 137, 216,1)",
            data: _.get(
              this.subscription_analys_data,
              "total_active_counts",
              []
            ),
          },
        ],
      };
    },
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
        this.GET_POST_ANALYTICS(),
        this.GET_SUBSCRIPTION_ANALYTICS(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
