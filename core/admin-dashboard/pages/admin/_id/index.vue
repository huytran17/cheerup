<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Update Admin") }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateAdmin />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseUpdateAdmin from "@/components/admin/widget/BaseUpdateAdmin";
export default {
  name: "CreateNewAdminIndex",
  components: {
    BaseUpdateAdmin,
  },
  head() {
    return {
      title: this.$t("Update admin infomation"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
