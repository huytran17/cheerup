<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Create New User") }}</h3>
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
  name: "CreateNewUserPage",
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
