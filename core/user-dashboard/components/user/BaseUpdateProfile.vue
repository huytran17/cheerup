<template>
  <div class="mt-15">
    <v-form v-model="form_valid">
      <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
        <v-col cols="12" class="py-0">
          <div class="text-body-1 primary--text">
            <span class="app-title" v-html="$t('Personal Information')"></span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="me.full_name"
            :rules="fullnameRules"
            :label="$t('Full Name')"
            @input="
              updateUserbject({
                variable_path: 'full_name',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="me.email"
            :disabled="true"
            :label="$t('Email')"
            @input="
              updateUserObject({
                variable_path: 'email',
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
                  <span v-html="$t('Avatar')"></span>
                </span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-dropzone
                ref="user_avatar_dropzone"
                id="admin_logo"
                :options="
                  getDropzoneOptions({
                    upload_url: user_upload_avatar_url,
                  })
                "
                :destroyDropzone="true"
                @vdropzone-success="
                  (file, response) =>
                    onUploadSuccsess({
                      ref: 'user_avatar_dropzone',
                      file,
                      response,
                      update_paths: ['avatar', 'user_avatar_url'],
                    })
                "
              ></v-dropzone>
            </v-col>

            <v-col cols="12" md="6">
              <v-img
                v-if="user_avatar_url"
                :src="user_avatar_url"
                :alt="me.full_name"
                contain
                max-width="200px"
                class="mx-auto"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import authMixins from "@/mixins/auth";
import userMixins from "@/mixins/user";
import dropzoneMixins from "@/mixins/dropzone";
import { S3_UPLOAD_URL_TYPES } from "@/constants";

export default {
  name: "BaseUpdateProfile",
  mixins: [authMixins, userMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  computed: {
    user_upload_avatar_url() {
      return this.getUploadUrl({
        base_url: S3_UPLOAD_URL_TYPES.USER_AVATAR,
      });
    },

    user_avatar_url() {
      return _.get(this.me, "avatar_url");
    },

    user_id() {
      return _.get(this.me, "_id");
    },
  },
  methods: {
    getUploadUrl({ base_url }) {
      return `${base_url}/${this.user_id}`;
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
};
</script>

<style></style>
