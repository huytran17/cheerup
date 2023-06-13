<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Create New User')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreateUser />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseCreateUser from "@/components/user/widget/BaseCreateUser";
export default {
  name: "CreateNewUserIndex",
  components: {
    BaseCreateUser,
  },
  head() {
    return {
      title: this.$t("Create new user"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
