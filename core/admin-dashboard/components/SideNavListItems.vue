<template>
  <vue-sidebar-menu-akahon
    :isMenuOpen="menu_options.is_menu_open"
    :menuLogo="menu_options.menu_logo"
    :menuIcon="menu_options.menuIcon"
    :menuItems="menu_items"
    :isSearch="false"
  />
</template>

<script>
export default {
  name: "SideNavListItems",
  props: {
    menu_options: {
      type: Object,
      default() {
        return {
          is_menu_open: true,
          menu_logo: require("@/assets/images/app/large-logo.jpg"),
          is_search: false,
          menu_icon: "bx-menu",
        };
      },
    },
    menu_items: {
      type: Array,
      default() {
        return [
          {
            name: "Dashboard",
            link: "/",
            icon: "bx-bar-chart",
          },
          {
            name: "User",
            link: "/user",
            icon: "bx-user-circle",
          },
          {
            name: "Category",
            link: "/category",
            icon: "bx-category-alt",
          },
          {
            name: "Post",
            link: "/post",
            icon: "bx-news",
          },
          {
            name: "Comment",
            link: "/comment",
            icon: "bx-message-square-detail",
          },
          {
            name: "Feedback",
            link: "/feedback",
            icon: "bx-paper-plane",
          },
          {
            name: "Subscription",
            link: "/subscription",
            icon: "bx-mail-send",
          },
          {
            name: "System Config",
            link: "/system-configuration",
            icon: "bx-cog",
          },
          {
            name: "Terms Of Use",
            link: "/terms-of-use",
            icon: "bx-question-mark",
          },
        ];
      },
    },
  },
  data() {
    return {
      is_menu_open: false,
      menu_logo: require("@/assets/images/app/large-logo.jpg"),
    };
  },
};
</script>

<style scoped>
:deep(.nav-list) {
  padding-left: 0 !important;
}
:deep(.sidebar) {
  min-width: 78px !important;
}
</style>
