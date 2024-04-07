<template>
  <v-row>
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
              :label="$t('Fullname')"
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
              :options="uploadAdminAvatarOptions({ id: me._id })"
              :destroyDropzone="true"
              @vdropzone-success="(file) => onUploadAvatarSuccsess({ file })"
            ></v-dropzone>
          </v-col>

          <v-col cols="12" sm="6">
            <v-img
              :src="me.avatar_url"
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
              @click="updateInfo"
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
              @click="updateSecurity"
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
import authMixins from "@/mixins/auth";
import adminMixins from "@/mixins/admin";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateAdmin",
  mixins: [authMixins, dropzoneMixins, adminMixins],
  data() {
    return {
      form_valid: false,
      security_form_valid: false,
      show_new_password_confirmation: false,
      show_new_password: false,
      show_current_password: false,
    };
  },
  methods: {
    async updateInfo() {
      try {
        await this.UPDATE_ADMIN({
          data: this.me,
        });

        await this.GET_ME();

        this.$toast.success(this.$t("Updated successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating your account")
        );
      }
    },

    async updateSecurity() {
      try {
        await this.UPDATE_ADMIN_PERSONAL_PASSWORD({
          data: this.me,
        });

        await this.GET_ME();

        this.$toast.success(this.$t("Updated password successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating your account")
        );
      }
    },

    async onUploadAvatarSuccsess({ file }) {
      try {
        this.$refs.avatar_dropzone.removeFile(file);

        this.$toast.success(this.$t("Updated avatar successfully"));

        await this.GET_ME();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>
