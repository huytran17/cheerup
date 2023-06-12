<template>
  <v-form v-model="form_valid">
    <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
      <v-col cols="12" class="pb-0">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title" v-html="$t('Security')"></span>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('Current Password')"
          :type="show_password ? 'text' : 'password'"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
          @input="updateUserObject({ variable_path: 'password', data: $event })"
          :rules="passwordRules"
          :disabled="is_socialite_account"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('New Password')"
          :type="show_new_password ? 'text' : 'password'"
          :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_new_password = !show_new_password"
          @input="
            updateUserObject({ variable_path: 'new_password', data: $event })
          "
          :rules="newPasswordRules"
          :disabled="is_socialite_account"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('New Password Confirmation')"
          :type="show_password_confirmation ? 'text' : 'password'"
          :append-icon="show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="
            show_password_confirmation = !show_password_confirmation
          "
          @input="
            updateUserObject({
              variable_path: 'password_confirmation',
              data: $event,
            })
          "
          :rules="newPasswordConfirmationRules"
          :disabled="is_socialite_account"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-end pb-0">
        <v-btn
          depressed
          tile
          color="brick"
          class="white--text"
          :disabled="!form_valid"
          @click="updateUserSecurity"
        >
          <span class="app-body" v-html="$t('Update')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get, merge } from "lodash";
import authMixins from "@/mixins/auth";
import userMixins from "@/mixins/user";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateUserSecurity",
  mixins: [authMixins, userMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      show_password_confirmation: false,
      show_password: false,
      show_new_password: false,
    };
  },
  computed: {
    is_socialite_account() {
      return !!get(this.me, "socialite.provider");
    },
  },
  methods: {
    async updateUserSecurity() {
      try {
        const { _id } = this.me;
        const final_user_data = merge({}, this.user, {
          _id,
        });

        await this.UPDATE_USER_PASSWORD({ data: final_user_data });
        this.$toast.success(this.$t("Updated password successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error: Check your password and try again")
        );
      }
    },
  },
};
</script>
