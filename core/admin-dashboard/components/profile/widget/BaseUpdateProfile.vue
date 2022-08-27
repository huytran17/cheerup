<template>
  <v-row>
    <v-col cols="12">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
      <v-form v-model="form_valid" class="soft-box-shadow rounded-lg px-4 py-5">
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-1 primary--text">
              <span class="app-title" v-html="$t('Admin Meta')"></span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :value="me.email"
              :label="$t('Email')"
              @input="updateMeObject({ variable_path: 'email', data: $event })"
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :value="me.full_name"
              :label="$t('Full Name')"
              @input="
                updateMeObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              :value="me.type"
              :items="admin_types"
              chips
              disabled
              small-chips
              :label="$t('Type')"
              @input="
                updateMeObject({
                  variable_path: 'type',
                  data: $event,
                })
              "
              :rules="typeRules"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :input-value="me.is_auto_censorship_post"
              :label="$t('Enable Auto Censorship Post')"
              @change="
                updateMeObject({
                  variable_path: 'is_auto_censorship_post',
                  data: $event,
                })
              "
              :false-value="false"
              :true-value="true"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-2">
              <span class="app-body">
                <span v-html="$t('Avatar')"></span>
              </span>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-dropzone
              v-if="has_user"
              ref="avatar_dropzone"
              id="avatar"
              :options="
                getDropzoneOptions({
                  upload_url: admin_upload_avatar_url,
                })
              "
              :destroyDropzone="true"
              @vdropzone-success="
                (file, response) => onUploadAvatarSuccsess({ file, response })
              "
            ></v-dropzone>
          </v-col>

          <v-col cols="12" sm="6">
            <v-img
              v-if="admin_avatar_url"
              :src="admin_avatar_url"
              :alt="me.full_name"
              contain
              max-width="200px"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              :disabled="!form_valid"
              @click="updateAdmin"
            >
              <span v-html="$t('Update')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-form
        v-model="security_form_valid"
        class="soft-box-shadow rounded-lg px-4 py-5 mt-6"
      >
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-1 primary--text">
              <span class="app-title" v-html="$t('Admin Security')"></span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Current Password')"
              :type="show_current_password ? 'text' : 'password'"
              :append-icon="show_current_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_current_password = !show_current_password"
              @input="
                updateMeObject({ variable_path: 'password', data: $event })
              "
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password')"
              :type="show_new_password ? 'text' : 'password'"
              :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_new_password = !show_new_password"
              @input="
                updateMeObject({ variable_path: 'new_password', data: $event })
              "
              :rules="newPasswordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password Confirmation')"
              :type="show_new_password_confirmation ? 'text' : 'password'"
              :append-icon="
                show_new_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append="
                show_new_password_confirmation = !show_new_password_confirmation
              "
              @input="
                updateMeObject({
                  variable_path: 'new_password_confirmation',
                  data: $event,
                })
              "
              :rules="newPasswordConfirmationRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              :disabled="!security_form_valid"
              @click="updateAdminSecurity"
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
import { mapActions } from "vuex";
import authMixins from "@/mixins/auth";
import { S3_UPLOAD_URL_TYPES } from "@/constants";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateAdmin",
  mixins: [authMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      security_form_valid: false,
      show_new_password_confirmation: false,
      show_new_password: false,
      show_current_password: false,
    };
  },
  computed: {
    admin_upload_avatar_url() {
      return `${S3_UPLOAD_URL_TYPES.ADMIN_AVATAR}/${this.me._id}`;
    },

    admin_avatar_url() {
      return _.get(this.me, "avatar_url");
    },
  },
  methods: {
    ...mapActions({
      UPDATE_ADMIN: "admin/UPDATE_ADMIN",
    }),

    async updateAdmin() {
      try {
        const final_admin_details = _.omit(this.me, [
          "password",
          "password_confirmation",
          "hash_password",
          "new_password",
          "new_password_confirmation",
        ]);

        const updated_admin = await this.UPDATE_ADMIN({
          data: final_admin_details,
        });

        this.SET_ME({ data: updated_admin });
        this.$toast.success("Updated successfully");
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating your account");
      }
    },

    async updateAdminSecurity() {
      try {
        const final_admin_details = _.pick(this.me, [
          "_id",
          "password",
          "new_password",
          "new_password_confirmation",
        ]);

        const updated_admin = await this.UPDATE_ADMIN_PERSONAL_PASSWORD({
          data: final_admin_details,
        });

        this.SET_ME({ data: updated_admin });
        this.$toast.success("Updated password successfully");
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating your account");
      }
    },

    onUploadAvatarSuccsess({ file, response }) {
      this.$refs.avatar_dropzone.removeFile(file);

      const { data: updated_admin } = response;
      const updated_admin_data = Object.assign({}, this.me, {
        avatar: updated_admin.avatar,
        avatar_url: updated_admin.avatar_url,
      });

      this.SET_ME({ data: updated_admin_data });
      this.$toast.success("Updated avatar successfully");
    },
  },
  async fetch() {
    try {
      this.loading = true;
      await this.GET_ME();
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>