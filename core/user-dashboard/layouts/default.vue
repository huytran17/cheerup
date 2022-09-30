<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="pb-5 pb-md-15">
          <v-col cols="12">
            <BaseAppBar />
          </v-col>
        </v-row>
        <v-row class="flex-column flex-md-row flex-column-reverse">
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12" class="mt-0 mt-md-15">
                <BaseAboutCard
                  :system_configuration_data="system_configuration"
                />
              </v-col>
              <v-col cols="12" class="mt-3">
                <BaseSocialiteList />
              </v-col>
              <v-col cols="12" class="mt-3">
                <BaseProfileCard />
              </v-col>
              <v-col cols="12" class="mt-3">
                <BaseCategoriesCard :category_titles="category_titles" />
              </v-col>
              <v-col cols="12" class="mt-3">
                <BaseAdvertisingCard />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-scroll-to-top></v-scroll-to-top>
    </v-main>
  </v-app>
</template>

<script>
import systemMixins from "@/mixins/system";
import systemConfigurationMixins from "@/mixins/system-configuration";
import authMixins from "@/mixins/auth";
import categoryMixins from "@/mixins/category";
import BaseAppBar from "@/components/BaseAppBar";
import BaseAboutCard from "@/components/about/BaseAboutCard";
import BaseSocialiteList from "@/components/socialite/BaseSocialiteList";
import BaseProfileCard from "@/components/user/BaseProfileCard";
import BaseCategoriesCard from "@/components/category/BaseCategoriesCard";
import BaseAdvertisingCard from "@/components/advertising/BaseAdvertisingCard";

export default {
  name: "DefaultLayout",
  mixins: [systemMixins, authMixins, systemConfigurationMixins, categoryMixins],
  components: {
    BaseAppBar,
    BaseAboutCard,
    BaseSocialiteList,
    BaseProfileCard,
    BaseCategoriesCard,
    BaseAdvertisingCard,
  },
  async fetch() {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await this.GET_ME();
      }

      await Promise.all([
        this.GET_LATEST_SYSTEM_CONFIGURATION(),
        this.GET_CATEGORY_TITLES(),
      ]);
    } catch (err) {
      console.error(err);
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
