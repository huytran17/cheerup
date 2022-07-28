<template>
  <v-app>
    <v-main>
      <div class="d-flex h-100">
        <div class="nav-wrapper blue h-100">
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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
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
