<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Admins Data") }}</h3>
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
                @click="$router.push(localePath('/admin/new'))"
              >
                <v-icon small>mdi-plus</v-icon>
                <span>{{ $t("Add") }}</span>
              </v-btn>
            </template>
            {{ $t("Create a new admin") }}
          </v-tooltip>
          <v-tooltip v-if="system_configuration.admin_excel_template_url" left>
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
                :href="system_configuration.admin_excel_template_url"
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
                @change="batchUploadAdmins"
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
              <v-menu
                v-bind="attrs"
                v-on="on"
                offset-y
                close-on-click
                left
                tile
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="brick"
                    height="auto"
                    width="auto"
                    class="px-2"
                    icon
                    outlined
                    tile
                  >
                    <v-icon small>mdi-export</v-icon>
                    {{ $t("Export CSV") }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(option, index) in export_options"
                    :key="`export-admins-${index}`"
                  >
                    <v-list-item-title class="clickable" @click="option.action">
                      <span>{{ option.title }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            {{ $t("Export CSV") }}
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseAdminTable :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES, MIME_TYPES } from "@/constants";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { exportFromJSON } from "@/config/export-from-json";
import BaseAdminTable from "@/components/admin/widget/BaseAdminTable";
export default {
  name: "AdminPage",
  components: { BaseAdminTable },
  head() {
    return {
      title: this.$t("Admins"),
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
      me: "auth/me",
      admin_pagination: "admin/pagination",
      admins: "admin/admins",
    }),

    export_options() {
      return [
        {
          title: `${this.$t("Current Page")} (${this.admins.length})`,
          action: this.exportToXls,
        },
        {
          title: `${this.$t("All")} (${this.admin_pagination.total})`,
          action: this.exportAllToXls,
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
      BATCH_UPLOAD_ADMINS: "admin/BATCH_UPLOAD_ADMINS",
      GET_ADMINS_PAGINATED: "admin/GET_ADMINS_PAGINATED",
      GET_ADMINS: "admin/GET_ADMINS",
    }),

    ...mapMutations({
      SET_ADMINS: "admin/SET_ADMINS",
    }),

    async batchUploadAdmins(file) {
      try {
        await this.BATCH_UPLOAD_ADMINS({ file });

        const admins = await this.GET_ADMINS_PAGINATED({
          page: this.admin_pagination.current_page,
          entries_per_page: this.admin_pagination.per_page,
        });

        const filtered_admins = admins.filter(
          (admin) => admin._id !== this.me._id
        );

        this.SET_ADMINS({ data: filtered_admins });
      } catch (error) {
        console.error(error);
      }
    },

    exportToXls() {
      try {
        exportFromJSON({ data: this.admins, fileName: "admins-data" });
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Encountered error while exporting admins`));
      }
    },

    async exportAllToXls() {
      try {
        const admins = await this.GET_ADMINS({ keep_in_store: false });
        exportFromJSON({ data: admins, fileName: "admins-data" });
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Encountered error while exporting admins`));
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
