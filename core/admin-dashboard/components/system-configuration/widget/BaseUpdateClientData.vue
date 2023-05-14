<template>
  <v-row v-if="has_data" class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
    <v-col cols="12" class="py-0">
      <div class="text-body-1 primary--text">
        <span class="app-title" v-html="$t('Client Meta')"></span>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        :value="system_configuration.owner?.name"
        :label="$t('Owner Name')"
        @input="
          updateSystemConfigurationObject({
            variable_path: 'owner.name',
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
        :content="system_configuration.owner"
        attr="description"
        @on-input="
          updateSystemConfigurationObject({
            variable_path: 'owner.description',
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
            ref="owner_avatar_dropzone"
            id="owner_avatar"
            :options="
              uploadOwnerAvatarOptions({ id: system_configuration._id })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'owner_avatar_dropzone',
                  file,
                  response,
                  update_paths: ['owner.avatar', 'owner_avatar_url'],
                })
            "
          ></v-dropzone>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="system_configuration.owner_avatar_url"
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
              <span v-html="$t('Thumbnail')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="thumbnail_dropzone"
            id="thumbnail"
            :options="uploadThumbnailOptions({ id: system_configuration._id })"
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'thumbnail_dropzone',
                  file,
                  response,
                  update_paths: ['thumbnail', 'thumbnail_url'],
                })
            "
          ></v-dropzone>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="system_configuration.thumbnail_url"
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
              <span v-html="$t('Folder icon')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="folder_icon_dropzone"
            id="folder_icon"
            :options="uploadFolderIconOptions({ id: system_configuration._id })"
            :destroyDropzone="true"
            @vdropzone-success="
              (file, response) =>
                onUploadSuccsess({
                  ref: 'folder_icon_dropzone',
                  file,
                  response,
                  update_paths: ['folder_icon', 'folder_icon_url'],
                })
            "
          ></v-dropzone>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="system_configuration.folder_icon_url"
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
import { get, isEmpty, isNil, cloneDeep, update } from "lodash";
import systemConfigurationMixins from "@/mixins/system-configuration";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateClientData",
  mixins: [systemConfigurationMixins, dropzoneMixins],
  computed: {
    has_data() {
      return (
        !isEmpty(this.system_configuration) && !isNil(this.system_configuration)
      );
    },
  },
  methods: {
    onUploadSuccsess({ ref, file, response, update_paths }) {
      this.$refs[ref].removeFile(file);

      const { data: updated_system_configuration } = response;

      let updated_thumbnail_data = cloneDeep(this.system_configuration);

      update_paths.forEach((update_path) => {
        updated_thumbnail_data = update(
          updated_thumbnail_data,
          update_path,
          (data) => get(updated_system_configuration, update_path)
        );
      });

      this.SET_SYSTEM_CONFIGURATION({ data: updated_thumbnail_data });
      this.$toast.success(this.$t("Updated system configuration successfully"));
    },
  },
};
</script>
