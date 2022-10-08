<template>
  <BaseUpdateProfile v-if="has_user" />
  <BaseNoData v-else message="No data to show, please sign in" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseUpdateProfile from "@/components/user/BaseUpdateProfile";
import BaseNoData from "@/components/BaseNoData";
export default {
  name: "ProfileIndexPage",
  async asyncData({ store }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      const has_user = store.getters["auth/has_user"];
      if (!has_user) {
        return;
      }

      await store.dispatch("post-bookmark/COUNT_POST_BOOKMARKS");
    } catch (err) {
      console.error(err);
    }
  },
  components: {
    BaseUpdateProfile,
    BaseNoData,
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
};
</script>

<style></style>
