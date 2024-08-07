<template>
  <v-row v-if="has_data" class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
    <v-col cols="12" class="pt-0 pb-2">
      <div class="text-body-1 brick--text">
        <h3 class="app-title">{{ $t("Client Meta") }}</h3>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        outlined
        color="brick"
        :value="system_configuration.owner?.name"
        :label="$t('Owner Name')"
        @input="
          updateSystemConfigurationObject({ path: 'owner.name', data: $event })
        "
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <div class="text-body-2 mb-2">
        <span>
          {{ $t("Owner Description") }}
        </span>
      </div>
      <TiptapEditor
        :content="system_configuration.owner"
        attr="description"
        @on-input="
          updateSystemConfigurationObject({
            path: 'owner.description',
            data: $event,
          })
        "
      />
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="text-body-2">
            <span>
              {{ $t("Owner Avatar") }}
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
            <span>
              {{ $t("Thumbnail") }}
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
            <span>
              {{ $t("Folder icon") }}
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
            <span>
              {{ $t("Admin excel template") }}
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
            <span>
              {{ $t("User excel template") }}
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
