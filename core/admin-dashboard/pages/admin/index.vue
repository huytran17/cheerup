<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Admins Data')"></span>
        </div>

        <div class="d-flex justify-center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                icon
                @click="$router.push(localePath('/admin/new'))"
              >
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Create a new admin')"></span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseAdminTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseAdminTable from "@/components/admin/widget/BaseAdminTable";
export default {
  name: "AdminIndex",
  components: { BaseAdminTable },
  head() {
    return {
      title: this.$t("Admins"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
