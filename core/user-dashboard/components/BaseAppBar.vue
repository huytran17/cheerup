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
          @click="goToHomePage"
        ></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "BaseAppBar",
  data() {
    return {
      logo_url: `${process.env.BASE_URL}/logo.png`,
    };
  },
  methods: {
    ...mapMutations({
      SET_POST_SEARCH_QUERY: "post/SET_POST_SEARCH_QUERY",
    }),

    goToHomePage() {
      this.SET_POST_SEARCH_QUERY({ data: "" });
      this.$router.push(this.localePath("/"));
    },
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
