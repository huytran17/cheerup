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
  middleware: ["authenticate"],
  components: {
    BaseUpdateProfile,
    BaseNoData,
  },
  head() {
    return {
      title: this.$t("Profile"),
    };
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
};
</script>
