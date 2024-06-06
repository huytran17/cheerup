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
              (file) =>
                onUploadSuccsess({
                  ref: 'owner_avatar_dropzone',
                  file,
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
              (file) =>
                onUploadSuccsess({
                  ref: 'thumbnail_dropzone',
                  file,
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
              (file) =>
                onUploadSuccsess({
                  ref: 'folder_icon_dropzone',
                  file,
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
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Admin excel template')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="admin_excel_template_dropzone"
            id="admin_excel_template"
            :options="
              uploadExcelTemplateOptions({
                id: system_configuration._id,
                type: EXCEL_TEMPLATE_TYPE.ADMIN,
              })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file) =>
                onUploadSuccsess({
                  ref: 'admin_excel_template_dropzone',
                  file,
                })
            "
          ></v-dropzone>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('User excel template')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="user_excel_template_dropzone"
            id="user_excel_template"
            :options="
              uploadExcelTemplateOptions({
                id: system_configuration._id,
                type: EXCEL_TEMPLATE_TYPE.USER,
              })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file) =>
                onUploadSuccsess({
                  ref: 'user_excel_template_dropzone',
                  file,
                })
            "
          ></v-dropzone>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Post excel template')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="post_excel_template_dropzone"
            id="post_excel_template"
            :options="
              uploadExcelTemplateOptions({
                id: system_configuration._id,
                type: EXCEL_TEMPLATE_TYPE.POST,
              })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file) =>
                onUploadSuccsess({
                  ref: 'post_excel_template_dropzone',
                  file,
                })
            "
          ></v-dropzone>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Category excel template')"></span>
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-dropzone
            ref="category_excel_template_dropzone"
            id="category_excel_template"
            :options="
              uploadExcelTemplateOptions({
                id: system_configuration._id,
                type: EXCEL_TEMPLATE_TYPE.CATEGORY,
              })
            "
            :destroyDropzone="true"
            @vdropzone-success="
              (file) =>
                onUploadSuccsess({
                  ref: 'category_excel_template_dropzone',
                  file,
                })
            "
          ></v-dropzone>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { isEmpty, isNil } from "lodash";
import systemConfigurationMixins from "@/mixins/system-configuration";
import dropzoneMixins from "@/mixins/dropzone";
import { EXCEL_TEMPLATE_TYPE } from "@/constants";

export default {
  name: "BaseUpdateClientData",
  mixins: [systemConfigurationMixins, dropzoneMixins],
  data() {
    return {
      EXCEL_TEMPLATE_TYPE,
    };
  },
  computed: {
    has_data() {
      return (
        !isEmpty(this.system_configuration) && !isNil(this.system_configuration)
      );
    },
  },
  methods: {
    async onUploadSuccsess({ ref, file }) {
      try {
        this.$refs[ref].removeFile(file);

        this.$toast.success(
          this.$t("Updated system configuration successfully")
        );

        await this.GET_LATEST_SYSTEM_CONFIGURATION();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
