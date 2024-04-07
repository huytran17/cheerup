<template>
  <div
    class="d-flex flex-column flex-md-row px-4 pt-4 card-box-shadow rounded-lg white"
  >
    <div class="mb-4 mb-md-0">
      <div
        class="text-body-1 text-md-h6 primary--text text-center text-md-left"
      >
        <span
          class="app-title"
          v-html="
            $t(`Welcome, {text}!`, {
              text: me.full_name,
            })
          "
        ></span>
      </div>

      <div class="text-body-2 text-md-body-1 text-center text-md-left">
        <span
          class="app-body"
          v-html="
            $t(
              `How is your day? Let's create something of value and bring it to everyone 😉!`
            )
          "
        ></span>
      </div>
    </div>
    <v-img
      :src="welcome_image"
      :lazy-src="welcome_image"
      :alt="$t('welcome admin')"
      contain
      max-width="180px"
      class="mx-auto"
    ></v-img>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseDashboardBanner",
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),
  },
  data() {
    return {
      welcome_image: require("@/assets/images/app/admin-welcome.webp"),
    };
  },
};
</script>
