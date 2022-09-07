<template>
  <v-app>
    <v-main>
      <v-container>
        <BaseAppBar v-if="has_user" />
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";
import BaseAppBar from "@/components/BaseAppBar";

export default {
  name: "DefaultLayout",
  mixins: [systemMixins, authMixins],
  components: {
    BaseAppBar,
  },
  async fetch() {
    try {
      await this.GET_ME();
    } catch (err) {
      console.error(err);
    }
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
