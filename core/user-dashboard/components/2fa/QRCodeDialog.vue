<template>
  <v-dialog :value="is_open_2fa_qr_modal" max-width="500" persistent>
    <v-row class="tfa-qr-dialog">
      <v-col cols="12" class="text-center pb-0">
        <v-icon color="brick" size="40">mdi-two-factor-authentication</v-icon>
      </v-col>
      <v-col cols="12" class="pb-0">
        <div class="text-body-2">
          <span
            class="app-body"
            v-html="$t('Open your authenticator app and scan this QR code:')"
          ></span>
          <v-img
            :src="qr_data.qr_uri"
            :alt="$t('2fa_qr')"
            max-width="100"
            max-height="100"
            class="mx-auto mt-3"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2">
          <span
            class="app-body"
            v-html="
              $t(
                'Then save the secret code used to recover the authentication code in case of device loss or damage:'
              )
            "
          ></span>
          <strong
            ><span>{{ qr_data.tfa_secret }}</span></strong
          >
          <v-btn icon>
            <v-icon color="brick" @click="exportTfaSecret">mdi-download</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn
          color="brick"
          class="white--text"
          tile
          depressed
          :disabled="!can_close"
          @click="closeModal"
        >
          <span class="app-body" v-html="$t('Done')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { get } from "lodash";

export default {
  name: "QRCodeDialog",
  data() {
    return {
      can_close: false,
    };
  },
  computed: {
    ...mapGetters({
      is_open_2fa_qr_modal: "auth/is_open_2fa_qr_modal",
      qr_data: "auth/qr_data",
    }),
  },

  methods: {
    ...mapMutations({
      SET_IS_OPEN_2FA_QR_MODAL: "auth/SET_IS_OPEN_2FA_QR_MODAL",
    }),

    closeModal() {
      this.can_close = false;
      this.SET_IS_OPEN_2FA_QR_MODAL({ data: false });
    },

    exportTfaSecret() {
      try {
        const link = document.createElement("a");

        const data_blob = new Blob([get(this.qr_data, "tfa_secret", "")]);

        link.href = window.URL.createObjectURL(data_blob, {
          type: "text/plain;charset=utf-8;",
        });

        const file_name = `${process.env.APP_NAME}-2FA-SECRET`.toUpperCase();
        link.setAttribute("download", `${file_name}.txt`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.can_close = true;
      } catch (error) {
        console.error(error);
      }
    },
  },

  fetch() {
    this.can_close = false;
  },
};
</script>

<style scoped>
.tfa-qr-dialog {
  background: var(--color-white);
  margin: 0;
}
</style>
