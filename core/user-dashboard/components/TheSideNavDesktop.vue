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
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
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
:deep(.v-toolbar__content) {
  padding: 0;
}
:deep(.v-list-item:hover::before),
:deep(.v-list-item--active::before),
:deep(.v-list-item:focus::before) {
  opacity: 0 !important;
}
</style>
