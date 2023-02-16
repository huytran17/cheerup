<template>
  <BaseCardWrapper>
    <div class="d-flex flex-column card__statistic">
      <div class="card__header">
        <slot name="header"></slot>
      </div>
      <div class="card__description">
        <slot name="description"></slot>
      </div>
      <div class="card__content">
        <slot name="content"></slot>
      </div>
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
