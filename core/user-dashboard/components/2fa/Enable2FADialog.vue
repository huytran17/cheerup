<template>
  <Switch2FADialog
    ref="enable2FADialog"
    :icon="'mdi-email-heart-outline'"
    :message="'An email was sent to you, please check and type confirmation code into the form below.'"
    :submit_function="enable2FA"
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
    async enable2FA() {
      try {
        const payload = {
          code: this.$refs.enable2FADialog.two_fa_code,
        };

        await this.ENABLE_2FA({ data: payload });
        await this.GET_ME();

        this.$emit("close-2fa-modal");
      } catch (error) {
        console.error(error);
      }
    },
  },
  fetch() {
    console.log("---------------ok");
  },
};
</script>

<style scoped>
.two-fa-confirmation-dialog {
  background: var(--color-white);
  margin: 0;
}
</style>
