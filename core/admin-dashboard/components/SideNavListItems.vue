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
import { get } from "lodash";
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
            name: this.$t("Dashboard"),
            link: "/",
            icon: "bx-bar-chart",
          },
          {
            name: this.$t("Profile"),
            link: "/profile",
            icon: "bx-user-pin",
          },
          {
            name: this.$t("Admin"),
            link: "/admin",
            icon: "bx-crown",
          },
          {
            name: this.$t("User"),
            link: "/user",
            icon: "bx-user-circle",
          },
          {
            name: this.$t("Category"),
            link: "/category",
            icon: "bx-category-alt",
          },
          {
            name: this.$t("Post"),
            link: "/post",
            icon: "bx-news",
          },
          {
            name: this.$t("Gallery"),
            link: "/gallery",
            icon: "bx-images",
          },
          {
            name: this.$t("Comment"),
            link: "/comment",
            icon: "bx-message-square-detail",
          },
          {
            name: this.$t("Subscription"),
            link: "/subscription",
            icon: "bx-mail-send",
          },
          {
            name: this.$t("System Config"),
            link: "/system-configuration",
            icon: "bx-cog",
          },
          {
            name: this.$t("Terms Of Use"),
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
        get(this.me, "avatar_url") ||
        require("@/assets/images/app/admin-avatar.jpg")
      );
    },

    admin_name() {
      return get(this.me, "full_name");
    },

    admin_type() {
      return get(this.me, "type");
    },
  },

  methods: {
    ...mapActions({
      SIGN_OUT: "auth/SIGN_OUT",
    }),

    async signOut() {
      try {
        await this.SIGN_OUT();
        this.$router.push(this.localePath("/login"));
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
