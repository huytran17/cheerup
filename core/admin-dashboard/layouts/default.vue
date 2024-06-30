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

  mounted() {
    const nav_items = document.querySelectorAll("ul.nav-list li a");
    const locale = this.$i18n.getLocaleCookie();
    const route_path = this.$route.fullPath.replace(`/${locale}`, "") || "/";
    for (const item of nav_items) {
      const href = item.getAttribute("href");

      const can_active =
        (href === "/" && route_path === "/") ||
        (href !== "/" && route_path.includes(href));

      if (can_active) {
        item.classList.add("active");
        continue;
      }

      item.classList.remove("active");
    }
  },
};
</script>
<style scoped>
:deep(ul.nav-list li a.active) {
  background-color: var(--color-brick);
}
:deep(ul.nav-list li a.active) * {
  color: var(--color-white);
}
</style>
