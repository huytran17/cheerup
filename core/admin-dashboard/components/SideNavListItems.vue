<template>
  <vue-sidebar-menu-akahon
    :isMenuOpen="menu_options.is_menu_open"
    :menuLogo="menu_options.menu_logo"
    :menuIcon="menu_options.menuIcon"
    :menuItems="menu_items"
    :isSearch="false"
    :profileImg="admin_avatar"
    :profileName="admin_name"
    :profileRole="admin_type"
    @button-exit-clicked="signOut"
    bgColor="#ffffff"
    menuItemsTextColor="#000000"
    menuItemsHoverColor="#e7e7ff"
    logoTitleColor="#000000"
    iconsColor="#000000"
    menuFooterTextColor="#ffffff"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SideNavListItems",
  props: {
    menu_options: {
      type: Object,
      default() {
        return {
          is_menu_open: true,
          menu_logo: require("@/assets/images/app/logo.jpg"),
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
            name: "Profile",
            link: "/profile",
            icon: "bx-user-pin",
          },
          {
            name: "Admin",
            link: "/admin",
            icon: "bx-crown",
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
            name: "Gallery",
            link: "/gallery",
            icon: "bx-images",
          },
          {
            name: "Comment",
            link: "/comment",
            icon: "bx-message-square-detail",
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
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),

    admin_avatar() {
      return (
        _.get(this.me, "avatar_url") ||
        require("@/assets/images/app/admin-avatar.jpg")
      );
    },

    admin_name() {
      return _.get(this.me, "full_name");
    },

    admin_type() {
      return _.get(this.me, "type");
    },
  },

  methods: {
    ...mapActions({
      GET_ME: "auth/GET_ME",
      SIGN_OUT: "auth/SIGN_OUT",
    }),

    async signOut() {
      try {
        await this.SIGN_OUT();
        await this.GET_ME();
      } catch (error) {
        console.error(error);
      }
    },
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
:deep(.profile) {
  background: var(--color-white) !important;
}
:deep(.name_job) > * {
  color: var(--color-black) !important;
}
:deep(#log_out) {
  background: var(--color-white) !important;
  color: var(--color-black) !important;
  opacity: 1 !important;
}
:deep(#log_out::before) {
  cursor: pointer;
}
:deep(.profile) {
  border-right: 1px solid var(--color-grey) !important;
}
.sidebar {
  border-right: 1px solid var(--color-grey) !important;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  color: black !important;
}
</style>
