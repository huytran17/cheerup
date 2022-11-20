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
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:item.full_name="{ item }">
            <div
              class="text-body-2 primary--text clickable"
              @click="$router.push(localePath(`/user/${item._id}`))"
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
                    @click="restoreDeletedUser(item)"
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
                    @click="deleteUser(item)"
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
                        SET_USER({ data: item });
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
                <span v-html="$t('Un-block comment')"></span>
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
                <span v-html="$t('Block comment')"></span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeleteUser"
      :title="`user ${user.email}`"
    />
  </div>
</template>

<script>
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
      is_open_hard_delete_dialog: false,
    };
  },

  methods: {
    async restoreDeletedUser(user) {
      try {
        const id = _.get(user, "_id");
        const title = _.get(user, "title");

        await this.RESTORE_USER({ id });
        this.$toast.success(`Restored user ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while restoring user`);
      }
    },

    async deleteUser(user) {
      try {
        const id = _.get(user, "_id");
        const title = _.get(user, "title");

        await this.DELETE_USER({ id });
        this.$toast.success(`Deleted user ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting user`);
      }
    },

    async hardDeleteUser() {
      try {
        const id = _.get(this.user, "_id");

        await this.HARD_DELETE_USER({ id });
        this.$toast.success(`Forever deleted user successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting user`);
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async unblockComment(user) {
      try {
        const id = _.get(user, "_id");
        const email = _.get(user, "email");

        await this.UNBLOCK_USER_COMMENT({ id });
        this.$toast.success(`Un-block comment for user ${email} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while un-blocking comment`);
      }
    },

    async blockComment(user) {
      try {
        const id = _.get(user, "_id");
        const email = _.get(user, "email");

        await this.BLOCK_USER_COMMENT({ id });
        this.$toast.success(`Block comment for user ${email} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while blocking comment`);
      }
    },
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_USERS();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>
