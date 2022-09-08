<template>
  <v-row v-if="loading">
    <v-col cols="12" class="d-flex justify-center">
      <BaseCircularLoader />
    </v-col>
  </v-row>
  <v-row v-else>
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
                getDropzoneOptions({
                  upload_url: category_upload_thumbnail_url,
                })
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
              v-if="category_thumbnail_url"
              :src="category_thumbnail_url"
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
import categoryMixins from "@/mixins/category";
import dropzoneMixins from "@/mixins/dropzone";
import { S3_UPLOAD_URL_TYPES } from "@/constants";

import BaseCircularLoader from "@/components/loaders/BaseCircularLoader";

export default {
  name: "BaseUpdateCategory",
  mixins: [categoryMixins, dropzoneMixins],
  components: {
    BaseCircularLoader,
  },
  data() {
    return {
      loading: true,
      form_valid: false,
      color_picked: null,
    };
  },
  computed: {
    category_upload_thumbnail_url() {
      return `${S3_UPLOAD_URL_TYPES.CATEGORY_THUMBNAIL}/${this.$route.params.id}`;
    },

    category_thumbnail_url() {
      return _.get(this.category, "thumbnail_url");
    },
  },
  methods: {
    getBadgeColor(event) {
      let hex_color = event;
      if (_.isObject(event)) {
        hex_color = _.get(event, "hex");
      }

      return hex_color;
    },

    async updateCategory() {
      try {
        await this.UPDATE_CATEGORY({
          data: this.category,
        });
        this.$toast.success("Updated category successfully");
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating category");
      }
    },

    onUploadThumbnailSuccsess({ file, response }) {
      this.$refs.thumbnail_dropzone.removeFile(file);

      const { data: updated_category } = response;
      const updated_thumbnail_data = Object.assign({}, this.category, {
        thumbnail: updated_category.thumbnail,
        thumbnail_url: updated_category.thumbnail_url,
      });

      this.SET_CATEGORY({ data: updated_thumbnail_data });
      this.$toast.success("Updated category successfully");
    },
  },

  async fetch() {
    try {
      this.loading = true;
      await this.GET_CATEGORY({ id: this.$route.params.id });
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style></style>
