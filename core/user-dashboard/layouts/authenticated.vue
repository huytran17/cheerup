<template>
  <v-app>
    <v-main>
      <MobileLayout v-if="is_mobile" />
      <DesktopLayout v-else />
      <BaseAppLoading />
      <v-scroll-to-top></v-scroll-to-top>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";
import DesktopLayout from "@/components/DesktopLayout";
import MobileLayout from "@/components/MobileLayout";
import BaseAppLoading from "@/components/BaseAppLoading";

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
    DesktopLayout,
    MobileLayout,
    BaseAppLoading,
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
    max-width: toRem(726);
  }
}

@include media-max-width(toRem(767)) {
  .container {
    width: 100%;
  }
}
</style>
