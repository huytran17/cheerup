<template>
  <div class="d-fle flex-column text-center mt-2">
    <div class="text-h5 error--text">
      <span class="app-title" v-html="$t('400')"></span>
    </div>
    <div class="text-h6 text-uppercase">
      <span class="app-title" v-html="$t('Bad Request!')"></span>
    </div>
    <div class="text-h6 text-uppercase">
      <span
        class="app-title"
        v-html="$t('Can not process invalid data.')"
      ></span>
    </div>
    <div>
      <v-img :src="image" :alt="$t('400')" contain :height="400"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "BadRequest",
  head() {
    return {
      title: this.$t("Bad request"),
    };
  },
  data() {
    return {
      image: require("@/assets/images/app/thinking-man.png"),
    };
  },
};
</script>
