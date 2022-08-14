<template>
  <v-app>
    <v-main>
      <TheSideNav />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TheSideNav from "@/components/TheSideNav";

export default {
  name: "DefaultLayout",
  components: {
    TheSideNav,
  },
  methods: {
    ...mapActions({
      GET_ME: "auth/GET_ME",
    }),
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
