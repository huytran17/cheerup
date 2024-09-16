<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Update Profile") }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateProfile />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseUpdateProfile from "@/components/profile/widget/BaseUpdateProfile";
export default {
  name: "ProfilePage",
  components: {
    BaseUpdateProfile,
  },
  head() {
    return {
      title: this.$t("Profile"),
    };
  },
};
</script>
