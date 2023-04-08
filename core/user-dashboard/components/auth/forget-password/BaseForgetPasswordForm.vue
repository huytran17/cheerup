<template>
  <v-form>
    <v-row class="soft-box-shadow">
      <v-col cols="12">
        <div class="text-body-2">
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
          filled
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
          :disabled="loading"
          @click="getVerificationCode"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <div class="text-body-2">
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
      <v-col cols="12">
        <v-text-field
          :label="$t('Enter verification code')"
          filled
          :rules="verifycationCodeRules"
          :value="password_reset.security_code"
          @input="
            updatePasswordResetObject({
              variable_path: 'security_code',
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
          @click="verifySecurityCode"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import passwordResetMixins from "@/mixins/password-reset";

export default {
  name: "BaseForgetPasswordForm",
  mixins: [passwordResetMixins],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async getVerificationCode() {
      try {
        this.loading = true;
        const data = {
          email: this.password_reset?.email,
        };

        this.password_reset?.email &&
          (await this.CREATE_PASSWORD_RESET({ data }));

        this.$toast.success(
          this.$t("The security code was sent to your email")
        );
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while sending the security code")
        );
      } finally {
        this.loading = false;
      }
    },

    async verifySecurityCode() {
      try {
        if (!this.password_reset?.security_code) {
          return;
        }

        this.loading = true;

        const password_reset = await this.GET_PASSWORD_RESET_BY_CODE({
          security_code: this.password_reset?.security_code,
        });

        localStorage.setItem(
          "verification_token",
          password_reset.verification_token
        );

        this.$router.push(this.localePath("/reset-password"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("The security code is invalid or has been expired")
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
