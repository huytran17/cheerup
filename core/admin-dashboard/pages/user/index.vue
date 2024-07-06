<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Users Data") }}</h3>
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
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                height="auto"
                class="px-2"
                outlined
                tile
                @click="$router.push(localePath('/user/new'))"
              >
                <v-icon small>mdi-plus</v-icon>
                <span>{{ $t("Add") }}</span>
              </v-btn>
            </template>
            {{ $t("Create a new user") }}
          </v-tooltip>
          <v-tooltip v-if="system_configuration.user_excel_template_url" left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                target="_blank"
                height="auto"
                width="auto"
                class="px-2"
                icon
                outlined
                tile
                :href="system_configuration.user_excel_template_url"
              >
                <v-icon small>mdi-download</v-icon>
                <span>{{ $t("Download batch template") }}</span>
              </v-btn>
            </template>
            {{ $t("Download batch template") }}
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-file-input
                id="batch_upload_admin"
                :accept="MIME_TYPES.EXCEL"
                class="d-none"
                @change="batchUploadUsers"
              ></v-file-input>
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                width="auto"
                height="auto"
                class="px-2"
                download
                outlined
                tile
              >
                <label for="batch_upload_admin">
                  <v-icon small>mdi-upload</v-icon>
                  <span>{{ $t("Upload batch data") }}</span>
                </label>
              </v-btn>
            </template>
            {{ $t("Upload batch data") }}
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                target="_blank"
                height="auto"
                width="auto"
                class="px-2"
                icon
                outlined
                tile
              >
                <v-icon small>mdi-export</v-icon>
                <span>{{ $t("Export CSV") }}</span>
              </v-btn>
            </template>
            {{ $t("Export CSV") }}
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUserTable :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES, MIME_TYPES } from "@/constants";
import { mapActions, mapGetters } from "vuex";
import BaseUserTable from "@/components/user/widget/BaseUserTable";
export default {
  name: "UserIndex",
  components: { BaseUserTable },

  head() {
    return {
      title: this.$t("Users"),
    };
  },

  data() {
    return {
      search: "",
      ADMIN_TYPES,
      MIME_TYPES,
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
      GET_USERS: "user/GET_USERS",
      BATCH_UPLOAD_USERS: "user/BATCH_UPLOAD_USERS",
    }),

    async batchUploadUsers(file) {
      try {
        await this.BATCH_UPLOAD_USERS({ file });
        await this.GET_USERS();
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
