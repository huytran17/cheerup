<template>
  <v-dialog :value="is_open_2fa_verify_modal" max-width="500" persistent>
    <v-form class="verify-2fa-form">
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
        <v-col cols="12" class="otp">
          <v-otp-input
            :disabled="is_app_loading"
            type="number"
            @finish="verify2FA"
          ></v-otp-input>
        </v-col>
      </v-row> </v-form
  ></v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import authMixins from "@/mixins/auth";

export default {
  name: "Verify2FADialog",
  mixins: [authMixins],
  computed: {
    ...mapGetters({
      is_app_loading: "is_app_loading",
    }),
  },
  methods: {
    async verify2FA(otp) {
      try {
        await this.VERIFY_2FA({
          data: {
            code: otp,
            email: this.$route.query?.email,
          },
        });

        await this.GET_ME();

        this.$router.push(this.localePath("/"));
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.verify-2fa-form {
  background: var(--color-white);
  padding: toRem(24);
}
</style>
