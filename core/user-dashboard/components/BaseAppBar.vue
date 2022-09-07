<template>
  <v-app-bar elevation="0" color="white">
    <div class="d-flex flex-column flex-sm-row justify-space-between w-100">
      <div class="d-flex flex-row flex-sm-column justify-center pt-10 pt-sm-0">
        <v-img
          :src="logo_url"
          :lazy-src="logo_url"
          alt="logo"
          max-width="100px"
          contain
        ></v-img>
      </div>
      <div class="d-flex flex-column justify-center pt-4 pt-sm-0">
        <v-text-field
          :placeholder="$t('Search post by title...')"
          filled
          rounded
          dense
          hide-details
          append-icon="mdi-magnify"
        ></v-text-field>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "BaseAppBar",
  data() {
    return {
      logo_url: require("@/assets/images/app/small-logo.jpg"),
    };
  },
};
</script>

<style scoped>
:deep(.v-toolbar__content) {
  padding: 4px 0 !important;
}
:deep(.v-input__slot) {
  padding-right: 18px !important;
}
:deep(.mdi-magnify) {
  cursor: pointer;
}
</style>
