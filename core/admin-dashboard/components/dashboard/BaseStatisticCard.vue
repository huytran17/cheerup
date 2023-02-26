<template>
  <BaseCardWrapper>
    <div class="d-flex flex-column card__statistic">
      <slot></slot>
    </div>
  </BaseCardWrapper>
</template>

<script>
import BaseCardWrapper from "@/components/dashboard/BaseCardWrapper";

export default {
  name: "BaseStatisticCard",
  components: {
    BaseCardWrapper,
  },
};
</script>
