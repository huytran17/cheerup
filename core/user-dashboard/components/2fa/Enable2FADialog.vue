<template>
  <div>
    <Switch2FADialog
      ref="enable2FADialog"
      :icon="'mdi-email-heart-outline'"
      :message="'An email was sent to you, please check and type confirmation code into the form below.'"
      :submit_function="enable2FA"
    />
  </div>
</template>

<script>
import authMixins from "@/mixins/auth";
import Switch2FADialog from "@/components/2fa/Switch2FADialog";

export default {
  name: "Enable2FADialog",
  mixins: [authMixins],
  components: { Switch2FADialog },
  methods: {
    async enable2FA() {
      try {
        const payload = {
          code: this.$refs.enable2FADialog.two_fa_code,
        };

        const tfa_data = await this.ENABLE_2FA({ data: payload });
        await this.GET_ME();

        this.$toast.success(this.$t(`Enabled 2FA successfully`));

        const qr_payload = {
          qr_uri: tfa_data.qr_uri,
          tfa_secret: tfa_data.tfa_secret,
        };

        this.SET_QR_DATA({ data: qr_payload });

        this.SET_IS_OPEN_2FA_QR_MODAL({ data: true });
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Invalid or expired code`));
      }
    },
  },
  async fetch() {
    try {
      await this.ENABLE_2FA_CONFIRMATION();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.two-fa-confirmation-dialog {
  background: var(--color-white);
  margin: 0;
}
</style>
