<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Create New Admin')"></span>
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
  name: "CreateNewAdminIndex",
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
