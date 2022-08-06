<template></template>

<script>
import { ADMIN_ROLES } from "@/utils/constants";

export default {
  name: "SideNavListItems",
  props: {
    item_spacing: {
      type: Number,
      default: 15,
    },
    nav_items: {
      type: Array,
      default() {
        return [
          {
            header: "",
            children: [
              {
                title: "Dashboard",
                to: "/",
                icon: "mdi-home-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
              },
            ],
          },
          {
            header: "Management",
            children: [
              {
                title: "User",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                expandable: true,
                children: [
                  {
                    title: "Users",
                    to: "/users",
                    icon: "mdi-account-group-outline",
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                  },
                  {
                    title: "Users 2",
                    to: "/users",
                    icon: "mdi-account-group-outline",
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                  },
                ],
              },
              {
                title: "Category",
                icon: "mdi-category-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                expandable: true,
                children: [
                  {
                    title: "Categories",
                    to: "/categories",
                    icon: "mdi-account-group-outline",
                    expandable: true,
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                    children: [
                      {
                        title: "Categories",
                        to: "/categories",
                        icon: "mdi-account-group-outline",
                        expandable: true,
                        roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                        children: [
                          {
                            title: "Categories",
                            to: "/categories",
                            icon: "mdi-account-group-outline",
                            roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                title: "Comment",
                icon: "mdi-category-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                expandable: true,
                children: [
                  {
                    title: "Comments",
                    to: "/comments",
                    icon: "mdi-account-group-outline",
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                  },
                ],
              },
              {
                title: "Post",
                icon: "mdi-category-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                expandable: true,
                children: [
                  {
                    title: "Posts",
                    to: "/posts",
                    icon: "mdi-account-group-outline",
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                  },
                ],
              },
              {
                title: "Admin",
                icon: "mdi-category-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
                expandable: true,
                children: [
                  {
                    title: "Admins",
                    to: "/admins",
                    icon: "mdi-account-group-outline",
                    roles: [ADMIN_ROLES.SUPER_ADMIN],
                  },
                ],
              },
            ],
          },
          {
            header: "Configurations",
            children: [
              {
                title: "Admin Dashboard Settings",
                to: "/admin-dashboard-settings",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN],
              },
              {
                title: "User Dashboard Settings",
                to: "/user-dashboard-settings",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN],
              },
            ],
          },
          {
            header: "Support",
            children: [
              {
                title: "How to use?",
                to: "/how-to-use",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
              },
              {
                title: "About Us",
                to: "/about-us",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
              },
              {
                title: "Terms Of Use",
                to: "/terms-of-use",
                icon: "mdi-account-group-outline",
                roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
              },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.nav-item {
  overflow: hidden;
  max-height: 100%;
}
.nav-item-hover:hover {
  background: var(--color-nav-item-hover);
}
.nav-item-collapse {
  max-height: 40px !important;
}
.nav-items {
  width: 100%;
}
.nav-icon-rotate-icon {
  transform: rotate(90deg);
}
.nav-item-active {
  background: var(--color-nav-item-active);
}
.nav-expansion-activable {
  border-radius: 4px;
}
.nav-non-expandable-active {
  position: relative;
}
.nav-non-expandable-active::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 45px;
  border-radius: 999px;
  width: 7.5px;
  height: 8px;
  transform: translateY(-50%);
  background: var(--color-nav-item-non-expandable-active);
}
.nav-item-header {
}
.nav-item-header::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translateY(-50%);
  width: 30px;
  height: 1px;
  background: var(--color-side-nav-header);
}
</style>
