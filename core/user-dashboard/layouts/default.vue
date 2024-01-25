<template>
  <v-app>
    <v-main>
      <MobileLayout v-if="is_mobile" />
      <DesktopLayout v-else />
      <v-scroll-to-top></v-scroll-to-top>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";
import DesktopLayout from "@/components/DesktopLayout";
import MobileLayout from "@/components/MobileLayout";

export default {
  name: "DefaultLayout",
  middleware: ["verify-access"],
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
