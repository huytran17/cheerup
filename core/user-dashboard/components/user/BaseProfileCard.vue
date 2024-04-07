<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Your Profile')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div v-if="has_user" class="d-flex justify-center flex-column">
        <div class="d-flex justify-center">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                v-bind="attrs"
                v-on="on"
                :src="user_avatar"
                :lazy-src="user_avatar"
                :alt="me.full_name"
                cover
                :width="100"
                :height="100"
                :max-width="100"
                :max-height="100"
                class="rounded-circle clickable"
                @click="$router.push(localePath(`/profile`))"
              ></v-img>
            </template>
            <span v-html="$t('View your profile')"></span>
          </v-tooltip>
        </div>
        <div
          :class="{ 'pt-4': me.full_name }"
          class="d-flex justify-center small--text text-left"
        >
          <span
            class="app-body clickable"
            @click="$router.push(localePath(`/profile`))"
            >{{ me.full_name }}</span
          >
        </div>

        <div class="profile__list pt-3">
          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span
                class="app-body clickable card-item__title"
                v-html="$t('View your profile')"
                @click="$router.push(localePath('/profile'))"
              ></span>
            </div>
          </div>

          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span
                class="app-body clickable card-item__title"
                v-html="$t('Favourites')"
                @click="$router.push(localePath('/favourites'))"
              ></span>
              <span class="app-body clickable card-item__title"
                >({{ post_bookmarks_count }})</span
              >
            </div>
          </div>

          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span
                class="app-body clickable card-item__title"
                v-html="$t('Logout')"
                @click="signOut"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <BaseNoData message="No data available" />
        <div class="d-flex justify-center pt-3">
          <v-btn
            depressed
            tile
            color="brick"
            class="white--text"
            small
            @click="redirectToLoginPage"
          >
            <span class="app-body" v-html="$t('Login')"></span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import authMixins from "@/mixins/auth";
import postBookmarkMixins from "@/mixins/post-bookmark";
import BaseNoData from "@/components/BaseNoData";

export default {
  name: "BaseProfileCard",
  components: { BaseNoData },
  mixins: [authMixins, postBookmarkMixins],
  data() {
    return {
      default_user_avatar: require("@/assets/images/default/user-avatar.webp"),
    };
  },
  computed: {
    user_avatar() {
      return get(this.me, "avatar_url") || this.default_user_avatar;
    },
  },
  methods: {
    redirectToLoginPage() {
      this.$router.push(this.localePath("/login"));
    },

    async signOut() {
      try {
        await this.SIGN_OUT();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async fetch() {
    try {
      this.has_user && (await this.COUNT_POST_BOOKMARKS());
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.card-item__wrapper {
  border-bottom: toRem(1) solid var(--color-article-baseline);
}
.card-item__title {
  transition: all 0.2s linear;
}
.card-item__title:hover {
  padding-left: toRem(15);
}
.profile__list {
  max-height: toRem(210);
  overflow-y: auto;
}
</style>
