<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Update System Configuration") }}</h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mw-100 mx-auto mr-0">
      <v-col cols="12">
        <BaseUpdateSystemConfiguration />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseUpdateSystemConfiguration from "@/components/system-configuration/widget/BaseUpdateSystemConfiguration";
export default {
  name: "SystemConfigurationIndex",
  components: { BaseUpdateSystemConfiguration },
  head() {
    return {
      title: this.$t("System configuration"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
