<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :page="user_pagination.current_page"
        :items-per-page="user_pagination.per_page"
        :multi-sort="true"
        :server-items-length="user_pagination.total"
        @update:items-per-page="tableUpdateItemsPerPage"
        @update:page="tableUpdatePage"
      >
        <template v-slot:item.full_name="{ item }">
          <div
            class="text-body-2 primary--text clickable"
            @click="$router.push(localePath(`/user/${item._id}`))"
          >
            <span>{{ item.full_name }}</span>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <div v-if="item.is_online" class="text-body-2">
            <v-chip color="green" text-color="white">
              {{ $t("Online") }}
            </v-chip>
          </div>
          <div v-else-if="item.last_online_at" class="text-body-2">
            <v-chip color="red" text-color="white">
              <span>{{ formatLocaleDate(item.last_online_at) }}</span>
            </v-chip>
          </div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div class="text-body-2">
            <span>{{ formatLocaleDate(item.created_at) }}</span>
          </div>
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div class="text-body-2">
            <span>{{ formatLocaleDate(item.updated_at) }}</span>
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
                  @click="restoreDeletedUser(item)"
                >
                  <v-icon small color="success">mdi-backup-restore</v-icon>
                </v-btn>
              </template>
              {{ $t("Restore") }}
            </v-tooltip>
          </div>
          <div v-else v-component-roles="[ADMIN_TYPES.OWNER]">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="deleteUser(item)"
                >
                  <v-icon small color="error">mdi-trash-can-outline</v-icon>
                </v-btn>
              </template>
              {{ $t("Delete") }}
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
                      SET_USER({ data: item });
                      is_open_hard_delete_dialog = true;
                    }
                  "
                >
                  <v-icon small color="error">mdi-delete-off-outline</v-icon>
                </v-btn>
              </template>
              {{ $t("Delete Forever") }}
            </v-tooltip>
          </div>
          <div v-if="item.is_blocked_comment">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="unblockComment(item)"
                >
                  <v-icon small color="success"
                    >mdi-comment-text-outline</v-icon
                  >
                </v-btn>
              </template>
              {{ $t("Un-block comment") }}
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
                  @click="blockComment(item)"
                >
                  <v-icon small color="error">mdi-comment-off-outline</v-icon>
                </v-btn>
              </template>
              {{ $t("Block comment") }}
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
              {{ $t("Reset the number of failed login attempts") }}
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-col>
    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeleteUser"
      :title="`user ${user.email}`"
    />
  </v-row>
</template>

<script>
import { get } from "lodash";
import { ADMIN_TYPES, LOGIN_FAILED } from "@/constants";
import userMixins from "@/mixins/user";
import systemMixins from "@/mixins/system";

import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";

export default {
  name: "BaseUserTable",
  mixins: [userMixins, systemMixins],
  compnents: {
    BaseHardDeleteDialog,
  },
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
            text: "Status",
            align: "start",
            value: "status",
            sortable: false,
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
    search: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      is_open_hard_delete_dialog: false,
      ADMIN_TYPES,
      LOGIN_FAILED,
    };
  },

  methods: {
    async tableUpdatePage(data) {
      try {
        await this.GET_USERS_PAGINATED({
          page: data,
          entries_per_page: this.user_pagination.per_page,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async tableUpdateItemsPerPage(data) {
      try {
        await this.GET_USERS_PAGINATED({
          page: 1,
          entries_per_page: data,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async resetLoginFailedTimes(user) {
      try {
        await this.RESET_USER_LOGIN_FAILED_TIMES({ id: user._id });

        this.$toast.success(
          this.$t(`Successfully reset the number of failed login attempts`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t(
            `Encountered error while reseting the number of failed login attempts`
          )
        );
      }
    },

    async restoreDeletedUser(user) {
      try {
        const id = get(user, "_id");
        const title = get(user, "title");

        await this.RESTORE_USER({ id });
        this.$toast.success(this.$t(`Restored user ${title} successfully`));
        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while restoring user"));
      }
    },

    async deleteUser(user) {
      try {
        const id = get(user, "_id");
        const title = get(user, "title");

        await this.DELETE_USER({ id });
        this.$toast.success(this.$t(`Deleted user ${title} successfully`));
        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while deleting user"));
      }
    },

    async hardDeleteUser() {
      try {
        const id = get(this.user, "_id");

        await this.HARD_DELETE_USER({ id });
        this.$toast.success(this.$t("Forever deleted user successfully"));
        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while hard deleting user")
        );
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async unblockComment(user) {
      try {
        const id = get(user, "_id");
        const email = get(user, "email");

        await this.UNBLOCK_USER_COMMENT({ id });
        this.$toast.success(
          this.$t(`Un-block comment for user ${email} successfully`)
        );
        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while un-blocking comment")
        );
      }
    },

    async blockComment(user) {
      try {
        const id = get(user, "_id");
        const email = get(user, "email");

        await this.BLOCK_USER_COMMENT({ id });
        this.$toast.success(
          this.$t(`Block comment for user ${email} successfully`)
        );
        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while blocking comment"));
      }
    },
  },

  async fetch() {
    try {
      await this.GET_USERS_PAGINATED({
        page: this.user_pagination.current_page,
        entries_per_page: this.user_pagination.per_page,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
