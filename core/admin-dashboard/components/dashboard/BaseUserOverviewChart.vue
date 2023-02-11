<template>
  <BaseCardWrapper>
    <apex-chart :height="372" :options="options" :series="series" />
  </BaseCardWrapper>
</template>

<script>
import BaseCardWrapper from "@/components/dashboard/BaseCardWrapper";
export default {
  name: "BaseUserOverviewChart",
  components: {
    BaseCardWrapper,
  },
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
