<template>
  <Switch2FADialog
    ref="enable2FADialog"
    :icon="'mdi-email-heart-outline'"
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
        await this.DISABLE_2FA();
        await this.GET_ME();

        this.$emit("close-2fa-modal");
      } catch (error) {
        console.error(error);
      }
    },
  },
  fetch() {
    console.log("---------------okk");
  },
};
</script>

<style scoped>
.two-fa-confirmation-dialog {
  background: var(--color-white);
  margin: 0;
}
</style>
