<template>
  <div class="mx-auto forget-password-form">
    <v-form v-model="form_valid">
      <v-row class="soft-box-shadow py-4 px-3 mx-1">
        <v-col cols="12 pb-0">
          <div class="text-body-2 text-md-body-1">
            <span
              class="app-body"
              v-html="
                $t(
                  'Enter your email and press the submit button to receive the verification code.'
                )
              "
            ></span>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :label="$t('Enter your email')"
            :rules="emailRules"
            :value="password_reset.email"
            @input="
              updatePasswordResetObject({
                variable_path: 'email',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end pt-0">
          <v-btn
            color="brick"
            class="white--text"
            tile
            depressed
            :disabled="!form_valid"
            @click="getVerificationCode"
          >
            <span class="app-body" v-html="$t('Submit')"></span>
          </v-btn>
        </v-col>

        <v-col cols="12 pb-0">
          <div class="text-body-2 text-md-body-1">
            <span
              class="app-body"
              v-html="
                $t(
                  'Then enter the confirmation code in the form below to authenticate.'
                )
              "
            ></span>
          </div>
        </v-col>
        <v-col cols="12" class="otp">
          <v-otp-input
            :disabled="is_app_loading"
            @finish="verifySecurityCode"
          ></v-otp-input>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import passwordResetMixins from "@/mixins/password-reset";

export default {
  name: "BaseForgetPasswordForm",
  mixins: [passwordResetMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  computed: {
    ...mapGetters({
      is_app_loading: "is_app_loading",
    }),
  },
  methods: {
    async getVerificationCode() {
      try {
        if (!this.form_valid) {
          return;
        }

        const data = {
          email: this.password_reset?.email,
        };

        if (data.email) {
          await this.CREATE_PASSWORD_RESET({ data });
        }

        this.$toast.success(
          this.$t("The security code was sent to your email")
        );
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while sending the security code")
        );
      }
    },

    async verifySecurityCode(otp) {
      try {
        const password_reset = await this.GET_PASSWORD_RESET_BY_CODE({
          security_code: otp,
        });

        if (!password_reset) {
          return this.$toast.error(
            this.$t("Encountered error while verifying the security code")
          );
        }

        this.$router.push(this.localePath("/reset-password"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("The security code is invalid or has been expired")
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.forget-password-form {
  max-width: toRem(516);
  margin-bottom: toRem(50);
}
</style>
