<template>
  <v-row v-if="!loading">
    <v-col cols="12" class="pl-0">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <BaseUpdateAdminData />
        <BaseUpdateClientData />
        <BaseUpdateSystemConfigurationData />

        <v-row>
          <v-col cols="12" class="d-flex justify-end pr-0">
            <v-btn
              depressed
              color="primary"
              :disabled="!form_valid"
              @click="updateSystemConfiguration"
            >
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
import BaseUpdateAdminData from "@/components/system-configuration/widget/BaseUpdateAdminData";
import BaseUpdateClientData from "@/components/system-configuration/widget/BaseUpdateClientData";
import BaseUpdateSystemConfigurationData from "@/components/system-configuration/widget/BaseUpdateSystemConfigurationData";

export default {
  name: "BaseUpdateSystemConfiguration",
  mixins: [systemConfigurationMixins],
  components: {
    BaseCircularLoader,
    BaseUpdateAdminData,
    BaseUpdateClientData,
    BaseUpdateSystemConfigurationData,
  },
  data() {
    return {
      loading: false,
      form_valid: false,
    };
  },

  methods: {
    async updateSystemConfiguration() {
      try {
        await this.UPDATE_SYSTEM_CONFIGURATION({
          data: this.system_configuration,
        });
        this.$toast.success("Updated system configuration successfully");
      } catch (error) {
        console.error(error);
        this.$toast.error(
          "Encountered error while updating system configuration"
        );
      }
    },
  },

  async fetch() {
    try {
      this.loading = true;
      await this.GET_LATEST_SYSTEM_CONFIGURATION();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
