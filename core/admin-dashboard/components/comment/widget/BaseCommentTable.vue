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
        <v-data-table :headers="headers" :items="comments" :search="search">
          <template v-slot:item.user="{ item }">
            <div v-if="item.user" class="text-body-2">
              <span class="app-body">{{ item.user.full_name }}</span>
            </div>
          </template>

          <template v-slot:item.post="{ item }">
            <div v-if="item.post" class="text-body-2">
              <span class="app-body">{{ item.post.title }}</span>
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
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    () => {
                      SET_COMMENT({ data: item });
                      is_open_hard_delete_dialog = true;
                    }
                  "
                >
                  <v-icon color="error">mdi-delete-off-outline</v-icon>
                </v-btn>
              </template>
              <span v-html="$t('Delete Forever')"></span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      :data="comment"
      :closeDialog="() => (is_open_hard_delete_dialog = false)"
      :confirmDelete="() => hardDeleteComment()"
    />
  </div>
</template>

<script>
import commentMixins from "@/mixins/comment";
import systemMixins from "@/mixins/system";

import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";

export default {
  name: "BaseCommentTable",
  mixins: [commentMixins, systemMixins],
  components: {
    BaseHardDeleteDialog,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Content",
            align: "start",
            value: "content",
          },
          {
            text: "Created By",
            align: "start",
            value: "user",
          },
          {
            text: "On Post",
            align: "start",
            value: "post",
          },
          {
            text: "Created At",
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
    async hardDeleteComment() {
      try {
        const id = _.get(this.comment, "_id");
        const content = _.get(this.comment, "content");

        await this.HARD_DELETE_COMMENT({ id });
        this.$toast.success(`Forever deleted comment ${content} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting comment`);
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_COMMENTS();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>