<template>
  <v-dialog :value="is_open_2fa_modal" max-width="500" persistent>
    <v-row class="two-fa-confirmation-dialog">
      <v-col cols="12" class="text-center pb-0">
        <v-icon color="brick" size="40">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2">
          <span class="app-body" v-html="$t(message)"></span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-form v-model="form_valid">
          <v-text-field
            v-model="two_fa_code"
            class="pt-0"
            :label="$t('Confirmation code')"
            :rules="twoFACodeRules"
          >
          </v-text-field>
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
          :disabled="!form_valid"
          @click="submit_function"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
  name: "Switch2FADialog",
  mixins: [authMixins],
  props: {
    icon: {
      type: String,
      default: () => "",
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
      two_fa_code: "",
      form_valid: false,
    };
  },

  methods: {
    closeModal() {
      this.two_fa_code = "";
      this.SET_IS_OPEN_2FA_MODAL({ data: false });
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
