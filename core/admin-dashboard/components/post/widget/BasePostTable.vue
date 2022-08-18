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
                    SET_CATEGORY({ data: category_item });
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
                    @click="restoreDeletePost(item)"
                  >
                    <v-icon color="success">mdi-backup-restore</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Restore')"></span>
              </v-tooltip>
            </div>
            <div v-if="!item.deleted_at">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="deletePost(item)"
                  >
                    <v-icon color="error">mdi-trash-can-outline</v-icon>
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
                    @click="
                      () => {
                        SET_POST({ data: item });
                        is_open_hard_delete_dialog = true;
                      }
                    "
                  >
                    <v-icon color="error">mdi-delete-off-outline</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t('Delete Forever')"></span>
              </v-tooltip>
            </div>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="item.is_block_comment"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="unblockComment(item)"
                >
                  <v-icon color="success"
                    >mdi-comment-processing-outline</v-icon
                  >
                </v-btn>
                <v-btn
                  v-else
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="blockComment(item)"
                >
                  <v-icon color="error">mdi-comment-off-outline</v-icon>
                </v-btn>
              </template>
              <span
                v-if="item.is_block_comment"
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
      :data="post"
      :closeDialog="() => (is_open_hard_delete_dialog = false)"
      :confirmDelete="() => hardDeletePost()"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
      initial_loading: true,
      is_open_hard_delete_dialog: false,
    };
  },

  methods: {
    ...mapMutations({
      SET_CATEGORY: "category/SET_CATEGORY",
    }),
    async blockComment(post) {
      try {
        const id = _.get(post, "_id");
        const title = _.get(post, "title");

        await this.BLOCK_POST_COMMENT({ id });
        this.$toast.success(`Blocked comment for post ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while blocking comment for post`);
      }
    },

    async unblockComment(post) {
      try {
        const id = _.get(post, "_id");
        const title = _.get(post, "title");

        await this.UNBLOCK_POST_COMMENT({ id });
        this.$toast.success(
          `Un-blocked comment for post ${title} successfully`
        );
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(
          `Encountered error while un-blocking comment for post`
        );
      }
    },

    async deletePost(post) {
      try {
        const id = _.get(post, "_id");
        const title = _.get(post, "title");

        await this.DELETE_POST({ id });
        this.$toast.success(`Deleted post ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting post`);
      }
    },

    async hardDeletePost() {
      try {
        const id = _.get(this.post, "_id");
        const title = _.get(this.post, "title");

        await this.HARD_DELETE_POST({ id });
        this.$toast.success(`Forever deleted post ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting post`);
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async restoreDeletePost(post) {
      try {
        const id = _.get(post, "_id");
        const title = _.get(post, "title");

        await this.RESTORE_POST({ id });
        this.$toast.success(`Restored post ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while restoring post`);
      }
    },
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_POSTS();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>