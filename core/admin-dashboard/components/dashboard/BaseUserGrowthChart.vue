<template>
  <BaseCardWrapper>
    <apex-chart :height="230" :options="options" :series="series" />
  </BaseCardWrapper>
</template>

<script>
import BaseCardWrapper from "@/components/dashboard/BaseCardWrapper";

export default {
  name: "BaseUserGrowthChart",
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
