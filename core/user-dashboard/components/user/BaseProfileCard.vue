<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Your Profile')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div v-if="has_user" class="d-flex justify-center">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              :src="user_avatar"
              :lazy-src="user_avatar"
              :alt="me.full_name"
              contain
              max-width="100px"
              class="rounded-circle clickable"
              @click="$router.push(localePath(`/user/${me._id}`))"
            ></v-img>
          </template>
          <span v-html="$t('View your profile')"></span>
        </v-tooltip>
        <div
          :class="
            me.full_name
              ? 'small--text text-left pt-6'
              : 'small--text text-left'
          "
        >
          <span
            class="app-body clickable"
            @click="$router.push(localePath(`/user/${me._id}`))"
            >{{ me.full_name }}</span
          >
        </div>
      </div>
      <div v-else>
        <div class="small--text font-italic">
          <span class="app-body" v-html="$t('No data to display.')"></span>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn
            depressed
            tile
            color="primary"
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
import authMixins from "@/mixins/auth";
export default {
  name: "BaseProfileCard",
  mixins: [authMixins],
  data() {
    return {
      default_user_avatar: require("@/assets/images/default/user-avatar.png"),
    };
  },
  computed: {
    user_avatar() {
      return _.get(this.me, "avatar_url") || this.default_user_avatar;
    },
  },
};
</script>
