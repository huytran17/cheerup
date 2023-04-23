<template>
  <v-app>
    <v-main>
      <v-container fluid class="h-100 w-100 pa-0 ma-0">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "PublicLayout",
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
};
</script>
