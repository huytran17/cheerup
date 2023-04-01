<template>
  <v-row v-if="has_data" class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
    <v-col cols="12" class="py-0">
      <div class="text-body-1 primary--text">
        <span class="app-title" v-html="$t('Client Meta')"></span>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :value="system_configuration.client_meta?.title"
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
        :value="system_configuration.client_meta?.description"
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
        :value="system_configuration.client_meta?.author"
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
        :value="system_configuration.client_meta?.keywords"
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
            :options="uploadClientLogoOptions({ id: system_configuration._id })"
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
            :src="system_configuration.client_logo_url"
            :alt="system_configuration.client_meta?.title"
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
              uploadClientFaviconOptions({ id: system_configuration._id })
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
            :src="system_configuration.client_favicon_url"
            :alt="system_configuration.client_meta?.title"
            contain
            max-width="200px"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        :value="system_configuration.client_meta?.owner?.name"
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
        :content="system_configuration.client_meta?.owner"
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
              uploadClientOwnerAvatarOptions({ id: system_configuration._id })
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
            :src="system_configuration.client_owner_avatar_url"
            :alt="system_configuration.client_meta_owner_name"
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
  name: "BaseUpdateClientData",
  mixins: [systemConfigurationMixins, dropzoneMixins],
  computed: {
    has_data() {
      return (
        !_.isEmpty(this.system_configuration) &&
        !_.isNil(this.system_configuration)
      );
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
      this.$toast.success(this.$t("Updated system configuration successfully"));
    },
  },
};
</script>
