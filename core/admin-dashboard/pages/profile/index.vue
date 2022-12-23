<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update Profile')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateProfile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseUpdateProfile from "@/components/profile/widget/BaseUpdateProfile";
export default {
  name: "CreateNewAdminIndex",
  components: {
    BaseUpdateProfile,
  },
};
</script>
