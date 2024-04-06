<template>
  <v-row>
    <v-col cols="12">
      <v-form>
        <BaseUpdateClientData />
        <BaseUpdateSystemConfigurationData />

        <v-row>
          <v-col cols="12" class="d-flex justify-end pr-0">
            <v-btn depressed color="primary" @click="updateSystemConfiguration">
              <span v-html="$t('Update')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import systemConfigurationMixins from "@/mixins/system-configuration";
import BaseCircularLoader from "@/components/loaders/BaseCircularLoader";
import BaseUpdateClientData from "@/components/system-configuration/widget/BaseUpdateClientData";
import BaseUpdateSystemConfigurationData from "@/components/system-configuration/widget/BaseUpdateSystemConfigurationData";

export default {
  name: "BaseUpdateSystemConfiguration",
  mixins: [systemConfigurationMixins],
  components: {
    BaseCircularLoader,
    BaseUpdateClientData,
    BaseUpdateSystemConfigurationData,
  },

  methods: {
    async updateSystemConfiguration() {
      try {
        await this.UPDATE_SYSTEM_CONFIGURATION({
          data: this.system_configuration,
        });

        this.$toast.success(
          this.$t("Updated system configuration successfully")
        );
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating system configuration")
        );
      }
    },
  },

  async fetch() {
    try {
      await this.GET_LATEST_SYSTEM_CONFIGURATION();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
