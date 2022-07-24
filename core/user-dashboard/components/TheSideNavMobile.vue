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
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
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
        <v-btn icon @click.stop="is_open_drawer = !is_open_drawer">
          <v-icon color="black" class="clickable">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <v-list nav dense class="pt-4">
        <v-list-item-group active-class="brick--text">
          <v-list-item
            v-for="(item, index) in nav_items"
            :key="index"
            class="clickable"
            :class="[
              selected_nav_item === index
                ? 'v-list-item--active v-list-item--link brick--text'
                : '',
            ]"
            @click="onClickNavItem(item, index)"
          >
            <v-list-item-title>
              <div class="text-body-2">
                <span class="app-title" v-html="$t(item.text)"></span>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="d-flex flex-column justify-between mt-auto mb-11">
        <div class="text-body-1 text-center mb-4">
          <span class="app-title" v-html="$t('Follow us')"></span>
        </div>
        <div class="d-flex justify-center gap-20">
          <v-icon color="black" class="clickable hover-icon"
            >mdi-facebook</v-icon
          >
          <v-icon color="black" class="clickable hover-icon"
            >mdi-instagram</v-icon
          >
          <v-icon color="black" class="clickable hover-icon"
            >mdi-twitter</v-icon
          >
          <v-icon color="black" class="clickable hover-icon"
            >mdi-linkedin</v-icon
          >
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "TheSideNavMobile",
  mixins: [systemMixins],
  props: {
    mobile_logo: {
      type: String,
      default: require("@/assets/images/app/small-logo.jpg"),
    },
    desktop_logo: {
      type: String,
      default: require("@/assets/images/app/large-logo.jpg"),
    },
    nav_items: {
      type: Array,
      default() {
        return [
          {
            text: "Home",
            to: "/",
          },
          {
            text: "About",
            to: "/about-us",
          },
          {
            text: "Contact",
            to: "/contact",
          },
        ];
      },
    },
  },
  data() {
    return {
      is_open_drawer: false,
    };
  },
  watch: {
    is_open_drawer: {
      handler(data) {
        this.SET_DRAWER({ data });
      },
    },
  },
  methods: {
    onClickNavItem(item, index) {
      this.SET_SELECTED_NAV_ITEM({ data: index });
      this.$router.push(this.localePath(item.to));
    },
  },
  fetch() {
    this.is_open_drawer = this.drawer;
  },
};
</script>

<style scoped>
.hover-icon:hover {
  color: #ff2e55 !important;
}
:deep(.v-navigation-drawer__content) {
  display: flex !important;
  flex-direction: column !important;
}
.nav-active {
  color: #ff2e55;
}
</style>
