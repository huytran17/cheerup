<template>
  <apex-chart
    :height="315"
    :options="user_growth_chart.options"
    :series="user_growth_chart.series"
  />
</template>

<script>
export default {
  name: "BaseUserGrowthChart",
};
</script>

<style></style>
