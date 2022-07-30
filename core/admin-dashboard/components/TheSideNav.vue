<template>
  <aside class="side-nav h-100 position-fixed">
    <div
      class="logo d-flex flex-column justify-center py-6 position-sticky white"
    >
      <v-img
        :src="logo"
        :lazy-src="logo"
        max-width="130px"
        contain
        class="mx-auto"
      ></v-img>
    </div>
    <SideNavListItems />
  </aside>
</template>

<script>
import systemMixins from "@/mixins/system";
import SideNavListItems from "@/components/SideNavListItems";
export default {
  name: "TheSideNav",
  mixins: [systemMixins],
  components: {
    SideNavListItems,
  },

  data() {
    return {
      logo: require("@/assets/images/app/large-logo.jpg"),
    };
  },
};
</script>

<style scoped>
.side-nav {
  min-width: 270px;
  max-width: 270px;
  height: 100%;
  top: 0%;
  left: 0%;
  overflow: auto;
}
.logo {
  top: 0%;
  left: 0%;
  z-index: 9999;
}
</style>
