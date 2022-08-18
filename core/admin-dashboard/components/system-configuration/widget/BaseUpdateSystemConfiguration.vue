<template>
  <v-row v-if="loading">
    <v-col cols="12" class="d-flex justify-center">
      <BaseCircularLoader />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12" class="pl-0">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <v-row class="soft-box-shadow rounded-lg px-4 py-5">
          <v-col cols="12" class="py-0">
            <div class="text-body-1 primary--text">
              <span class="app-title" v-html="$t('Admin Meta')"></span>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="admin_meta_title"
              :rules="titleRules"
              :label="$t('Title')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'admin_meta.title',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="admin_meta_description"
              :rules="descriptionRules"
              :label="$t('Description')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'admin_meta.description',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="admin_meta_author"
              :rules="authorRules"
              :label="$t('Author')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'admin_meta.author',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2 mb-2">
                  <span class="app-body">
                    <span v-html="$t('Logo')"></span>
                  </span>
                </div>
                <v-dropzone
                  ref="admin_logo_dropzone"
                  id="admin_logo"
                  :options="
                    getDropzoneOptions({
                      upload_url: admin_upload_logo_url,
                    })
                  "
                  :destroyDropzone="true"
                  @vdropzone-success="
                    (file, response) =>
                      onUploadSuccsess({
                        ref: 'admin_logo_dropzone',
                        file,
                        response,
                        update_paths: [
                          'admin_meta.logo',
                          'admin_meta.logo_url',
                        ],
                      })
                  "
                ></v-dropzone>
              </v-col>

              <v-col cols="12" md="6">
                <v-img
                  v-if="admin_logo_url"
                  :src="admin_logo_url"
                  :alt="admin_meta_title"
                  contain
                  max-width="100%"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2 mb-2">
                  <span class="app-body">
                    <span v-html="$t('Favicon')"></span>
                  </span>
                </div>
                <v-dropzone
                  ref="admin_favicon_dropzone"
                  id="admin_favicon"
                  :options="
                    getDropzoneOptions({
                      upload_url: admin_upload_favicon_url,
                    })
                  "
                  :destroyDropzone="true"
                  @vdropzone-success="
                    (file, response) =>
                      onUploadSuccsess({
                        ref: 'admin_favicon_dropzone',
                        file,
                        response,
                        update_paths: [
                          'admin_meta.favicon',
                          'admin_meta.favicon_url',
                        ],
                      })
                  "
                ></v-dropzone>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  v-if="admin_favicon_url"
                  :src="admin_favicon_url"
                  :alt="admin_meta_title"
                  contain
                  max-width="100%"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
          <v-col cols="12" class="py-0">
            <div class="text-body-1 primary--text">
              <span class="app-title" v-html="$t('Client Meta')"></span>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="client_meta_title"
              :rules="titleRules"
              :label="$t('Title')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'client_meta.title',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="client_meta_description"
              :rules="descriptionRules"
              :label="$t('Description')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'client_meta.description',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="client_meta_author"
              :rules="authorRules"
              :label="$t('Author')"
              @input="
                updateSystemConfigurationObject({
                  variable_path: 'client_meta.author',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox
              :value="client_meta_keywords"
              :label="$t('Keywords')"
              multiple
              chips
              dense
              class="mt-2"
              @change="
                updateSystemConfigurationObject({
                  variable_path: 'client_meta.keywords',
                  data: $event,
                })
              "
            ></v-combobox>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2 mb-2">
                  <span class="app-body">
                    <span v-html="$t('Logo')"></span>
                  </span>
                </div>
                <v-dropzone
                  ref="client_logo_dropzone"
                  id="client_logo"
                  :options="
                    getDropzoneOptions({
                      upload_url: client_upload_logo_url,
                    })
                  "
                  :destroyDropzone="true"
                  @vdropzone-success="
                    (file, response) =>
                      onUploadSuccsess({
                        ref: 'client_logo_dropzone',
                        file,
                        response,
                        update_paths: [
                          'client_meta.logo',
                          'client_meta.logo_url',
                        ],
                      })
                  "
                ></v-dropzone>
              </v-col>

              <v-col cols="12" md="6">
                <v-img
                  v-if="client_logo_url"
                  :src="client_logo_url"
                  :alt="client_meta_title"
                  contain
                  max-width="100%"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2 mb-2">
                  <span class="app-body">
                    <span v-html="$t('Favicon')"></span>
                  </span>
                </div>
                <v-dropzone
                  ref="client_favicon_dropzone"
                  id="client_favicon"
                  :options="
                    getDropzoneOptions({
                      upload_url: client_upload_favicon_url,
                    })
                  "
                  :destroyDropzone="true"
                  @vdropzone-success="
                    (file, response) =>
                      onUploadSuccsess({
                        ref: 'client_favicon_dropzone',
                        file,
                        response,
                        update_paths: [
                          'client_meta.favicon',
                          'client_meta.favicon_url',
                        ],
                      })
                  "
                ></v-dropzone>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  v-if="client_favicon_url"
                  :src="client_favicon_url"
                  :alt="client_meta_title"
                  contain
                  max-width="100%"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
          <v-col cols="12" class="py-0">
            <div class="text-body-1 primary--text">
              <span
                class="app-title"
                v-html="$t('System Configurations')"
              ></span>
            </div>
          </v-col>

          <v-col cols="12" class="pt-6">
            <v-checkbox
              :input-value="system_configuration.is_block_comment"
              :label="$t('Block comment for all posts')"
              hide-details
              class="mt-0"
              :true-value="true"
              :false-value="false"
              @change="
                updateSystemConfigurationObject({
                  variable_path: 'is_block_comment',
                  data: $event,
                })
              "
            ></v-checkbox>
          </v-col>

          <v-col cols="12" class="pt-0">
            <v-checkbox
              :input-value="system_configuration.is_maintaining"
              :label="$t('Switch to maintaining mode')"
              hide-details
              class="mt-0"
              :true-value="true"
              :false-value="false"
              @change="
                updateSystemConfigurationObject({
                  variable_path: 'is_maintaining',
                  data: $event,
                })
              "
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex justify-end pr-0">
            <v-btn
              depressed
              color="primary"
              :disabled="!form_valid"
              @click="updateSystemConfiguration"
            >
              <span v-html="$t('Update')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import categoryMixins from "@/mixins/category";
import systemConfigurationMixins from "@/mixins/system-configuration";
import dropzoneMixins from "@/mixins/dropzone";
import { S3_UPLOAD_URL_TYPES } from "@/constants";

import BaseCircularLoader from "@/components/loaders/BaseCircularLoader";

export default {
  name: "BaseUpdateSystemConfiguration",
  mixins: [systemConfigurationMixins, dropzoneMixins, categoryMixins],
  components: {
    BaseCircularLoader,
  },
  data() {
    return {
      loading: true,
      form_valid: false,
    };
  },
  computed: {
    admin_meta_title() {
      return _.get(this.system_configuration, "admin_meta.title");
    },

    admin_meta_author() {
      return _.get(this.system_configuration, "admin_meta.author");
    },

    admin_meta_description() {
      return _.get(this.system_configuration, "admin_meta.description");
    },

    client_meta_keywords() {
      return _.get(this.system_configuration, "client_meta.keywords");
    },

    client_meta_title() {
      return _.get(this.system_configuration, "client_meta.title");
    },

    client_meta_author() {
      return _.get(this.system_configuration, "client_meta.author");
    },

    client_meta_description() {
      return _.get(this.system_configuration, "client_meta.description");
    },

    admin_upload_logo_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_ADMIN_META_LOGO,
      });
    },

    client_upload_logo_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_CLIENT_META_LOGO,
      });
    },

    admin_upload_favicon_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_ADMIN_META_FAVICON,
      });
    },

    client_upload_favicon_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_CLIENT_META_FAVICON,
      });
    },

    admin_logo_url() {
      return _.get(this.system_configuration, "admin_logo_url");
    },

    admin_favicon_url() {
      return _.get(this.system_configuration, "admin_favicon_url");
    },

    client_logo_url() {
      return _.get(this.system_configuration, "client_logo_url");
    },

    client_favicon_url() {
      return _.get(this.system_configuration, "client_favicon_url");
    },
  },
  methods: {
    getUploadUrl({ base_url }) {
      const system_configuration_id = _.get(this.system_configuration, "_id");
      return `${base_url}/${system_configuration_id}`;
    },

    async updateSystemConfiguration() {
      try {
        await this.UPDATE_SYSTEM_CONFIGURATION({
          data: this.system_configuration,
        });
        this.$toast.success("Updated system configuration successfully");
      } catch (err) {
        console.error(err);
        this.$toast.error(
          "Encountered error while updating system configuration"
        );
      }
    },

    onUploadSuccsess({ ref, file, response, update_paths }) {
      this.$refs[ref].removeFile(file);

      const { data: updated_system_configuration } = response;

      let updated_thumbnail_data = Object.assign({}, this.system_configuration);

      update_paths.forEach((update_path) => {
        updated_thumbnail_data = Object.assign({}, this.system_configuration, {
          [update_path]: updated_system_configuration[update_path],
        });
      });

      this.SET_SYSTEM_CONFIGURATION({ data: updated_thumbnail_data });
      this.$toast.success("Updated system configuration successfully");
    },
  },

  async fetch() {
    try {
      this.loading = true;
      await this.GET_LATEST_SYSTEM_CONFIGURATION();
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
