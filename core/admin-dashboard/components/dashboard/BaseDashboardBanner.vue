<template>
  <v-row class="d-flex px-4 pt-4 pb-2">
    <v-col cols="12" md="9" class="d-flex flex-column">
      <div
        class="text-body-1 text-md-h6 primary--text text-center text-md-left"
      >
        <span
          class="app-title"
          v-html="
            $t(`Welcome, {admin_name}!`, {
              admin_name: admin_data.full_name,
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
    </v-col>
    <v-col cols="12" md="3">
      <v-img
        :src="welcome_image"
        :lazy-src="welcome_image"
        :alt="$t('welcome admin')"
        contain
        max-width="180px"
        class="mx-auto"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "BaseDashboardBanner",
  props: {
    admin_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      welcome_image: require("@/assets/images/app/admin-welcome.png"),
    };
  },
};
</script>

<style></style>
