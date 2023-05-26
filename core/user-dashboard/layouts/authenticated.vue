<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="pb-5 pb-md-12">
          <v-col cols="12">
            <BaseAppBar />
          </v-col>
          <v-col cols="12" class="pt-0">
            <BaseLanguageSwitcher />
          </v-col>
        </v-row>
        <v-row class="flex-column flex-md-row flex-column-reverse">
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
          <v-col cols="12" md="4">
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
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-scroll-to-top></v-scroll-to-top>
      <RequireLoginSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";
import BaseAppBar from "@/components/BaseAppBar";
import BaseAboutCard from "@/components/about/BaseAboutCard";
import BaseSocialiteList from "@/components/socialite/BaseSocialiteList";
import BaseProfileCard from "@/components/user/BaseProfileCard";
import BaseCategoriesCard from "@/components/category/BaseCategoriesCard";
import BaseSearchCard from "@/components/searching/BaseSearchCard";
import BaseQuickAccessCard from "@/components/quick-access/BaseQuickAccessCard";
import RequireLoginSnackbar from "@/components/RequireLoginSnackbar";
import BaseLanguageSwitcher from "@/components/BaseLanguageSwitcher";

export default {
  name: "DefaultLayout",
  middleware: ["authenticated"],
  mixins: [systemMixins, authMixins],
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });

    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [...i18nHead.meta],
      link: [
        ...i18nHead.link,
        {
          hid: "canonical",
          rel: "canonical",
          href: process.env.BASE_URL,
        },
      ],
    };
  },
  components: {
    BaseAppBar,
    BaseAboutCard,
    BaseSocialiteList,
    BaseProfileCard,
    BaseCategoriesCard,
    BaseSearchCard,
    BaseQuickAccessCard,
    RequireLoginSnackbar,
    BaseLanguageSwitcher,
  },
  computed: {
    ...mapGetters({
      category_titles: "category/category_titles",
    }),
  },
  methods: {
    ...mapActions({
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
      GET_CATEGORY_TITLES: "category/GET_CATEGORY_TITLES",
    }),
  },
  async fetch() {
    try {
      await Promise.all([
        this.GET_LATEST_SYSTEM_CONFIGURATION(),
        this.GET_CATEGORY_TITLES(),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
:deep(.container) {
  max-width: 1100px !important;
}

@media only screen and (min-width: 961px) and (max-width: 1080px) {
  :deep(.container) {
    max-width: 990px !important;
  }
}

@media only screen and (min-width: 768px) and (max-width: 960px) {
  :deep(.container) {
    width: 726px !important;
  }
}
@media only screen and (max-width: 767px) {
  :deep(.container) {
    width: 100% !important;
  }
}
</style>