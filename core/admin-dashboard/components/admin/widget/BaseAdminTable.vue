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
          <template v-slot:item.avatar="{ item }">
            <v-img
              v-if="item.avatar_url"
              :lazy-src="item.avatar_url"
              :src="item.avatar_url"
              :alt="item.full_name"
              :width="35"
              :height="35"
              contain
              class="rounded-circle"
            ></v-img>
            <avatar
              v-else-if="item.full_name"
              :username="item.full_name"
              :name="item.full_name"
              :size="32"
            ></avatar>
          </template>
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

          <template v-slot:item.status="{ item }">
            <div v-if="item.is_online" class="text-body-2">
              <v-chip color="green" text-color="white">
                <span v-html="$t('Online')"></span>
              </v-chip>
            </div>
            <div v-else-if="item.last_online_at" class="text-body-2">
              <v-chip color="red" text-color="white">
                <span>{{
                  formatDate(item.last_online_at, "DD-MM-YYYY HH:mm")
                }}</span>
              </v-chip>
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
            </div>
            <div v-if="item.login_failed_times >= LOGIN_FAILED.MAX">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="resetLoginFailedTimes(item)"
                  >
                    <v-icon small color="error">mdi-restore-alert</v-icon>
                  </v-btn>
                </template>
                <span
                  v-html="$t('Reset the number of failed login attempts')"
                ></span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeleteAdmin"
      :title="`admin ${admin.email}`"
    />
  </div>
</template>

<script>
import { ADMIN_TYPES, LOGIN_FAILED } from "@/constants";
import adminMixins from "@/mixins/admin";
import authMixins from "@/mixins/auth";
import systemMixins from "@/mixins/system";
import Avatar from "vue-avatar";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";

export default {
  name: "BaseAdminTable",
  mixins: [adminMixins, systemMixins, authMixins],
  components: {
    Avatar,
    BaseHardDeleteDialog,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "",
            align: "center",
            value: "avatar",
            width: 35,
          },
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
            text: "Status",
            align: "start",
            value: "status",
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
      is_open_hard_delete_dialog: false,
      ADMIN_TYPES,
      LOGIN_FAILED,
    };
  },

  methods: {
    async resetLoginFailedTimes(admin) {
      try {
        await this.RESET_ADMIN_LOGIN_FAILED_TIMES({ id: admin._id });

        this.$toast.success(
          this.$t("Successfully reset the number of failed login attempts")
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t(
            "Encountered error while resetting the number of failed login attempts"
          )
        );
      }
    },

    async restoreDeletedAdmin(admin) {
      try {
        const { _id, full_name } = admin;

        await this.RESTORE_ADMIN({ id: _id });

        this.$toast.success(
          this.$t(`Restored admin ${full_name} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Encountered error while restoring admin`));
      }
    },

    async deleteAdmin(admin) {
      try {
        const { _id, full_name } = admin;

        await this.DELETE_ADMIN({ id: _id });

        this.$toast.success(this.$t(`Deleted admin ${full_name} successfully`));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Encountered error while deleting admin`));
      }
    },

    async hardDeleteAdmin() {
      try {
        const { _id, full_name } = this.admin;

        await this.HARD_DELETE_ADMIN({ id: _id });

        this.$toast.success(
          this.$t(`Forever deleted admin ${full_name} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t(`Encountered error while hard deleting admin`)
        );
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },
  },

  async fetch() {
    try {
      const admins = await this.GET_ADMINS();

      const filtered_admins = admins.filter(
        (admin) => admin._id !== this.me._id
      );

      this.SET_ADMINS({ data: filtered_admins });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
