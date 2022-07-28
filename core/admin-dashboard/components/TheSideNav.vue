<template>
  <aside class="nav blue h-100"></aside>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "TheSideNav",
  mixins: [systemMixins],
  data() {
    return {
      d_drawer: false,
    };
  },
};
</script>

<style scoped>
.nav {
  min-width: 270px;
  max-width: 270px;
  height: 100%;
}
</style>
