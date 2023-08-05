<template>
  <v-dialog :value="is_open_2fa_modal" max-width="500" persistent>
    <v-row class="two-fa-confirmation-dialog">
      <v-col cols="12" class="text-center pb-0">
        <v-icon color="brick" :size="icon_size">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2">
          <span class="app-body" v-html="$t(message)"></span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-form>
          <OtpInput
            v-otp-auto-focus
            class="mx-auto"
            type="number"
            inputClasses="otp-input"
            @change="onChangeOtp"
            @complete="onCompleteOtp"
          />
        </v-form>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn text tile depressed class="mr-1" @click="closeModal">
          <span class="app-body" v-html="$t('Cancel')"></span>
        </v-btn>
        <v-btn
          color="brick"
          class="white--text"
          tile
          depressed
          :disabled="!two_fa_code"
          @click="submit_function"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import { isNumber } from "lodash";
import authMixins from "@/mixins/auth";

export default {
  name: "Switch2FADialog",
  mixins: [authMixins],
  props: {
    icon: {
      type: String,
      default: () => "",
    },
    icon_size: {
      type: Number,
      default: () => 40,
    },
    message: {
      type: String,
      default: () => "",
    },
    submit_function: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      two_fa_code: null,
    };
  },

  methods: {
    closeModal() {
      this.two_fa_code = null;
      this.SET_IS_OPEN_2FA_MODAL({ data: false });
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

<style scoped>
.two-fa-confirmation-dialog {
  background: var(--color-white);
  margin: 0;
}
</style>
