<template>
  <v-app>
    <v-main>
      <v-container>
        <TheSideNavMobile v-if="is_mobile" />
        <TheSideNavDesktop v-else />
        <div class="pt-6">
          <nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import systemMixins from "@/mixins/system";

import TheSideNavMobile from "@/components/TheSideNavMobile";
import TheSideNavDesktop from "@/components/TheSideNavDesktop";

export default {
  name: "DefaultLayout",
  mixins: [systemMixins],
  components: {
    TheSideNavMobile,
    TheSideNavDesktop,
  },
};
</script>

<style scoped>
.search-results {
  top: 0%;
  left: 0%;
}
</style>
