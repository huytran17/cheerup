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
  middleware: ["authenticate", "authenticated"],
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
