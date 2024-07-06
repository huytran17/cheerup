<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :headers="headers" :items="comments" :search="search">
        <template v-slot:item.content="{ item }">
          <div class="text-body-2">
            <span v-html="item.content"></span>
          </div>
        </template>

        <template v-slot:item.user="{ item }">
          <div class="text-body-2">
            <span>{{ item.user?.full_name }}</span>
          </div>
        </template>

        <template v-slot:item.post="{ item }">
          <div class="text-body-2" @click="goToPost(item)">
            <span class="primary--text clickable">{{ item.post?.title }}</span>
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
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                small
                @click="
                  () => {
                    SET_COMMENT({ data: item });
                    is_open_hard_delete_dialog = true;
                  }
                "
              >
                <v-icon small color="error">mdi-delete-off-outline</v-icon>
              </v-btn>
            </template>
            {{ $t("Delete Forever") }}
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeleteComment"
      :title="`comment ${comment.content}`"
    />
  </v-row>
</template>

<script>
import { get } from "lodash";
import { ADMIN_TYPES } from "@/constants";
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
    search: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      is_open_hard_delete_dialog: false,
      ADMIN_TYPES,
    };
  },

  methods: {
    goToPost(post) {
      const url = new URL(`${process.env.USER_DASHBOARD_URL}/post/${post._id}`);
      window.open(url, "__blank");
    },

    async hardDeleteComment() {
      try {
        const id = get(this.comment, "_id");
        const content = get(this.comment, "content");

        await this.HARD_DELETE_COMMENT({ id });
        this.$toast.success(
          this.$t(`Forever deleted comment ${content} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while deleting comment"));
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },
  },

  async fetch() {
    try {
      await this.GET_COMMENTS();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
