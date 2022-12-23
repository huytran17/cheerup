<template>
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
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Logo')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            v-if="system_configuration._id"
            ref="admin_logo_dropzone"
            id="admin_logo"
            :options="uploadAdminLogoOptions({ id: system_configuration._id })"
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'admin_logo_dropzone',
                  file,
                  response,
                  update_paths: ['admin_meta.logo', 'admin_logo_url'],
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
            v-if="system_configuration._id"
            ref="admin_favicon_dropzone"
            id="admin_favicon"
            :options="
              uploadAdminFaviconOptions({ id: system_configuration._id })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'admin_favicon_dropzone',
                  file,
                  response,
                  update_paths: ['admin_meta.favicon', 'admin_favicon_url'],
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
              <span v-html="$t('Folder Icon')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            v-if="system_configuration._id"
            ref="admin_folder_icon_dropzone"
            id="admin_favicon"
            :options="
              uploadAdminFolderIconOptions({ id: system_configuration._id })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'admin_folder_icon_dropzone',
                  file,
                  response,
                  update_paths: [
                    'admin_meta.folder_icon',
                    'admin_folder_icon_url',
                  ],
                })
            "
          ></v-dropzone>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            v-if="admin_folder_icon_url"
            :src="admin_folder_icon_url"
            :alt="admin_meta_title"
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
import systemConfigurationMixins from "@/mixins/system-configuration";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateAdminData",
  mixins: [systemConfigurationMixins, dropzoneMixins],
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

    admin_logo_url() {
      return _.get(this.system_configuration, "admin_logo_url");
    },

    admin_folder_icon_url() {
      return _.get(this.system_configuration, "admin_folder_icon_url");
    },

    admin_favicon_url() {
      return _.get(this.system_configuration, "admin_favicon_url");
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
  },
};
</script>

<style></style>
