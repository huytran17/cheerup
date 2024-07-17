<template>
  <v-row class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
    <v-col cols="12" class="py-0">
      <div class="text-body-1 brick--text">
        <h3 class="app-title">{{ $t("System Configurations") }}</h3>
      </div>
    </v-col>

    <v-col cols="12" class="pt-6">
      <v-checkbox
        hide-details
        class="mt-0"
        color="brick"
        :input-value="system_configuration.is_blocked_comment"
        :label="$t('Block comment for all posts')"
        :true-value="true"
        :false-value="false"
        @change="
          updateSystemConfigurationObject({
            path: 'is_blocked_comment',
            data: $event,
          })
        "
      ></v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
import systemConfigurationMixins from "@/mixins/system-configuration";

export default {
  name: "BaseUpdateSystemConfigurationData",
  mixins: [systemConfigurationMixins],
};
</script>
