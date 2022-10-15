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
    } catch (err) {
      console.log(err);
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
