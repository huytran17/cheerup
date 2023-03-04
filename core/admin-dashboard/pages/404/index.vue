<template>
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
</template>

<script>
export default {
  name: "403",
  data() {
    return {
      image: require("@/assets/images/app/student-girl.png"),
    };
  },
};
</script>

<style></style>
