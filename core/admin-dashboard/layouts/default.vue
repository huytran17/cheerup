<template>
  <v-app>
    <v-main class="background">
      <TheSideNav />
      <v-container fluid>
        <nuxt />
      </v-container>
      <v-scroll-to-top></v-scroll-to-top>
      <BaseAppOverlay v-if="app_loading" />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import TheSideNav from "@/components/TheSideNav";
import BaseAppOverlay from "@/components/BaseAppOverlay";

export default {
  name: "DefaultLayout",
  middleware: ["authenticated"],
  components: {
    TheSideNav,
    BaseAppOverlay,
  },
  computed: {
    ...mapGetters({
      app_loading: "app_loading",
    }),
  },
};
</script>
<style scoped>
.nav-wrapper {
  min-width: 270px;
  max-width: 270px;
}
.nav-wrapper {
  min-width: 78px;
}
</style>
