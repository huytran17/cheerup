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
        <v-data-table :headers="headers" :items="posts" :search="search">
          <template v-slot:item.title="{ item }">
            <div
              class="text-body-2 primary--text clickable"
              @click="$router.push(localePath(`/post/${item._id}`))"
            >
              <span class="app-body">{{ item.title }}</span>
            </div>
          </template>

          <template v-slot:item.author="{ item }">
            <div v-if="item.author" class="text-body-2">
              <span class="app-body">{{ item.author.full_name }}</span>
            </div>
          </template>

          <template v-slot:item.source="{ item }">
            <div v-if="item.source" class="text-body-2">
              <span class="app-body" v-html="item.source"></span>
            </div>
          </template>

          <template v-slot:item.category="{ item }">
            <ul
              v-if="item.categories.length"
              class="text-body-2 primary--text clickable pl-4"
            >
              <li
                v-for="(category_item, index) in item.categories"
                :key="index"
                class="app-body"
                @click="
                  () => {
                    SET_POST({ data: category_item });
                    $router.push(`/category/${category_item._id}`);
                  }
                "
              >
                {{ category_item.title }}
              </li>
            </ul>
          </template>

          <template v-slot:item.created_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatLocaleDate(item.created_at)
              }}</span>
            </div>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatLocaleDate(item.updated_at)
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
                    @click="restoreDeletePost(item)"
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
                    @click="deletePost(item)"
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
                        SET_POST({ data: item });
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
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="item.is_blocked_comment"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="unblockComment(item)"
                >
                  <v-icon small color="success"
                    >mdi-comment-processing-outline</v-icon
                  >
                </v-btn>
                <v-btn
                  v-else
                  icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="blockComment(item)"
                >
                  <v-icon small color="error">mdi-comment-off-outline</v-icon>
                </v-btn>
              </template>
              <span
                v-if="item.is_blocked_comment"
                v-html="$t('Un-block comment')"
              ></span>
              <span v-else v-html="$t('Block comment')"></span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeletePost"
      :title="`post ${post.title}`"
    />
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import systemMixins from "@/mixins/system";
import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";

export default {
  name: "BasePostTable",
  mixins: [postMixins, systemMixins],
  components: {
    BaseHardDeleteDialog,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Title",
            align: "start",
            value: "title",
          },
          {
            text: "Author",
            align: "start",
            value: "author",
          },
          {
            text: "Category",
            align: "start",
            value: "category",
          },
          {
            text: "Source",
            align: "start",
            value: "source",
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
            align: "center",
            value: "actions",
            sortable: false,
          },
        ];
      },
    },
  },
  data() {
    return {
      search: "",
      is_open_hard_delete_dialog: false,
    };
  },

  methods: {
    async blockComment(post) {
      try {
        const { _id, title } = post;

        await this.BLOCK_POST_COMMENT({ id: _id });

        this.$toast.success(
          this.$t(`Blocked comment for post ${title} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while blocking comment for post")
        );
      }
    },

    async unblockComment(post) {
      try {
        const { _id, title } = post;

        await this.UNBLOCK_POST_COMMENT({ id: _id });

        this.$toast.success(
          this.$t(`Un-blocked comment for post ${title} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while un-blocking comment for post")
        );
      }
    },

    async deletePost(post) {
      try {
        const { _id, title } = post;

        await this.DELETE_POST({ id: _id });

        this.$toast.success(this.$t(`Deleted post ${title} successfully`));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while deleting post"));
      }
    },

    async hardDeletePost() {
      try {
        const { _id, title } = this.post;

        await this.HARD_DELETE_POST({ id: _id });

        this.$toast.success(
          this.$t(`Forever deleted post ${title} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while hard deleting post")
        );
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async restoreDeletePost(post) {
      try {
        const { _id, title } = post;

        await this.RESTORE_POST({ id: _id });

        this.$toast.success(this.$t(`Restored post ${title} successfully`));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while restoring post"));
      }
    },
  },

  async fetch() {
    try {
      await this.GET_POSTS();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
