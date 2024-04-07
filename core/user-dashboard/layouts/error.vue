<template>
  <div v-if="error.statusCode === 404">
    <div class="d-fle flex-column text-center mt-2">
      <div class="text-h5 error--text">
        <span class="app-title" v-html="$t('404')"></span>
      </div>
      <div class="text-h6 text-uppercase">
        <span class="app-title" v-html="$t('Not found!')"></span>
      </div>
      <div class="text-h6 text-uppercase">
        <span
          class="app-title"
          v-html="
            $t(
              'The page you are looking for might be removed or temporary unavailable.'
            )
          "
        ></span>
      </div>
      <div>
        <v-img :src="image" :alt="$t('404')" contain :height="400"></v-img>
      </div>
    </div>
  </div>
  <h1 v-else>
    {{ otherError }}
  </h1>
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
  },
  data() {
    return {
      pageNotFound: this.$t("404 Not Found"),
      otherError: this.$t("An error occurred"),
      image: require("@/assets/images/app/student-girl.webp"),
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

<style lang="scss" scoped>
h1 {
  font-size: toRem(20);
}
</style>
