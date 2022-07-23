<template>
  <div>
    <v-app-bar elevation="0" class="white">
      <v-app-bar-nav-icon
        @click.stop="is_open_drawer = !is_open_drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-img
        :src="desktop_logo"
        :lazy-src="desktop_logo"
        :alt="$t('large logo')"
        :max-width="is_mobile ? '100px' : '156.09px'"
        contain
        class="px-1"
      ></v-img>
      <v-spacer></v-spacer>
      <v-icon @click.stop="is_open_drawer = !is_open_drawer"
        >mdi-magnify</v-icon
      >
    </v-app-bar>

    <v-navigation-drawer v-model="is_open_drawer" absolute temporary>
      <div class="d-flex justify-between pa-4">
        <v-img
          :src="mobile_logo"
          :lazy-src="mobile_logo"
          :alt="$t('small logo')"
          max-width="85px"
          contain
        ></v-img>
        <v-icon color="black" class="clickable">mdi-close</v-icon>
      </div>
      <v-divider></v-divider>
      <v-list nav dense class="pt-4">
        <v-list-item-group active-class="brick--text">
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "TheSideNavMobile",
  mixins: [systemMixins],
  data() {
    return {
      is_open_drawer: false,
      mobile_logo: require("@/assets/images/app/small-logo.jpg"),
      desktop_logo: require("@/assets/images/app/large-logo.jpg"),
    };
  },
  watch: {
    is_open_drawer: {
      handler(data) {
        this.SET_DRAWER({ data });
      },
    },
  },
  fetch() {
    this.is_open_drawer = this.drawer;
  },
};
</script>

<style></style>
