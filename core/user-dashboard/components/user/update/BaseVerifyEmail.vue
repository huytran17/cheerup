<template>
  <v-form v-model="form_valid">
    <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
      <v-col cols="12" class="pb-0">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title" v-html="$t('Email Verification')"></span>
        </div>
      </v-col>
      <v-col cols="12">
        <div
          class="text-body-2 px-1 d-flex amber lighten-2 py-3 px-4 flex-column justify-center"
        >
          <span
            class="app-body"
            v-html="
              $t(
                'Your email is not verified, please verify your email to use other system features'
              )
            "
          ></span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          depressed
          tile
          color="black"
          class="white--text"
          @click="getEmailVerificationCode"
        >
          <div class="text-body-2">
            <span class="app-body" v-html="$t('Get Verification Code')"></span>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('Current Password')"
          :type="show_password ? 'text' : 'password'"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
          @input="updateUserObject({ variable_path: 'password', data: $event })"
          :rules="passwordRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-end pb-0">
        <v-btn
          depressed
          tile
          color="black"
          class="white--text"
          :disabled="!form_valid"
          @click="updateUserSecurity"
        >
          <span class="app-body" v-html="$t('Verify')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from "@/mixins/auth";
import userMixins from "@/mixins/user";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseVerifyEmail",
  mixins: [authMixins, userMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      show_password_confirmation: false,
      show_password: false,
      show_new_password: false,
    };
  },
  methods: {
    async getEmailVerificationCode() {
      try {
      } catch (err) {
        console.error(err);
      }
    },

    async updateUserSecurity() {
      try {
        const { _id } = this.me;
        const final_user_data = Object.assign({}, this.user, {
          _id,
        });

        await this.UPDATE_USER_PASSWORD({ data: final_user_data });
        this.$toast.success(this.$t("Updated password successfully"));
      } catch (err) {
        console.error(err);
        this.$toast.error(
          this.$t("Encountered error: Check your password and try again")
        );
      }
    },
  },
};
</script>

<style></style>
