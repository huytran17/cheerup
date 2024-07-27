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
          <v-col cols="12" class="mt-3">
            <BaseQuoteCard />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
  name: "DesktopLayout",
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
};
</script>

<style lang="scss" scoped>
.container {
  max-width: toRem(1100);
}

@include media-minmax-width(toRem(961), toRem(1080)) {
  .container {
    max-width: toRem(990);
  }
}

@include media-minmax-width(toRem(768), toRem(960)) {
  .container {
    width: toRem(726);
  }
}

@include media-max-tablet {
  .container {
    width: 100%;
  }

  #icon-container {
    bottom: toRem(20);
    right: toRem(20);
  }
}
</style>
