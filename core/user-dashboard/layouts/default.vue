<template>
  <v-app>
    <v-main>
      <TheSideNavMobile />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheSideNavMobile from "@/components/TheSideNavMobile";

export default {
  name: "DefaultLayout",
  components: {
    TheSideNavMobile,
  },
};
</script>
