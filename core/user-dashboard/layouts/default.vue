<template>
  <v-app>
    <v-main>
      <TheSideNavMobile v-if="is_mobile" />
      <div v-else class="app-container">
        <TheSideNavDesktop />
      </div>
      <div class="app-container">
        <nuxt />
      </div>
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
