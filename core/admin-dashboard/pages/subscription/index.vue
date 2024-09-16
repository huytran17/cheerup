<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Subscriptions Data") }}</h3>
        </div>

        <div class="toolbar">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="table-search-input"
            color="brick"
            hide-details
            outlined
            single-line
            dense
            clearable
            :label="$t('Search')"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseSubscriptionTable :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseSubscriptionTable from "@/components/subscription/widget/BaseSubscriptionTable";
export default {
  name: "SubscriptionPage",
  components: { BaseSubscriptionTable },
  head() {
    return {
      title: this.$t("Subscriptions"),
    };
  },
  data() {
    return {
      search: "",
      ADMIN_TYPES,
    };
  },
};
</script>
