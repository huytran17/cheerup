<template>
  <div class="nav-items d-flex flex-column">
    <div v-for="(item, index) in nav_items" :key="index">
      <v-expand-transition>
        <div
          class="nav-item"
          :class="[isExpandable(item) ? 'nav-item-collapse expandable' : '']"
          @click.stop.prevent="
            (event) => {
              toggleExpandNavItem({ expandable: isExpandable(item), event });
            }
          "
        >
          <div
            class="d-flex clickable"
            @click="$router.push(localePath(item.to))"
          >
            <div
              v-if="item.header"
              class="text-body-1 text-uppercase non-clickable nav-item-header py-3 position-relative pl-11 side-nav-header--text"
            >
              <span class="app-body" v-html="$t(item.header)"></span>
            </div>
            <div
              class="d-flex justify-between w-100 px-2 nav-item-hover nav-item-activable py-2"
              :class="[
                isExpandable(item)
                  ? 'nav-expansion-activable'
                  : 'nav-non-expandable',
              ]"
            >
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
      </v-expand-transition>
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
      const current_target = event.currentTarget;

      const hover_items = document.querySelectorAll(".nav-item-activable");

      hover_items.forEach((item) => {
        item.classList.remove("nav-item-active");
        item.classList.add("nav-item-hover");
      });

      const nav_non_expandable_active_items = document.querySelectorAll(
        ".nav-non-expandable-active"
      );
      nav_non_expandable_active_items.forEach((item) => {
        item.classList.remove("nav-item-hover");
      });

      if (!expandable) {
        const nav_non_expandable_items = document.querySelectorAll(
          ".nav-non-expandable"
        );

        nav_non_expandable_items.forEach((item) => {
          item.classList.remove("nav-non-expandable-active");
        });

        const closest_expandable_item = current_target.closest(".expandable");
        const child_expansion_activable_item =
          closest_expandable_item.querySelector(".nav-expansion-activable");
        child_expansion_activable_item.classList.add("nav-item-active");
        child_expansion_activable_item.classList.remove("nav-item-hover");

        const child_nav_non_expandable = current_target.querySelector(
          ".nav-non-expandable"
        );

        child_nav_non_expandable.classList.add("nav-non-expandable-active");
        child_nav_non_expandable.classList.remove("nav-item-hover");

        return;
      }

      const arrow_icon = current_target.querySelector(".v-icon");
      const child_nav_expansion_activable = current_target.querySelector(
        ".nav-expansion-activable"
      );

      arrow_icon.classList.toggle("nav-icon-rotate-icon");
      current_target.classList.toggle("nav-item-collapse");
      child_nav_expansion_activable.classList.add("nav-item-active");
      child_nav_expansion_activable.classList.remove("nav-item-hover");

      return;
    },
  },
};
</script>

<style scoped>
.nav-item {
  overflow: hidden;
  transition: all 0.3s !important;
  height: auto;
}
.nav-item-hover:hover {
  background: var(--color-nav-item-hover);
}
.nav-item-collapse {
  height: 40px !important;
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
  background: red;
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
