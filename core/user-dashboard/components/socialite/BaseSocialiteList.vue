<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span class="sidebar__header position-relative mb-2 d-inline-block">{{
        $t("Follow Me")
      }}</span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <v-row class="socialite__row justify-center py-3">
        <v-col
          cols="3"
          sm="3"
          class="pa-0"
          v-for="(socialite, index) in socialites"
          :key="index"
          @click="goToSocialiteUrl({ url: socialite.to })"
        >
          <div
            class="pa-3 socialite__item d-flex justify-center clickable position-relative"
          >
            <v-icon :color="socialite.color">{{ socialite.icon }}</v-icon>
          </div>
        </v-col>
      </v-row>
      <div class="text-body-2 text-uppercase text-left pt-2">
        <div class="py-2 card-item__wrapper">
          <span class="clickable card-item__title" @click="openContactWindow">{{
            $t("Contact me")
          }}</span>
        </div>
      </div>
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
      ],
    },
  },
  methods: {
    goToSocialiteUrl({ url }) {
      return window.open(url, "__blank");
    },

    openContactWindow() {
      window.location.href = `mailto:${process.env.OWNER_EMAIL}`;
    },
  },
};
</script>

<style scoped>
.mdi-instagram {
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
.socialite__text {
  z-index: 9999;
}
</style>
