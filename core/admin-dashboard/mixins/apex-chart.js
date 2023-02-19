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

    user_chart() {
      return {
        options: {
          chart: {
            id: "user-analytics",
            type: "bar",
          },
          xaxis: {
            categories: _.get(this.user_analys_data, "formatted_dates", []),
          },
          colors: ["#16e063", "#fc3232", "#f5fc32"],
          title: {
            text: "Users",
            align: "left",
            style: {
              color: "#1976D2",
              fontFamily: "Lato, sans-serif",
              fontWeight: "600",
            },
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
        },
        series: [
          {
            name: "Created",
            data: _.get(this.user_analys_data, "total_created_counts", []),
          },
          {
            name: "Deleted",
            data: _.get(this.user_analys_data, "total_deleted_counts", []),
          },
          {
            name: "Blocked Commenting",
            data: _.get(
              this.user_analys_data,
              "total_blocked_comment_counts",
              []
            ),
          },
        ],
      };
    },

    user_growth_chart() {
      const is_increased = _.get(
        this.user_analys_data,
        "growth.is_increased",
        false
      );
      const total_growth_percentage = _.get(
        this.user_analys_data,
        "growth.total_percentage",
        0
      );

      return {
        series: [total_growth_percentage],
        options: {
          chart: {
            type: "radialBar",
            offsetY: -10,
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: "16px",
                  color: undefined,
                  offsetY: 80,
                },
                value: {
                  fontSize: "20px",
                  color: is_increased ? "green" : "red",
                  formatter: function (val) {
                    let prefix = is_increased ? "+" : "-";

                    if (!total_growth_percentage) {
                      prefix = "+";
                    }

                    return `${prefix}${val}%`;
                  },
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91],
            },
          },
          stroke: {
            dashArray: 6,
          },
          labels: [this.$t("User Growth")],
        },
      };
    },

    post_chart() {
      return {
        series: [44, 55, 13, 43, 22],
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          dataLabels: {
            formatter: function (val, opts) {
              return;
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
              },
            },
          ],
          legend: {
            show: false,
          },
        },
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
