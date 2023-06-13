<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update User')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateUser />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseUpdateUser from "@/components/user/widget/BaseUpdateUser";
export default {
  name: "CreateNewUserIndex",
  components: {
    BaseUpdateUser,
  },
  head() {
    return {
      title: this.$t("Update user"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
