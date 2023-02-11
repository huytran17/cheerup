<template>
  <apex-chart :height="315" :options="options" :series="series" />
</template>

<script>
export default {
  name: "BaseUserOverviewChart",
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
