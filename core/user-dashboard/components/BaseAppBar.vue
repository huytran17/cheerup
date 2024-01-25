<template>
  <div class="d-flex flex-column justify-space-between w-100">
    <v-img
      :src="logo_url"
      :lazy-src="logo_url"
      alt="logo"
      contain
      :max-width="is_mobile ? '220px' : '320px'"
      width="inherit"
      class="mx-auto clickable"
      @click="goToHomePage"
    ></v-img>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import systemMixins from "@/mixins/system";
export default {
  name: "BaseAppBar",
  mixins: [systemMixins],
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
