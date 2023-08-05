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
        <OtpInput
          v-otp-auto-focus
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
          small
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
import { isNumber } from "lodash";
import authMixins from "@/mixins/auth";

export default {
  name: "Verify2FA",
  mixins: [authMixins],
  data() {
    return {
      two_fa_code: null,
    };
  },
  methods: {
    async verify2FA() {
      try {
        const payload = {
          code: this.two_fa_code,
          email: this.me.email,
        };

        await this.VERIFY_2FA({ data: payload });

        localStorage.setItem("access_token", this.access_token);

        await this.GET_ME();

        this.$router.push(this.localePath("/"));
      } catch (error) {
        console.error(error);
      }
    },

    onChangeOtp(code) {
      const invalid_code = !isNumber(Number(code)) || Number(code) < 1e5;
      invalid_code && (this.two_fa_code = null);
    },

    onCompleteOtp(code) {
      const invalid_code = !isNumber(Number(code)) || Number(code) < 1e5;
      !invalid_code && (this.two_fa_code = code);
    },
  },
};
</script>
