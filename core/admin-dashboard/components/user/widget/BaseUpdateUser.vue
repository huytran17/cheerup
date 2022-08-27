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
              <span class="app-title" v-html="$t('User Meta')"></span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :value="user.email"
              :label="$t('Email')"
              @input="
                updateUserObject({ variable_path: 'email', data: $event })
              "
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :value="user.full_name"
              :label="$t('Full Name')"
              @input="
                updateUserObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :input-value="user.is_blocked_comment"
              :label="$t('Block comment for this user')"
              @change="
                updateUserObject({
                  variable_path: 'is_blocked_comment',
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
              ref="avatar_dropzone"
              id="avatar"
              :options="
                getDropzoneOptions({
                  upload_url: user_upload_avatar_url,
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
              v-if="user_avatar_url"
              :src="user_avatar_url"
              :alt="user.full_name"
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
              @click="updateUser"
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
              <span class="app-title" v-html="$t('User Security')"></span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password')"
              :type="show_password ? 'text' : 'password'"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_password = !show_password"
              @input="
                updateUserObject({ variable_path: 'password', data: $event })
              "
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password Confirmation')"
              :type="show_password_confirmation ? 'text' : 'password'"
              :append-icon="
                show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append="
                show_password_confirmation = !show_password_confirmation
              "
              @input="
                updateUserObject({
                  variable_path: 'password_confirmation',
                  data: $event,
                })
              "
              :rules="passwordConfirmationRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              :disabled="!security_form_valid"
              @click="updateUserSecurity"
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
import userMixins from "@/mixins/user";
import { S3_UPLOAD_URL_TYPES } from "@/constants";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateUser",
  mixins: [userMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      security_form_valid: false,
      show_password_confirmation: false,
      show_password: false,
    };
  },
  computed: {
    user_upload_avatar_url() {
      return `${S3_UPLOAD_URL_TYPES.USER_AVATAR}/${this.$route.params.id}`;
    },

    user_avatar_url() {
      return _.get(this.user, "avatar_url");
    },
  },
  methods: {
    async updateUser() {
      try {
        const final_user_details = _.omit(this.user, [
          "password",
          "password_confirmation",
          "hash_password",
        ]);

        const updated_user = await this.UPDATE_USER({
          data: final_user_details,
        });

        this.SET_USER({ data: updated_user });
        this.$toast.success("Updated user successfully");
        this.$router.push(this.localePath(`/user/${updated_user._id}`));
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating user");
      }
    },

    async updateUserSecurity() {
      try {
        const final_user_details = _.pick(this.user, [
          "_id",
          "password",
          "password_confirmation",
        ]);

        const updated_user = await this.UPDATE_USER_PASSWORD({
          data: final_user_details,
        });

        this.SET_USER({ data: updated_user });
        this.$toast.success("Updated user password successfully");
        this.$router.push(this.localePath(`/user/${updated_user._id}`));
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating user password");
      }
    },

    onUploadAvatarSuccsess({ file, response }) {
      this.$refs.avatar_dropzone.removeFile(file);

      const { data: updated_user } = response;
      const updated_user_data = Object.assign({}, this.user, {
        avatar: updated_user.avatar,
        avatar_url: updated_user.avatar_url,
      });

      this.SET_USER({ data: updated_user_data });
      this.$toast.success("Updated user avatar successfully");
    },
  },
  async fetch() {
    try {
      this.loading = true;
      await this.GET_USER({ id: this.$route.params.id });
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