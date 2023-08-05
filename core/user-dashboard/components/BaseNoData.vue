<template>
  <div class="text-body-3 text-uppercase text-center brick--text">
    <span class="app-body" v-html="$t(message)"></span>
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
