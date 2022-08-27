<template>
  <v-row class="mt-15 flex-column flex-column-reverse flex-md-row">
    <v-col cols="12" md="5">
      <div class="pt-5 pt-md-15">
        <h1 class="text-h4 mb-5" v-if="error.statusCode === 404">
          <span class="app-title" v-html="$t('This Page Was Lost')"></span>
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <p class="text-body-1 text-body-md-2">
          <span
            class="app-body"
            v-html="
              $t(
                'The Page You are looking for isn’t available. Try to search again or use the Go Back button below.'
              )
            "
          ></span>
        </p>
        <NuxtLink class="text-decoration-none black--text" to="/">
          <v-icon>mdi-arrow-left-circle</v-icon>
          <span v-html="$t('Home page')"></span>
        </NuxtLink>
      </div>
    </v-col>
    <v-col cols="12" md="7">
      <v-img :src="thumbnail" :lazy-src="thumbnail" contain></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
    thumbnail: {
      type: String,
      default: require("@/assets/images/app/404.png"),
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
.nuxt-link-active:hover,
.nuxt-link-active:hover > i {
  color: #ff2e55 !important;
}
h1 {
  font-size: 20px;
}
</style>
