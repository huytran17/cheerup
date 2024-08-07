<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span class="sidebar__header position-relative mb-2 d-inline-block">{{
        $t("Your Profile")
      }}</span>
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
                class="rounded-circle clickable"
                @click="$router.push(localePath(`/profile`))"
              ></v-img>
            </template>
            {{ $t("View your profile") }}
          </v-tooltip>
        </div>
        <div
          :class="{ 'pt-4': me.full_name }"
          class="d-flex justify-center small--text text-left"
        >
          <span
            class="clickable"
            @click="$router.push(localePath(`/profile`))"
            >{{ me.full_name }}</span
          >
        </div>

        <div class="profile__list pt-3">
          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span
                class="clickable card-item__title"
                @click="$router.push(localePath('/profile'))"
                >{{ $t("View your profile") }}</span
              >
            </div>
          </div>

          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span
                class="clickable card-item__title"
                @click="$router.push(localePath('/favourites'))"
                >{{ $t("Favourites") }}</span
              >
              <span class="clickable card-item__title"
                >({{ post_bookmarks_count }})</span
              >
            </div>
          </div>

          <div class="text-body-2 text-uppercase text-left">
            <div class="py-2 card-item__wrapper">
              <span class="clickable card-item__title" @click="signOut">{{
                $t("Logout")
              }}</span>
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
            small
            color="brick"
            class="white--text"
            @click="redirectToLoginPage"
          >
            {{ $t("Login") }}
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
.sidebar__card {
  .v-image {
    max-width: toRem(90);
    max-height: toRem(90);
    aspect-ratio: 1;
  }
}
</style>
