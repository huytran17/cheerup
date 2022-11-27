<template>
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
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Logo')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
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
                  update_paths: ['client_meta.logo', 'client_logo_url'],
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
            max-width="200px"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Favicon')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
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
                  update_paths: ['client_meta.favicon', 'client_favicon_url'],
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
            max-width="200px"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        :value="client_meta_owner_name"
        :rules="ownerNameRules"
        :label="$t('Owner Name')"
        @input="
          updateSystemConfigurationObject({
            variable_path: 'client_meta.owner.name',
            data: $event,
          })
        "
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <div class="text-body-2 mb-2">
        <span class="app-body">
          <span v-html="$t('Owner Description')"></span>
        </span>
      </div>
      <TiptapEditor
        :content="client_meta_owner"
        attr="description"
        @on-input="
          updateSystemConfigurationObject({
            variable_path: 'client_meta.owner.description',
            data: $event,
          })
        "
      />
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Owner Avatar')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="client_owner_avatar_dropzone"
            id="client_owner_avatar"
            :options="
              getDropzoneOptions({
                upload_url: client_upload_owner_avatar_url,
              })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'client_owner_avatar_dropzone',
                  file,
                  response,
                  update_paths: [
                    'client_meta.owner.avatar',
                    'client_owner_avatar_url',
                  ],
                })
            "
          ></v-dropzone>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            v-if="client_owner_avatar_url"
            :src="client_owner_avatar_url"
            :alt="client_meta_owner_name"
            contain
            max-width="200px"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { S3_UPLOAD_URL_TYPES } from "@/constants";
import systemConfigurationMixins from "@/mixins/system-configuration";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateClientData",
  mixins: [systemConfigurationMixins, dropzoneMixins],
  computed: {
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

    client_meta_owner_description() {
      return _.get(this.system_configuration, "client_meta.owner.description");
    },

    client_meta_owner_name() {
      return _.get(this.system_configuration, "client_meta.owner.name");
    },

    client_meta_owner() {
      return _.get(this.system_configuration, "client_meta.owner", {});
    },

    client_upload_owner_avatar_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_CLIENT_META_OWNER_AVATAR,
      });
    },

    client_upload_logo_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_CLIENT_META_LOGO,
      });
    },

    client_upload_favicon_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.SYSTEM_CONFIG_CLIENT_META_FAVICON,
      });
    },

    client_logo_url() {
      return _.get(this.system_configuration, "client_logo_url");
    },

    client_owner_avatar_url() {
      return _.get(this.system_configuration, "client_owner_avatar_url");
    },

    client_favicon_url() {
      return _.get(this.system_configuration, "client_favicon_url");
    },
  },
  methods: {
    onUploadSuccsess({ ref, file, response, update_paths }) {
      this.$refs[ref].removeFile(file);

      const { data: updated_system_configuration } = response;

      let updated_thumbnail_data = _.cloneDeep(this.system_configuration);

      update_paths.forEach((update_path) => {
        updated_thumbnail_data = _.update(
          updated_thumbnail_data,
          update_path,
          (data) => _.get(updated_system_configuration, update_path)
        );
      });

      this.SET_SYSTEM_CONFIGURATION({ data: updated_thumbnail_data });
      this.$toast.success("Updated system configuration successfully");
    },

    getUploadUrl({ base_url }) {
      const system_configuration_id = _.get(this.system_configuration, "_id");
      return `${base_url}/${system_configuration_id}`;
    },
  },
};
</script>

<style></style>
