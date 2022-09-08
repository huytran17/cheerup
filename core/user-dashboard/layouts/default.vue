<template>
  <v-app>
    <v-main>
      <v-container>
        <BaseAppBar />
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
:deep(.container) {
  max-width: 1100px !important;
}

@media only screen and (min-width: 961px) and (max-width: 1080px) {
  :deep(.container) {
    max-width: 990px !important;
  }
}

@media only screen and (min-width: 768px) and (max-width: 960px) {
  :deep(.container) {
    width: 726px !important;
  }
}
@media only screen and (max-width: 767px) {
  :deep(.container) {
    width: 448px !important;
  }
}

@media only screen and (max-width: 767px) {
  :deep(.container) {
  }
}
</style>
