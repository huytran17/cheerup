<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="categories"
        :search="search"
        :page="category_pagination.current_page"
        :items-per-page="category_pagination.per_page"
        :multi-sort="true"
        :server-items-length="category_pagination.total"
        @update:items-per-page="tableUpdateItemsPerPage"
        @update:page="tableUpdatePage"
      >
        <template v-slot:item.title="{ item }">
          <div
            class="text-body-2 primary--text clickable"
            @click="
              () => {
                $router.push(localePath(`/category/${item._id}`));
              }
            "
          >
            <span>{{ item.title }}</span>
          </div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div class="text-body-2">
            <span>{{ formatLocaleDate(item.created_at) }}</span>
          </div>
        </template>

        <template v-slot:item.description="{ item }">
          <div
            class="text-body-2 tiptap__text-no-margin tiptap__text-no-image"
            v-line-clamp="3"
          >
            <span v-html="$t(item.description)"></span>
          </div>
        </template>

        <template v-slot:item.badge_color="{ item }">
          <v-icon v-if="item.badge_color" :color="item.badge_color"
            >mdi-circle</v-icon
          >
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div class="text-body-2">
            <span>{{ formatLocaleDate(item.updated_at) }}</span>
          </div>
        </template>

        <template v-slot:item.deleted_at="{ item }">
          <div v-if="item.deleted_at" class="text-body-2">
            <span>{{ formatLocaleDate(item.deleted_at) }}</span>
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
                  @click="restoreDeletedCategory(item)"
                >
                  <v-icon small color="success">mdi-backup-restore</v-icon>
                </v-btn>
              </template>
              {{ $t("Restore") }}
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
                  @click="deleteCategory(item)"
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
                      SET_CATEGORY({ data: item });
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
        </template>
      </v-data-table>
    </v-col>

    <BaseHardDeleteDialog
      :is_open="is_open_hard_delete_dialog"
      @close-dialog="is_open_hard_delete_dialog = false"
      @confirm-dialog="hardDeleteCategory"
      :title="`category ${category.title}`"
    />
  </v-row>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
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
            text: "Description",
            align: "start",
            value: "description",
          },
          {
            text: "Badge Color",
            align: "center",
            value: "badge_color",
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
      search: {
        type: String,
        default: () => "",
      },
    },
  },
  data() {
    return {
      search: "",
      is_open_hard_delete_dialog: false,
      date: "",
      ADMIN_TYPES,
    };
  },

  methods: {
    async tableUpdatePage(data) {
      try {
        await this.GET_CATEGORIES_PAGINATED({
          page: data,
          entries_per_page: this.category_pagination.per_page,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async tableUpdateItemsPerPage(data) {
      try {
        await this.GET_CATEGORIES_PAGINATED({
          page: 1,
          entries_per_page: data,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async deleteCategory(category) {
      try {
        const { _id, title } = category;

        await this.DELETE_CATEGORY({ id: _id });

        this.$toast.success(this.$t(`Deleted category ${title} successfully`));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while deleting category"));
      }
    },

    async hardDeleteCategory() {
      try {
        const { _id, title } = this.category;

        await this.HARD_DELETE_CATEGORY({ id: _id });

        this.$toast.success(
          this.$t(`Forever deleted category ${title} successfully`)
        );

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while hard deleting category")
        );
      } finally {
        this.is_open_hard_delete_dialog = false;
      }
    },

    async restoreDeletedCategory(category) {
      try {
        const { _id, title } = category;

        await this.RESTORE_CATEGORY({ id: _id });

        this.$toast.success(this.$t(`Restored category ${title} successfully`));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while restoring category")
        );
      }
    },
  },

  async fetch() {
    try {
      await this.GET_CATEGORIES_PAGINATED({
        page: this.category_pagination.current_page,
        entries_per_page: this.category_pagination.per_page,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
