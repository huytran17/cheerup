import { get } from "lodash";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user_analys_data: "user/user_analys_data",
      admin_analys_data: "admin/admin_analys_data",
      post_analys_data: "post/post_analys_data",
      most_popular_posts_analys_data: "post/most_popular_posts_analys_data",
      subscription_analys_data: "subscription/subscription_analys_data",
      category_analys_data: "category/category_analys_data",
    }),

    admin_chart() {
      return {
        series: [
          {
            name: this.$t("Total Posts Created"),
            data: get(this.admin_analys_data, "total_post_created_counts", []),
          },
          {
            name: this.$t("Total Author"),
            data: get(this.admin_analys_data, "total_author_counts", []),
          },
          {
            name: this.$t("Total Author Deleted"),
            data: get(this.admin_analys_data, "total_deleted_counts", []),
          },
        ],
        options: {
          chart: {
            id: "author-analytics",
            type: "area",
            width: "100%",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 1,
          },
          xaxis: {
            categories: get(this.admin_analys_data, "formatted_dates", []),
          },
        },
      };
    },

    category_chart() {
      return {
        series: get(this.category_analys_data, "related_post_counts", []),
        options: {
          colors: get(this.category_analys_data, "created_category_colors", []),
          chart: {
            width: 220,
            type: "donut",
          },
          stroke: {
            width: 0,
          },
          labels: get(this.category_analys_data, "created_category_titles", []),
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
        },
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
            categories: get(this.user_analys_data, "formatted_dates", []),
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
            data: get(this.user_analys_data, "total_created_counts", []),
          },
          {
            name: "Deleted",
            data: get(this.user_analys_data, "total_deleted_counts", []),
          },
          {
            name: "Blocked Commenting",
            data: get(
              this.user_analys_data,
              "total_blocked_comment_counts",
              []
            ),
          },
        ],
      };
    },

    user_growth_chart() {
      const is_increased = get(
        this.user_analys_data,
        "growth.is_increased",
        false
      );
      const total_growth_percentage = get(
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

                    !total_growth_percentage && (prefix = "+");

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
        series: [
          {
            name: this.$t("Total Created"),
            data: get(this.post_analys_data, "total_created_counts", []),
          },
          {
            name: this.$t("Total Blocked Comment"),
            data: get(
              this.post_analys_data,
              "total_blocked_comment_counts",
              []
            ),
          },
          {
            name: this.$t("Total Deleted"),
            data: get(this.post_analys_data, "total_deleted_counts", []),
          },
        ],
        options: {
          chart: {
            id: "post-analytics",
            type: "area",
            width: "100%",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 1,
          },
          xaxis: {
            categories: get(this.post_analys_data, "formatted_dates", []),
          },
        },
      };
    },

    most_popular_post_chart() {
      const post_views = get(
        this.most_popular_posts_analys_data,
        "post_views",
        []
      );
      const post_titles = get(
        this.most_popular_posts_analys_data,
        "post_titles",
        []
      );

      return {
        series: post_views,
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: post_titles,
          dataLabels: {
            enabled: false,
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

    subscription_chart() {
      return {
        options: {
          chart: {
            height: 80,
            group: "sparks",
            type: "line",
            sparkline: {
              enabled: true,
            },
          },
          stroke: {
            curve: "smooth",
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.6,
              opacityTo: 0.9,
              gradientFromColors: ["#00ff1d", "#ffff00"],
              gradientToColors: ["#32db04", "#ff4800"],
              stops: [0, 90, 100],
            },
          },
        },
        series: [
          {
            name: "Created",
            data: get(
              this.subscription_analys_data,
              "total_created_counts",
              []
            ),
          },
          {
            name: "Active",
            data: get(this.subscription_analys_data, "total_active_counts", []),
          },
        ],
      };
    },
  },
};
