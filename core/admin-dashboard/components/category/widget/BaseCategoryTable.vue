<template>
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
      <v-data-table :headers="headers" :items="categories" :search="search">
        <template v-slot:item.title="{ item }">
          <div
            class="text-body-2 primary--text clickable"
            @click="
              () => {
                $router.push(localePath(`/category/${item._id}`));
              }
            "
          >
            <span class="app-body">{{ item.title }}</span>
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

        <template v-slot:item.deleted_at="{ item }">
          <div v-if="item.deleted_at" class="text-body-2">
            <span class="app-body">{{
              formatDate(item.deleted_at, "DD-MM-YYYY HH:mm")
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
                  @click="restoreDeleteCategory(item)"
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
                  @click="deleteCategory(item)"
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
                      SET_CATEGORY({ data: item });
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
        </template>
      </v-data-table>
    </v-col>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      :data="category"
      :closeDialog="() => (is_open_hard_delete_dialog = false)"
      :confirmDelete="() => hardDeleteCategory()"
    />
  </v-row>
</template>

<script>
import categoryMixins from "@/mixins/category";
import systemMixins from "@/mixins/system";

import BaseHardDeleteDialog from "@/components/BaseHardDeleteDialog";
import TiptapEditor from "@/components/TiptapEditor";

export default {
  name: "BaseCategoryTable",
  mixins: [categoryMixins, systemMixins],
  components: { BaseHardDeleteDialog, TiptapEditor },
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
            text: "Created At",
            align: "start",
            value: "created_at",
          },
          {
            text: "Updated At",
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
      date: "",
    };
  },

  methods: {
    async deleteCategory(category) {
      try {
        const id = _.get(category, "_id");
        const title = _.get(category, "title");

        await this.DELETE_CATEGORY({ id });
        this.$toast.success(`Deleted category ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting category`);
      }
    },

    async hardDeleteCategory() {
      try {
        const id = _.get(this.category, "_id");
        const title = _.get(this.category, "title");

        await this.HARD_DELETE_CATEGORY({ id });
        this.$toast.success(`Forever deleted category ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while deleting category`);
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async restoreDeleteCategory(category) {
      try {
        const id = _.get(category, "_id");
        const title = _.get(category, "title");

        await this.RESTORE_CATEGORY({ id });
        this.$toast.success(`Restored category ${title} successfully`);
        await this.$fetch();
      } catch (err) {
        console.error(err);
        this.$toast.error(`Encountered error while restoring category`);
      }
    },
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_CATEGORIES();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>
