<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" class="d-flex justify-end">
        <v-btn text @click="is_open_preview_dialog = true">
          <span v-html="$t('Preview')"></span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form v-model="form_valid">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :rules="titleRules"
                :label="$t('Title')"
                @input="
                  updatePostObject({ variable_path: 'title', data: $event })
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-body-2 mb-2">
                <span class="app-body">
                  <span v-html="$t('Description')"></span>
                </span>
              </div>
              <TiptapEditor
                :content="post"
                attr="content"
                @on-input="
                  updatePostObject({
                    variable_path: 'description',
                    data: $event,
                  })
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-body-2 mb-2">
                <span class="app-body">
                  <span v-html="$t('Content')"></span>
                </span>
              </div>
              <TiptapEditor
                :content="post"
                attr="content"
                @on-input="
                  updatePostObject({ variable_path: 'content', data: $event })
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="categories"
                chips
                small-chips
                item-text="title"
                item-value="_id"
                :label="$t('Category')"
                multiple
                :rules="categoriesRules"
                @input="
                  updatePostObject({
                    variable_path: 'categories',
                    data: $event,
                  })
                "
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-body-2 mb-2">
                <span class="app-body">
                  <span v-html="$t('Source')"></span>
                </span>
              </div>
              <TiptapEditor
                :content="post"
                attr="source"
                @on-input="
                  updatePostObject({
                    variable_path: 'source',
                    data: $event,
                  })
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-combobox
                :label="$t('Tags')"
                multiple
                small-chips
                @input="
                  updatePostObject({ variable_path: 'tags', data: $event })
                "
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-switch
                :label="$t('Block Comment')"
                @change="
                  updatePostObject({
                    variable_path: 'is_blocked_comment',
                    data: $event,
                  })
                "
                :false-value="false"
                :true-value="true"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                :disabled="!form_valid"
                @click="createPost"
              >
                <span v-html="$t('Create')"></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <BasePreviewPostDialog
      :is_open="is_open_preview_dialog"
      @close-dialog="is_open_preview_dialog = false"
    />
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import categoryMixins from "@/mixins/category";
import TiptapEditor from "@/components/TiptapEditor";
import BasePreviewPostDialog from "@/components/post/widget/BasePreviewPostDialog";

export default {
  name: "BaseCreatePost",
  mixins: [postMixins, categoryMixins],
  components: {
    TiptapEditor,
    BasePreviewPostDialog,
  },
  data() {
    return {
      form_valid: false,
      is_open_preview_dialog: false,
    };
  },
  methods: {
    async createPost() {
      try {
        if (!this.form_valid) {
          return;
        }

        const created_post = await this.CREATE_POST({
          data: this.post,
        });

        this.$toast.success(this.$t("Created post successfully"));
        this.$router.push(this.localePath(`/post/${created_post._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating post"));
      }
    },
  },
  async fetch() {
    try {
      await this.GET_CATEGORIES();

      this.SET_POST({ data: {} });
    } catch (error) {
      console.error(error);
      this.$toast.error(this.$t("Encountered error while updating post"));
    }
  },
};
</script>
