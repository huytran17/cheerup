<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-icon color="black" @click="$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >
      </v-col>
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
              <v-text-field
                :value="post.source"
                class="source-input"
                :label="$t('Source')"
                clearable
                @input="
                  updatePostObject({ variable_path: 'source', data: $event })
                "
              ></v-text-field>
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
                :options="uploadPostThumbnailOptions({ id: post._id })"
                :destroyDropzone="true"
                @vdropzone-success="
                  (file, response) =>
                    onUploadThumbnailSuccsess({ file, response })
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
import categoryMixins from "@/mixins/category";
import postMixins from "@/mixins/post";
import dropzoneMixins from "@/mixins/dropzone";

import TiptapEditor from "@/components/TiptapEditor";
import BasePreviewPostDialog from "@/components/post/widget/BasePreviewPostDialog";

export default {
  name: "BaseUpdatePost",
  mixins: [postMixins, dropzoneMixins, categoryMixins],
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
  methods: {
    async updatePost() {
      try {
        await this.UPDATE_POST({
          data: this.post,
        });
        this.$toast.success("Updated post successfully");
      } catch (error) {
        console.error(error);
        this.$toast.error("Encountered error while updating post");
      }
    },

    onUploadThumbnailSuccsess({ file, response }) {
      this.$refs.thumbnail_dropzone.removeFile(file);

      const { data: updated_post } = response;
      const updated_thumbnail_data = Object.assign({}, this.post, {
        thumbnail: updated_post.thumbnail,
        thumbnail_url: updated_post.thumbnail_url,
      });

      this.SET_POST({ data: updated_thumbnail_data });
      this.$toast.success("Updated post successfully");
    },
  },

  async fetch() {
    try {
      const post_id = this.$route.params.id;
      await Promise.all([
        this.GET_POST({ id: post_id }),
        this.GET_CATEGORIES({ id: post_id }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
