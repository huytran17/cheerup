<template>
  <apex-chart :height="300" :options="options" :series="series" />
</template>

<script>
export default {
  name: "BasePostAnalysisChart",

  props: {
    options: {
      type: Object,
      default: () => {},
    },
    series: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
