<template>
  <v-app class="position-relative">
    <v-main>
      <div class="d-flex h-100">
        <div class="nav-wrapper h-100">
          <TheSideNav />
        </div>
        <div class="red main-wrapper h-100 w-100">
          <nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheSideNav from "@/components/TheSideNav";
export default {
  name: "DefaultLayout",
  components: {
    TheSideNav,
  },
  data() {
    return {
      panel: false,
    };
  },
};
</script>
<style scoped>
.nav-wrapper {
  min-width: 270px;
  max-width: 270px;
}
.main-wrapper {
}
</style>
