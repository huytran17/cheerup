<template>
  <div class="text-body-2 text-center pt-2">
    <span class="app-body" v-html="$t('Redirecting...')"></span>
  </div>
</template>

<script>
export default {
  name: "Redirect",
  layout: "public",
  fetch() {
    const access_token = this.$route.query.token;
    localStorage.setItem("access_token", access_token);

    this.$router.push(this.localePath("/"));
  },
};
</script>
