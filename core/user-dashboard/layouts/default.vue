<template>
  <v-app>
    <v-main>
      <v-container>
        <BaseAppBar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import systemMixins from "@/mixins/system";
import BaseAppBar from "@/components/BaseAppBar";

export default {
  name: "DefaultLayout",
  mixins: [systemMixins],
  components: {
    BaseAppBar,
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1904px) {
  :deep(.container) {
    max-width: 1100px !important;
  }
}
@media only screen and (min-width: 1264px) {
  :deep(.container) {
    max-width: 1100px !important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 960px) {
  :deep(.container) {
    max-width: 726px !important;
  }
}
</style>
