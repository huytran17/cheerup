<template>
  <v-row>
    <v-col cols="12">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              :rules="titleRules"
              :value="category.title"
              :label="$t('Title')"
              @input="
                updateCategoryObject({ variable_path: 'title', data: $event })
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
              :content="category"
              attr="description"
              @on-input="
                updateCategoryObject({
                  variable_path: 'description',
                  data: $event,
                })
              "
            />
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
              :options="
                uploadCategoryThumbnailOptions({ id: $route.params.id })
              "
              :destroyDropzone="true"
              @vdropzone-success="
                (file, response) =>
                  onUploadThumbnailSuccsess({ file, response })
              "
            ></v-dropzone>
          </v-col>

          <v-col cols="12" sm="6">
            <v-img
              :src="category.thumbnail_url"
              :alt="category.title"
              contain
              max-width="200px"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="text-body-2 mb-2">
              <span class="app-body">
                <span v-html="$t('Badge Color')"></span>
              </span>
            </div>
            <v-color-picker
              :value="category.badge_color"
              show-swatches
              @input="
                ($event) =>
                  updateCategoryObject({
                    variable_path: 'badge_color',
                    data: getBadgeColor($event),
                  })
              "
            ></v-color-picker>
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
                        :value="category.seo && category.seo.title"
                        :label="$t('Title')"
                        @input="
                          updateCategoryObject({
                            variable_path: 'seo.title',
                            data: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        :value="category.seo && category.seo.description"
                        :label="$t('Description')"
                        @input="
                          updateCategoryObject({
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
                        :value="category.seo && category.seo.keywords"
                        :label="$t('Keywords')"
                        @input="
                          updateCategoryObject({
                            variable_path: 'seo.keywords',
                            data: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        :value="category.seo && category.seo.author"
                        :label="$t('Author')"
                        @input="
                          updateCategoryObject({
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
              @click="updateCategory"
            >
              <span v-html="$t('Update')"></span>
            </v-btn>
          </v-col>
        </v-row> </v-form
    ></v-col>
  </v-row>
</template>

<script>
import { get, isObject, merge } from "lodash";

import categoryMixins from "@/mixins/category";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateCategory",
  mixins: [categoryMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      color_picked: null,
    };
  },
  methods: {
    getBadgeColor(event) {
      let hex_color = event;
      isObject(event) && (hex_color = get(event, "hex"));

      return hex_color;
    },

    async updateCategory() {
      try {
        await this.UPDATE_CATEGORY({
          data: this.category,
        });
        this.$toast.success(this.$t("Updated category successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating category"));
      }
    },

    onUploadThumbnailSuccsess({ file, response }) {
      this.$refs.thumbnail_dropzone.removeFile(file);

      const { data: updated_category } = response;
      const updated_thumbnail_data = merge({}, this.category, {
        thumbnail: updated_category.thumbnail,
        thumbnail_url: updated_category.thumbnail_url,
      });

      this.SET_CATEGORY({ data: updated_thumbnail_data });
      this.$toast.success(this.$t("Updated category successfully"));
    },
  },

  async fetch() {
    try {
      await this.GET_CATEGORY({ id: this.$route.params.id });
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
