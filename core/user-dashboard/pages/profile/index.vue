<template>
  <BaseUpdateProfile />
</template>

<script>
import { mapGetters } from "vuex";
import BaseUpdateProfile from "@/components/user/BaseUpdateProfile";
export default {
  name: "ProfileIndexPage",
  components: {
    BaseUpdateProfile,
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
  fetch() {
    if (!this.has_user) {
      this.$router.push(this.localePath("/"));
    }
  },
};
</script>

<style></style>
