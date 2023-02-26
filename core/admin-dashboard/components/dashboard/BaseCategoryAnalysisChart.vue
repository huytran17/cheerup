<template>
  <apex-chart :height="220" :options="options" :series="series" />
</template>

<script>
export default {
  name: "BaseCategoryAnalysisChart",

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
