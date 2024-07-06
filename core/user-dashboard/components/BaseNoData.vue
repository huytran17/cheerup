<template>
  <div class="text-body-3 text-uppercase text-center brick--text">
    {{ $t(message) }}
  </div>
</template>

<script>
export default {
  name: "BaseNoData",
  props: {
    message: {
      type: String,
      default: () => "No data available",
    },
  },
};
</script>
