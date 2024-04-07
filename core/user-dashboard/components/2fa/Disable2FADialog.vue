<template>
  <Switch2FADialog
    ref="enable2FADialog"
    :icon="'mdi-two-factor-authentication'"
    :message="'An email was sent to you, please check and type confirmation code into the form below.'"
    :submit_function="disable2FA"
  />
</template>

<script>
import authMixins from "@/mixins/auth";
import Switch2FADialog from "@/components/2fa/Switch2FADialog";

export default {
  name: "Enable2FADialog",
  mixins: [authMixins],
  components: { Switch2FADialog },
  methods: {
    async disable2FA() {
      try {
        const payload = {
          code: this.$refs.enable2FADialog.two_fa_code,
        };

        await this.DISABLE_2FA({ data: payload });

        this.$toast.success(this.$t(`Disabled 2FA successfully`));

        await this.GET_ME();
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t(`Invalid or expired code`));
      }
    },
  },
  async fetch() {
    try {
      await this.DISABLE_2FA_CONFIRMATION();
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
