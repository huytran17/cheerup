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
              :value="admin.email"
              :label="$t('Email')"
              @input="
                updateAdminObject({ variable_path: 'email', data: $event })
              "
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :value="admin.full_name"
              :label="$t('Fullname')"
              @input="
                updateAdminObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              :value="admin.type"
              :items="admin_types"
              chips
              small-chips
              :label="$t('Type')"
              @input="
                updateAdminObject({
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
              :input-value="admin.is_auto_censorship_post"
              :label="$t('Enable auto censorship post')"
              @change="
                updateAdminObject({
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
              ref="avatar_dropzone"
              id="avatar"
              :options="uploadAdminAvatarOptions({ id: admin._id })"
              :destroyDropzone="true"
              @vdropzone-success="
                (file, response) => onUploadAvatarSuccsess({ file, response })
              "
            ></v-dropzone>
          </v-col>

          <v-col cols="12" sm="6">
            <v-img
              :src="admin.avatar_url"
              :alt="admin.full_name"
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
              :label="$t('New Password')"
              :type="show_password ? 'text' : 'password'"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_password = !show_password"
              @input="
                updateAdminObject({ variable_path: 'password', data: $event })
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
                updateAdminObject({
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
import { omit, pick } from "lodash";

import adminMixins from "@/mixins/admin";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateAdmin",
  mixins: [adminMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      security_form_valid: false,
      show_password_confirmation: false,
      show_password: false,
    };
  },
  methods: {
    async updateAdmin() {
      try {
        const final_admin_details = omit(this.admin, [
          "password",
          "password_confirmation",
          "hash_password",
        ]);

        const updated_admin = await this.UPDATE_ADMIN({
          data: final_admin_details,
        });

        this.SET_ADMIN({ data: updated_admin });
        this.$toast.success(this.$t("Updated admin successfully"));
        this.$router.push(this.localePath(`/admin/${updated_admin._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating admin"));
      }
    },

    async updateAdminSecurity() {
      try {
        const final_admin_details = pick(this.admin, [
          "_id",
          "password",
          "password_confirmation",
        ]);

        const updated_admin = await this.UPDATE_ADMIN_PASSWORD({
          data: final_admin_details,
        });

        this.SET_ADMIN({ data: updated_admin });
        this.$toast.success(this.$t("Updated admin password successfully"));
        this.$router.push(this.localePath(`/admin/${updated_admin._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating admin password")
        );
      }
    },

    onUploadAvatarSuccsess({ file, response }) {
      this.$refs.avatar_dropzone.removeFile(file);

      const { data: updated_admin } = response;
      const updated_admin_data = Object.assign({}, this.admin, {
        avatar: updated_admin.avatar,
        avatar_url: updated_admin.avatar_url,
      });

      this.SET_ADMIN({ data: updated_admin_data });
      this.$toast.success(this.$t("Updated admin avatar successfully"));
    },
  },
  async fetch() {
    try {
      await this.GET_ADMIN({ id: this.$route.params.id });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>
