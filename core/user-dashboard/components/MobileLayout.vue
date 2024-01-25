<template>
  <v-container>
    <v-row class="pb-5 pb-md-12">
      <v-col cols="12" class="py-0">
        <BaseAppBar />
      </v-col>
      <v-col cols="12" class="pt-0">
        <BaseLanguageSwitcher />
      </v-col>
    </v-row>

    <v-row class="flex-column flex-md-row flex-column-reverse">
      <v-col cols="12">
        <nuxt />
      </v-col>
    </v-row>

    <div class="menu-toggler app-body">
      <v-btn icon @click.stop="toggleOpenMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <v-navigation-drawer
      v-model="is_open"
      absolute
      temporary
      mobile-breakpoint="xs"
      width="94%"
      class="pb-5"
    >
      <v-row class="pt-5">
        <v-col cols="4"></v-col>
        <v-col cols="4" class="pa-0">
          <v-img
            :src="logo_url"
            :lazy-src="logo_url"
            alt="logo"
            contain
            width="inherit"
            class="mx-auto clickable"
            @click="goToHomePage"
          ></v-img>
        </v-col>
        <v-col cols="4" class="app-body d-flex justify-end">
          <v-btn icon class="btn-menu--close" @click.stop="toggleOpenMenu">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <BaseAboutCard />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseSocialiteList />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseProfileCard />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseCategoriesCard />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseQuickAccessCard />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseSearchCard />
        </v-col>
        <v-col cols="12" class="mt-3">
          <BaseQuoteCard />
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import BaseAppBar from "@/components/BaseAppBar";
import BaseAboutCard from "@/components/about/BaseAboutCard";
import BaseSocialiteList from "@/components/socialite/BaseSocialiteList";
import BaseProfileCard from "@/components/user/BaseProfileCard";
import BaseCategoriesCard from "@/components/category/BaseCategoriesCard";
import BaseSearchCard from "@/components/searching/BaseSearchCard";
import BaseQuickAccessCard from "@/components/quick-access/BaseQuickAccessCard";
import BaseQuoteCard from "@/components/quote/BaseQuoteCard";
import BaseLanguageSwitcher from "@/components/BaseLanguageSwitcher";

export default {
  name: "MobileLayout",
  components: {
    BaseAppBar,
    BaseAboutCard,
    BaseSocialiteList,
    BaseProfileCard,
    BaseCategoriesCard,
    BaseSearchCard,
    BaseQuickAccessCard,
    BaseQuoteCard,
    BaseLanguageSwitcher,
  },
  data() {
    return {
      logo_url: `${process.env.BASE_URL}/logo.png`,
      is_open: false,
    };
  },

  methods: {
    ...mapMutations({
      SET_POST_SEARCH_QUERY: "post/SET_POST_SEARCH_QUERY",
    }),

    toggleOpenMenu() {
      return (this.is_open = !this.is_open);
    },

    goToHomePage() {
      this.SET_POST_SEARCH_QUERY({ data: "" });
      this.$router.push(this.localePath("/"));
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-toggler {
  position: fixed;
  top: 4%;
  left: 4%;
  z-index: 999;
}
.mdi-close,
.mdi-menu {
  color: var(--color-black) !important;
  font-size: toRem(28) !important;
}

.btn-menu--close {
  position: fixed;
  top: 1%;
  right: 3%;
  z-index: 999;
}
.v-navigation-drawer {
  z-index: 999;
}
</style>
