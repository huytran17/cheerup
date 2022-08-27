<template>
  <v-app-bar elevation="0" class="white px-0">
    <v-img
      :src="desktop_logo"
      :lazy-src="desktop_logo"
      :alt="$t('large logo')"
      :max-width="is_mobile ? '100px' : '156.09px'"
      contain
      class="px-1 clickable"
      @click="$router.push(localePath('/'))"
    ></v-img>
    <v-spacer></v-spacer>

    <div class="d-flex w-100 pl-10">
      <div
        v-for="(item, index) in nav_items"
        :key="index"
        class="px-5 clickable"
        :class="[selected_nav_item === index ? 'brick--text' : '']"
        @click="onClickNavItem(item, index)"
      >
        <div class="text-body-1">
          <span class="font-weight-medium" v-html="$t(item.text)"></span>
        </div>
      </div>
    </div>

    <v-spacer></v-spacer>
    <v-icon
      color="black"
      @click="SET_SELECTED_SEARCH_BOX({ data: !is_open_search_box })"
      >mdi-magnify</v-icon
    >
    <v-divider vertical inset class="mx-8 black d-none d-md-block"></v-divider>
    <div class="d-md-flex d-none">
      <div class="d-flex justify-center gap-30">
        <v-icon color="black" class="clickable hover-icon">mdi-facebook</v-icon>
        <v-icon color="black" class="clickable hover-icon"
          >mdi-instagram</v-icon
        >
        <v-icon color="black" class="clickable hover-icon">mdi-twitter</v-icon>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "TheSideNavDesktop",
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
:deep(.v-toolbar__content) {
  padding: 0;
}
:deep(.v-list-item:hover::before),
:deep(.v-list-item--active::before),
:deep(.v-list-item:focus::before) {
  opacity: 0 !important;
}
:deep(.mdi-magnify:focus::after) {
  opacity: 0 !important;
}
</style>
