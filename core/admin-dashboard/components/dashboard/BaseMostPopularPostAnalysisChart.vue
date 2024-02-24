<template>
  <apex-chart :height="200" :options="options" :series="series" />
</template>

<script>
export default {
  name: "BaseMostPopularPostAnalysisChart",

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
