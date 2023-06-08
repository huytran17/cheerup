<template>
  <v-form v-if="has_user" v-model="form_valid">
    <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
      <v-col cols="12" class="py-0">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title" v-html="$t('Personal Information')"></span>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :value="me.full_name"
          :rules="fullnameRules"
          :label="$t('Fullname')"
          @input="
            updateMeObject({
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
        ></v-text-field>
      </v-col>
      <v-col v-if="has_user" cols="12">
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
              :options="uploadUserAvatarOptions({ id: me._id })"
              :destroyDropzone="true"
              @vdropzone-success="
                (file, response) =>
                  onUploadSuccsess({
                    file,
                    response,
                    update_paths: ['avatar', 'avatar_url'],
                  })
              "
            ></v-dropzone>
          </v-col>

          <v-col cols="12" md="6">
            <v-img
              :src="user.avatar_url"
              :alt="me.full_name"
              contain
              max-width="200px"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="d-flex justify-end pb-0 pt-4">
        <v-btn
          depressed
          tile
          color="black"
          class="white--text"
          @click="updateUser"
          :disabled="!form_valid"
        >
          <span class="app-body" v-html="$t('Save')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { merge } from "lodash";
import authMixins from "@/mixins/auth";
import userMixins from "@/mixins/user";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateUserInformation",
  mixins: [authMixins, userMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async updateUser() {
      try {
        await this.UPDATE_USER({ data: this.me });
        this.$toast.success(this.$t("Updated profile successfully"));
      } catch (error) {
        console.error(error);
      }
    },

    onUploadSuccsess({ file, response, update_paths }) {
      this.$refs.user_avatar_dropzone.removeFile(file);

      const { data: updated_user } = response;

      let updated_thumbnail_data = merge({}, this.me);

      update_paths.forEach((update_path) => {
        updated_thumbnail_data = merge({}, this.me, {
          [update_path]: updated_user[update_path],
        });
      });

      this.SET_ME({ data: updated_thumbnail_data });
      this.$toast.success(this.$t("Updated profile successfully"));
    },
  },
};
</script>
