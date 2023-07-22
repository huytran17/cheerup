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
import { isNumber } from "lodash";
import { mapGetters, mapMutations } from "vuex";
import authMixins from "@/mixins/auth";

export default {
  name: "Verify2FA",
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
      const invalid_code = !isNumber(Number(code)) || Number(code) < 1e5;
      invalid_code && (this.two_fa_code = null);
    },

    onCompleteOtp(code) {
      const invalid_code = !isNumber(Number(code)) || Number(code) < 1e5;
      !invalid_code && (this.two_fa_code = code);
    },
  },
  mounted() {
    const otp_inputs = document.getElementsByClassName("otp-input");
    otp_inputs[0]?.focus();
  },
};
</script>
