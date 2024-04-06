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
                :value="post.title"
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
                attr="description"
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
                :value="post.categories"
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
                :value="post.tags"
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
            <v-col cols="12" class="pb-0">
              <div class="text-body-2">
                <span class="app-body">
                  <span v-html="$t('Thumbnail')"></span>
                </span>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-dropzone
                ref="thumbnail_dropzone"
                id="thumbnail"
                :options="uploadPostThumbnailOptions({ id: $route.params.id })"
                :destroyDropzone="true"
                @vdropzone-success="
                  (file) => onUploadThumbnailSuccsess({ file })
                "
              ></v-dropzone>
            </v-col>

            <v-col cols="12" sm="6">
              <v-img
                :src="post.thumbnail_url"
                :alt="post.title"
                contain
                max-width="200px"
                class="mx-auto"
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-switch
                :input-value="post.is_blocked_comment"
                :label="$t('Block Comment')"
                :false-value="false"
                :true-value="true"
                @change="
                  updatePostObject({
                    variable_path: 'is_blocked_comment',
                    data: $event,
                  })
                "
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div class="text-body-2">
                      <span class="app-body" v-html="$t('SEO')"></span>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :value="seo_title"
                          :label="$t('Title')"
                          @input="
                            updatePostObject({
                              variable_path: 'seo.title',
                              data: $event,
                            })
                          "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :value="seo_description"
                          :label="$t('Description')"
                          @input="
                            updatePostObject({
                              variable_path: 'seo.description',
                              data: $event,
                            })
                          "
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :value="seo_keywords"
                          :label="$t('Keywords')"
                          @input="
                            updatePostObject({
                              variable_path: 'seo.keywords',
                              data: $event,
                            })
                          "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :value="seo_author"
                          :label="$t('Author')"
                          @input="
                            updatePostObject({
                              variable_path: 'seo.author',
                              data: $event,
                            })
                          "
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                :disabled="!form_valid"
                @click="updatePost"
              >
                <span v-html="$t('Update')"></span>
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
import { merge, get } from "lodash";
import categoryMixins from "@/mixins/category";
import postMixins from "@/mixins/post";
import systemMixins from "@/mixins/system";
import dropzoneMixins from "@/mixins/dropzone";
import TiptapEditor from "@/components/TiptapEditor";
import BasePreviewPostDialog from "@/components/post/widget/BasePreviewPostDialog";

export default {
  name: "BaseUpdatePost",
  mixins: [postMixins, dropzoneMixins, categoryMixins, systemMixins],
  components: {
    BasePreviewPostDialog,
    TiptapEditor,
  },
  data() {
    return {
      form_valid: false,
      is_open_preview_dialog: false,
    };
  },
  computed: {
    post_id() {
      return this.$route.params.id;
    },

    seo_title() {
      return get(this.post, "seo.title");
    },

    seo_description() {
      return this.replaceHTMLTag(get(this.post, "seo.description"));
    },

    seo_keywords() {
      return get(this.post, "seo.keywords");
    },

    seo_author() {
      return get(this.post, "seo.author");
    },
  },
  methods: {
    async updatePost() {
      try {
        if (!this.form_valid) {
          return;
        }

        await this.UPDATE_POST({
          data: this.post,
        });

        this.$toast.success(this.$t("Updated post successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating post"));
      }
    },

    async onUploadThumbnailSuccsess({ file }) {
      try {
        this.$refs.thumbnail_dropzone.removeFile(file);

        this.$toast.success("Updated post successfully");

        await this.GET_POST({ id: this.post_id });
      } catch (error) {
        console.error(error);
      }
    },
  },

  async fetch() {
    try {
      await Promise.all([
        this.GET_POST({ id: this.post_id }),
        this.GET_CATEGORIES({ id: this.post_id }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
:deep(.v-expansion-panels) {
  z-index: 0 !important;
}
</style>
