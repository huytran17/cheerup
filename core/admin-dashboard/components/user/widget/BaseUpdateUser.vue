<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="form_valid" class="soft-box-shadow rounded-lg px-4 py-5">
        <v-row>
          <v-col cols="12" class="pb-2">
            <div class="text-body-1 brick--text">
              <h3 class="app-title">{{ $t("Information") }}</h3>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :value="user.email"
              :label="$t('Email')"
              @input="updateUserObject({ path: 'email', data: $event })"
              disabled
              outlined
              color="brick"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :value="user.full_name"
              :label="$t('Fullname')"
              @input="updateUserObject({ path: 'full_name', data: $event })"
              :rules="fullnameRules"
              outlined
              color="brick"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :input-value="user.is_blocked_comment"
              :label="$t('Block comment for this user')"
              @change="
                updateUserObject({ path: 'is_blocked_comment', data: $event })
              "
              :false-value="false"
              :true-value="true"
              outlined
              color="brick"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-2">
              <span>
                {{ $t("Avatar") }}
              </span>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-dropzone
              ref="avatar_dropzone"
              id="avatar"
              :options="uploadUserAvatarOptions({ id: $route.params.id })"
              :destroyDropzone="true"
              @vdropzone-success="(file) => onUploadAvatarSuccsess({ file })"
            ></v-dropzone>
          </v-col>

          <v-col cols="12" sm="6">
            <v-img
              :src="user.avatar_url"
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
              color="brick"
              class="white--text"
              tile
              :disabled="!form_valid"
              @click="updateUser"
            >
              {{ $t("Update") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-form
        v-model="security_form_valid"
        class="soft-box-shadow rounded-lg px-4 py-5 mt-6"
      >
        <v-row>
          <v-col cols="12" class="pb-2">
            <div class="text-body-1 brick--text">
              <h3 class="app-title">{{ $t("Security") }}</h3>
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
              @input="updateUserObject({ path: 'password', data: $event })"
              :rules="passwordRules"
              :disabled="is_socialite_account"
              outlined
              color="brick"
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
                  path: 'password_confirmation',
                  data: $event,
                })
              "
              :rules="passwordConfirmationRules"
              :disabled="is_socialite_account"
              outlined
              color="brick"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="brick"
              class="white--text"
              tile
              :disabled="!security_form_valid"
              @click="updateUserSecurity"
            >
              {{ $t("Update") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { get, omit, pick } from "lodash";
import userMixins from "@/mixins/user";
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
    is_socialite_account() {
      return !!get(this.user, "socialite.provider");
    },
  },
  methods: {
    async updateUser() {
      try {
        const final_user_details = omit(this.user, [
          "password",
          "password_confirmation",
          "hash_password",
        ]);

        await this.UPDATE_USER({
          data: final_user_details,
        });

        this.$toast.success(this.$t("Updated user successfully"));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating user"));
      }
    },

    async updateUserSecurity() {
      try {
        const final_user_details = pick(this.user, [
          "_id",
          "password",
          "password_confirmation",
        ]);

        await this.UPDATE_USER_PASSWORD({
          data: final_user_details,
        });

        this.$toast.success(this.$t("Updated user password successfully"));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating user password")
        );
      }
    },

    async onUploadAvatarSuccsess({ file }) {
      try {
        this.$refs.avatar_dropzone.removeFile(file);

        this.$toast.success(this.$t("Updated user avatar successfully"));

        await this.$fetch();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async fetch() {
    try {
      await this.GET_USER({ id: this.$route.params.id });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
