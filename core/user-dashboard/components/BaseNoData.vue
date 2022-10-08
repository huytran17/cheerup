<template>
  <div
    class="text-cente text__description text-sm-body-2 text-uppercase text-center grey--text"
  >
    <span class="app-body" v-html="$t(message)"></span>
  </div>
</template>

<script>
export default {
  name: "BaseNoData",
  props: {
    message: {
      type: String,
      default: () => "No data to show",
    },
  },
};
</script>

<style></style>
