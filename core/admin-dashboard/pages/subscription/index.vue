<template>
  <v-container>
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
  </v-container>
</template>

<script>
import BaseSubscriptionTable from "@/components/subscription/widget/BaseSubscriptionTable";
export default {
  name: "SubscriptionIndex",
  components: { BaseSubscriptionTable },
};
</script>
