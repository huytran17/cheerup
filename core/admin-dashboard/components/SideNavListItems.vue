<template>
  <div class="nav-items d-flex flex-column">
    <div
      v-for="(item, index) in nav_items"
      :key="index"
      class="nav-item"
      :class="[isExpandable(item) ? 'nav-item-collapse' : '']"
      @click.stop.prevent="
        (event) =>
          toggleExpandNavItem({ expandable: isExpandable(item), event })
      "
    >
      <div class="d-flex clickable" @click="$router.push(localePath(item.to))">
        <div
          v-if="item.header"
          class="text-body-1 text-uppercase non-clickable nav-item-header py-3 position-relative pl-11 side-nav-header--text"
        >
          <span class="app-body" v-html="$t(item.header)"></span>
        </div>
        <div class="d-flex justify-between w-100 px-2">
          <div class="text-body-1 clickable" :style="nav_spacing_style">
            <div>
              <span class="app-body" v-html="$t(item.title)"></span>
            </div>
          </div>
          <v-icon v-if="isExpandable(item)" class="mr-3"
            >mdi-chevron-right</v-icon
          >
        </div>
      </div>
      <SideNavListItems
        v-if="hasChildren(item)"
        :nav_items="item.children"
        :item_spacing="item_spacing + 20"
      />
    </div>
  </div>
</template>

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
                    roles: [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN],
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
  computed: {
    nav_spacing_style() {
      return {
        "margin-left": `${this.item_spacing}px`,
      };
    },
  },
  methods: {
    isExpandable(nav_item) {
      const can_expand = nav_item.expandable;
      const has_children = !!nav_item.children && !_.isEmpty(nav_item.children);
      return can_expand && has_children;
    },

    hasChildren(nav_item) {
      const has_children = !!nav_item.children && !_.isEmpty(nav_item.children);
      return has_children;
    },

    toggleExpandNavItem({ expandable, event }) {
      if (!expandable) {
        return;
      }

      const current_target = event.currentTarget;

      const nav_items_child = current_target.querySelector(".nav-items");
      const arrow_icon = current_target.querySelector(".v-icon");

      const nav_items_child_height = nav_items_child.clientHeight;
      const current_target_height = current_target.clientHeight;

      current_target.style.height =
        current_target_height + nav_items_child_height + "px";

      arrow_icon.classList.toggle("nav-icon-rotate-icon");
      current_target.classList.toggle("nav-item-collapse");
    },
  },
};
</script>

<style scoped>
.nav-item {
  overflow: hidden;
  transition: all 0.3s !important;
}
.nav-item-collapse {
  height: 24px !important;
}
.nav-items {
  width: 100%;
}
.nav-icon-rotate-icon {
  transform: rotate(90deg);
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
