<script>
import { PolarArea, mixins } from "vue-chartjs";
export default {
  extends: PolarArea,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
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
