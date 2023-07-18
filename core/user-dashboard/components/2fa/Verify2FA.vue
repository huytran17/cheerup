<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <div class="text-h6">
          <span
            class="app-body"
            v-html="$t('Two-Factor Authentication')"
          ></span>
        </div>
        <div class="text-body-2">
          <span
            class="app-body"
            v-html="
              $t(
                'Open your authenticator app and enter the 6 digit code to proceed with the authentication'
              )
            "
          ></span>
        </div>
      </v-col>
      <v-col cols="12">
        <!-- <v-text-field
          v-model="two_fa_code"
          class="pt-0"
          :label="$t('Confirmation code')"
          :placeholder="$t('XXXXXX')"
          :rules="twoFACodeRules"
        >
        </v-text-field> -->
        <OtpInput
          class="mx-auto"
          type="number"
          inputClasses="otp-input"
          @change="onChangeOtp"
          @complete="onCompleteOtp"
        />
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn
          tile
          depressed
          class="mr-1 white--text"
          color="brick"
          :disabled="!two_fa_code"
          @click="verify2FA"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import authMixins from "@/mixins/auth";

export default {
  name: "Verify2FA",
  middleware: ["redirect-logged-user"],
  mixins: [authMixins],
  data() {
    return {
      two_fa_code: null,
    };
  },
  computed: {
    ...mapGetters({
      after_login_redirect_url: "after_login_redirect_url",
    }),
  },
  methods: {
    ...mapMutations({
      SET_AFTER_LOGIN_REDIRECT_URL: "SET_AFTER_LOGIN_REDIRECT_URL",
    }),

    async verify2FA() {
      try {
        const payload = {
          code: this.two_fa_code,
          email: this.me.email,
        };

        await this.VERIFY_2FA({ data: payload });

        localStorage.setItem("access_token", this.access_token);

        await this.GET_ME();

        this.$router.push(this.localePath(this.after_login_redirect_url));
        this.SET_AFTER_LOGIN_REDIRECT_URL({ data: "/" });
      } catch (error) {
        console.error(error);
      }
    },

    onChangeOtp(code) {
      Number(code) < 1e5 && (this.two_fa_code = null);
    },

    onCompleteOtp(code) {
      this.two_fa_code = code;
    },

    validateOtp() {},
  },
};
</script>
<style scoped>
:deep(.simple-otp-input) {
  gap: 4px;
}
:deep(.otp-input) {
  border: 1px solid var(--color-grey);
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
:deep(.otp-input:focus-visible) {
  outline: 1px solid var(--color-brick);
}
:deep(.otp-input::-webkit-outer-spin-button),
:deep(.otp-input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

:deep(.otp-input[type="number"]) {
  -moz-appearance: textfield;
}
</style>
