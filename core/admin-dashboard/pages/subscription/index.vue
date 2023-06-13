<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Subscriptions Data')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseSubscriptionTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseSubscriptionTable from "@/components/subscription/widget/BaseSubscriptionTable";
export default {
  name: "SubscriptionIndex",
  components: { BaseSubscriptionTable },
  head() {
    return {
      title: this.$t("Subscriptions"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
