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
                color="brick"
                icon
                @click="$router.push(localePath('/admin/new'))"
              >
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Create a new admin')"></span>
          </v-tooltip>
          <v-tooltip v-if="system_configuration.admin_excel_template_url" left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                icon
                :href="system_configuration.admin_excel_template_url"
                target="_blank"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Download batch template')"></span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-file-input
                id="batch_upload_admin"
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                class="d-none"
                @change="batchUploadAdmin"
              ></v-file-input>
              <v-btn v-bind="attrs" v-on="on" color="brick" icon download>
                <label for="batch_upload_admin">
                  <v-icon>mdi-upload</v-icon>
                </label>
              </v-btn>
            </template>
            <span v-html="$t('Upload batch data')"></span>
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
import { mapActions, mapGetters } from "vuex";
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

  computed: {
    ...mapGetters({
      system_configuration: "system-configuration/system_configuration",
    }),
  },

  methods: {
    ...mapActions({
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
      GET_ADMINS: "admin/GET_ADMINS",
      BATCH_UPLOAD_ADMIN: "admin/BATCH_UPLOAD_ADMIN",
    }),

    async batchUploadAdmin(file) {
      try {
        await this.BATCH_UPLOAD_ADMIN({ file });
        await this.GET_ADMINS();
      } catch (error) {
        console.error(error);
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
