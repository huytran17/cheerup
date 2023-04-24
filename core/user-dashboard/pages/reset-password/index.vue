<template>
  <BaseResetPasswordForm />
</template>

<script>
import BaseResetPasswordForm from "@/components/auth/reset-password/BaseResetPasswordForm";

export default {
  name: "ResetPassword",
  middleware: ["redirect-logged-user"],
  components: { BaseResetPasswordForm },
  head() {
    return {
      title: this.$t("Reset password"),
    };
  },
};
</script>
