<template>
  <v-app>
    <v-main>
      <TheSideNav v-if="authenticated" />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import authMixins from "@/mixins/auth";
import TheSideNav from "@/components/TheSideNav";

export default {
  name: "DefaultLayout",
  mixins: [authMixins],
  components: {
    TheSideNav,
  },
  data() {
    return {
      panel: false,
    };
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
.nav-wrapper {
  min-width: 270px;
  max-width: 270px;
}
.nav-wrapper {
  min-width: 78px;
}
</style>
