<template>
  <div>
    <v-app-bar elevation="0" color="white">
      <div class="d-flex justify-center w-100">
        <v-icon small color="black" class="clickable icon__font--medium mr-2"
          >mdi-facebook</v-icon
        >
        <v-icon small color="black" class="clickable icon__font--medium mr-2"
          >mdi-instagram</v-icon
        >
        <v-icon small color="black" class="clickable icon__font--medium"
          >mdi-twitter</v-icon
        >
      </div>
    </v-app-bar>

    <div class="d-flex flex-column justify-space-between w-100 pt-2">
      <div class="d-flex flex-column pb-4">
        <v-img
          :src="logo_url"
          :lazy-src="logo_url"
          alt="logo"
          max-width="140px"
          contain
          class="mx-auto"
        ></v-img>
        <div class="text-caption text-uppercase text-center pt-2 grey--text">
          <span class="app-body" v-html="$t('App Name')"></span>
        </div>
      </div>
      <div class="d-flex flex-column w-100">
        <div class="mx-auto">
          <v-text-field
            id="search_box"
            :placeholder="$t('Search post by title...')"
            filled
            rounded
            dense
            hide-details
            append-icon="mdi-magnify"
            class="w-100"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAppBar",
  data() {
    return {
      logo_url: require("@/assets/images/app/large-logo.jpg"),
    };
  },
};
</script>

<style scoped>
:deep(.v-toolbar__content) {
  padding: 4px 0 !important;
}

:deep(.mdi-magnify) {
  cursor: pointer;
}
</style>
