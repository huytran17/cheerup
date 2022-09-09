<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Follow Me')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6 d-flex">
      <v-row class="socialite__row justify-space-between">
        <v-col
          cols="4"
          sm="4"
          v-for="(socialite, index) in socialites"
          :key="index"
          class="socialite__item d-flex flex-column justify-space-between clickable position-relative"
          @click="goToSocialiteUrl({ url: socialite.to })"
        >
          <v-icon :color="socialite.color">{{ socialite.icon }}</v-icon>
          <div class="text-body-2 pt-2 position-relative socialite__text">
            <span class="app-body" v-html="$t(socialite.text)"></span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { SOCIALITE_URL } from "@/constants";
export default {
  name: "BaseSocialiteList",
  props: {
    socialites: {
      type: Array,
      default: () => [
        {
          icon: "mdi-github",
          text: "Github",
          color: "github",
          to: SOCIALITE_URL.GITHUB,
        },
        {
          icon: "mdi-facebook",
          text: "Facebook",
          color: "facebook",
          to: SOCIALITE_URL.FACEBOOK,
        },
        {
          icon: "mdi-twitter",
          text: "Twitter",
          color: "twitter",
          to: SOCIALITE_URL.TWITTER,
        },
        {
          icon: "mdi-instagram",
          text: "Instagram",
          color: "instagram",
          to: SOCIALITE_URL.INSTAGRAM,
        },
        {
          icon: "mdi-pinterest",
          text: "Pinterest",
          color: "pinterest",
          to: SOCIALITE_URL.PINTEREST,
        },
        {
          icon: "mdi-google-plus",
          text: "Google+",
          color: "google_plus",
          to: SOCIALITE_URL.GOOGLE_PLUS,
        },
      ],
    },
  },
  methods: {
    goToSocialiteUrl({ url }) {
      return window.open(url, "__blank");
    },
  },
};
</script>

<style scoped>
:deep(.mdi-instagram) {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  ) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
.socialite__item::before {
  content: "";
  position: absolute;
  width: 95%;
  height: 95%;
  top: 0;
  left: 0;
  border: 1px solid var(--color-article-baseline);
  transition: all 0.2s linear;
}
.socialite__text {
  z-index: 9999;
}
</style>
