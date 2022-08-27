<script>
import { PolarArea, mixins } from "vue-chartjs";
export default {
  extends: PolarArea,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        tooltips: {
          enabled: true,
        },
        legend: {
          display: true,
          labels: {
            fontColor: "black",
          },
          position: "bottom",
        },
      }),
    },
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options);
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
