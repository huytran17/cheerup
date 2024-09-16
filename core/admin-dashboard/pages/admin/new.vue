<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Create New Admin") }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreateAdmin />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseCreateAdmin from "@/components/admin/widget/BaseCreateAdmin";
export default {
  name: "CreateNewAdminPage",
  components: {
    BaseCreateAdmin,
  },
  head() {
    return {
      title: this.$t("Create new admin"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
