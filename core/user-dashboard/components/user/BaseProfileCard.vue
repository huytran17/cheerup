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
                max-width="100px"
                max-height="100px"
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
                @click="SIGN_OUT"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="small--text">
          <span class="app-body" v-html="$t('No data available')"></span>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn
            depressed
            tile
            color="brick"
            class="white--text"
            @click="$router.push(localePath('/login'))"
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

export default {
  name: "BaseProfileCard",
  mixins: [authMixins, postBookmarkMixins],
  data() {
    return {
      default_user_avatar: require("@/assets/images/default/user-avatar.png"),
    };
  },
  computed: {
    user_avatar() {
      return get(this.me, "avatar_url") || this.default_user_avatar;
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

<style scoped>
.card-item__wrapper {
  border-bottom: 1px solid var(--color-article-baseline);
}
.card-item__title {
  transition: all 0.2s linear;
}
.card-item__title:hover {
  padding-left: 15px;
}
.profile__list {
  max-height: 210px;
  overflow-y: auto;
}
</style>
