<template>
  <BaseResetPasswordForm />
</template>

<script>
import BaseResetPasswordForm from "@/components/auth/reset-password/BaseResetPasswordForm";

export default {
  name: "ResetPasswordPage",
  middleware: ["redirect-logged-user"],
  components: { BaseResetPasswordForm },
  head() {
    return {
      title: this.$t("Reset password"),
    };
  },
};
</script>
