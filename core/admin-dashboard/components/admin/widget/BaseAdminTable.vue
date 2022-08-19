<template>
  <div class="app-container">
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="admins" :search="search">
          <template v-slot:item.full_name="{ item }">
            <div
              class="text-body-2 primary--text clickable"
              @click="$router.push(localePath(`/admin/${item._id}`))"
            >
              <span class="app-body">{{ item.full_name }}</span>
            </div>
          </template>

          <template v-slot:item.created_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatDate(item.created_at, "DD-MM-YYYY HH:mm")
              }}</span>
            </div>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatDate(item.updated_at, "DD-MM-YYYY HH:mm")
              }}</span>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div v-if="item.deleted_at">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="restoreDeletedAdmin(item)"
                  >
                    <v-icon small color="success">mdi-backup-restore</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Restore')"></span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="deleteAdmin(item)"
                  >
                    <v-icon small color="error">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Delete')"></span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="
                      () => {
                        SET_CATEGORY({ data: item });
                        is_open_hard_delete_dialog = true;
                      }
                    "
                  >
                    <v-icon small color="error">mdi-delete-off-outline</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Delete Forever')"></span>
              </v-tooltip>
            </div>
            <div v-if="item.is_auto_censorship_post">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="disableAutoCensorshipPost(item)"
                  >
                    <v-icon small color="error">mdi-note-off-outline</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Disable auto censorship post')"></span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="enableAutoCensorshipPost(item)"
                  >
                    <v-icon small color="success"
                      >mdi-note-check-outline</v-icon
                    >
                  </v-btn>
                </template>
                <span v-html="$t('Enable auto censorship post')"></span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import adminMixins from "@/mixins/admin";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseAdminTable",
  mixins: [adminMixins, systemMixins],
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Fullname",
            align: "start",
            value: "full_name",
          },
          {
            text: "Email",
            align: "start",
            value: "email",
          },
          {
            text: "Joined At",
            align: "start",
            value: "created_at",
          },
          {
            text: "Last Updated At",
            align: "start",
            value: "updated_at",
          },
          {
            text: "Actions",
            align: "start",
            value: "actions",
          },
        ];
      },
    },
  },
  data() {
    return {
      search: "",
      initial_loading: true,
    };
  },

  methods: {
    async disableAutoCensorshipPost(admin) {
      try {
        const id = _.get(admin, "_id");
        const email = _.get(admin, "email");

        await this.DISABLE_AUTO_CENSORSHIP_POST({ id });
        this.$toast.success(
          `Disable auto censorship for admin ${email} successfully`
        );
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while disabling auto censorship`);
      }
    },

    async enableAutoCensorshipPost(admin) {
      try {
        const id = _.get(admin, "_id");
        const email = _.get(admin, "email");

        await this.ENABLE_AUTO_CENSORSHIP_POST({ id });
        this.$toast.success(
          `Enable auto censorship for admin ${email} successfully`
        );
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while enabling auto censorship`);
      }
    },

    async restoreDeletedAdmin(admin) {
      try {
        const id = _.get(admin, "_id");
        const title = _.get(admin, "title");

        await this.RESTORE_ADMIN({ id });
        this.$toast.success(`Restored admin ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while restoring admin`);
      }
    },

    async deleteAdmin(admin) {
      try {
        const id = _.get(admin, "_id");
        const title = _.get(admin, "title");

        await this.DELETE_ADMIN({ id });
        this.$toast.success(`Deleted admin ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting admin`);
      }
    },

    async hardDeleteAdmin() {
      try {
        const id = _.get(this.admin, "_id");
        const title = _.get(this.admin, "title");

        await this.HARD_DELETE_ADMIN({ id });
        this.$toast.success(`Forever deleted admin ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting admin`);
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_ADMINS();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>
