<template>
  <BaseForgetPasswordForm />
</template>

<script>
import BaseForgetPasswordForm from "@/components/auth/forget-password/BaseForgetPasswordForm";

export default {
  name: "ForgetPassword",
  layout: "public",
  middleware: ["redirect-logged-user"],
  components: { BaseForgetPasswordForm },
  head() {
    return {
      title: this.$t("Forget password"),
    };
  },
};
</script>
