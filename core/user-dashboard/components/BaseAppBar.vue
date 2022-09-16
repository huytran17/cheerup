<template>
  <div class="pt-4">
    <div class="d-flex flex-column justify-space-between w-100 pt-2">
      <div class="pb-4">
        <v-img
          :src="logo_url"
          :lazy-src="logo_url"
          alt="logo"
          max-width="319px"
          contain
          class="mx-auto clickable"
          @click="$router.push(localePath('/'))"
        ></v-img>
      </div>
      <div class="d-flex flex-column w-100 pt-4">
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
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
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAppBar",
  data() {
    return {
      logo_url: require("@/assets/images/app/logo.png"),
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
