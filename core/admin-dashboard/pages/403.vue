<template>
  <div class="d-fle flex-column text-center mt-2">
    <div class="text-h5 error--text">
      <span class="app-title">{{ $t("403") }}</span>
    </div>
    <div class="text-h6 text-uppercase">
      <span class="app-title">{{ $t("Forbidden!") }}</span>
    </div>
    <div class="text-h6 text-uppercase">
      <span class="app-title">{{
        $t("You are not allowed to enter here.")
      }}</span>
    </div>
    <div>
      <v-img :src="image" :alt="$t('403')" contain :height="400"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forbidden",
  head() {
    return {
      title: this.$t("Forbidden"),
    };
  },
  data() {
    return {
      image: require("@/assets/images/app/wonder-guy.webp"),
    };
  },
};
</script>
