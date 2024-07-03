<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              :rules="titleRules"
              :value="category.title"
              :label="$t('Title')"
              outlined
              color="brick"
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
                {{ $t("Description") }}
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
                {{ $t("Thumbnail") }}
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
              @vdropzone-success="(file) => onUploadThumbnailSuccsess({ file })"
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
                {{ $t("Badge Color") }}
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
                  <div class="text-body-2 brick--text">
                    <h3 class="app-body">{{ $t("SEO") }}</h3>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        :value="seo_title"
                        :label="$t('Title')"
                        outlined
                        color="brick"
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
                        :value="seo_description"
                        :label="$t('Description')"
                        outlined
                        color="brick"
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
                        :value="seo_keywords"
                        :label="$t('Keywords')"
                        outlined
                        color="brick"
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
                        :value="seo_author"
                        :label="$t('Author')"
                        outlined
                        color="brick"
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
              color="brick"
              class="white--text"
              tile
              :disabled="!form_valid"
              @click="updateCategory"
            >
              <span class="app-body">{{ $t("Update") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form></v-col
    >
  </v-row>
</template>

<script>
import categoryMixins from "@/mixins/category";
import dropzoneMixins from "@/mixins/dropzone";
import systemMixins from "@/mixins/system";
import { get, isObject } from "lodash";

export default {
  name: "BaseUpdateCategory",
  mixins: [systemMixins, categoryMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  computed: {
    seo_title() {
      return this.category.seo?.title || "";
    },

    seo_description() {
      return this.replaceHTMLTag(this.category.seo?.description) || "";
    },

    seo_keywords() {
      return this.category.seo?.keywords || "";
    },

    seo_author() {
      return this.category.seo?.author || "";
    },
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

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating category"));
      }
    },

    async onUploadThumbnailSuccsess({ file }) {
      try {
        this.$refs.thumbnail_dropzone.removeFile(file);

        this.$toast.success(this.$t("Updated category successfully"));

        await this.$fetch();
      } catch (error) {
        console.error(error);
      }
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
.v-expansion-panels {
  z-index: 0;
}
</style>
