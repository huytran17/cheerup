<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Sponsor')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6 d-flex justify-center">
      <v-img
        :src="advertising_image"
        :lazy-src="advertising_image"
        :alt="$t('sponsor')"
        max-width="257px"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAdvertisingCard",
  data() {
    return {
      advertising_image: require("@/assets/images/default/sponsor.jpg"),
    };
  },
};
</script>

<style></style>
