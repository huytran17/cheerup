import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
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
};
