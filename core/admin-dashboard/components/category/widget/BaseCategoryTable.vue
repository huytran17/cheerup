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

        <template v-slot:item.description="{ item }">
          <div
            class="text-body-2 tiptap__text-no-margin tiptap__text-no-image"
            v-line-clamp="3"
          >
            <span class="app-body" v-html="$t(item.description)"></span>
          </div>
        </template>

        <template v-slot:item.badge_color="{ item }">
          <v-icon v-if="item.badge_color" :color="item.badge_color"
            >mdi-circle</v-icon
          >
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

        <template
          v-slot:item.actions="{ item }"
          v-component-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]"
        >
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
                  @click="deleteCategory(item)"
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
      await this.GET_CATEGORIES();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
