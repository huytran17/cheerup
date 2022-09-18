<template>
  <v-form v-model="form_valid">
    <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
      <v-col cols="12" class="pb-0">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title" v-html="$t('Email Verification')"></span>
        </div>
      </v-col>
      <v-col v-if="!me.is_email_verified" cols="12">
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
        <v-btn
          depressed
          tile
          color="black"
          class="white--text mt-4"
          @click="getEmailVerificationCode"
        >
          <div class="text-body-2">
            <span class="app-body" v-html="$t('Get Verification Code')"></span>
          </div>
        </v-btn>
        <v-row class="pt-4">
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('Enter Code')"
              @input="SET_VERIFICATION_CODE({ data: $event })"
              :rules="verificationCodeRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-end pb-0">
            <v-btn
              depressed
              tile
              color="black"
              class="white--text"
              :disabled="!form_valid"
              @click="verifyEmail"
            >
              <span class="app-body" v-html="$t('Verify')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else>
        <div
          class="text-body-2 px-1 d-flex green accent-3 py-3 px-4 flex-column justify-center"
        >
          <span
            class="app-body"
            v-html="$t('Your email has been verified!')"
          ></span>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from "@/mixins/auth";
import emailVerificationMixins from "@/mixins/email-verification";
import userMixins from "@/mixins/user";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseVerifyEmail",
  mixins: [authMixins, userMixins, dropzoneMixins, emailVerificationMixins],
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
        await this.SEND_VERIFICATION_CODE();
      } catch (err) {
        console.error(err);
      } finally {
        this.$toast.success(
          this.$t("Please check your email and follow the instructions")
        );
      }
    },

    async verifyEmail() {
      try {
        await this.VERIFY_EMAIL({
          data: {
            verification_code: this.verification_code,
          },
        });
      } catch (err) {
        console.error(err);
        this.$toast.success(
          this.$t("The security code is incorrect or has expired")
        );
      }
    },
  },
};
</script>

<style></style>
