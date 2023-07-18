<template>
  <Verify2FA />
</template>

<script>
import Verify2FA from "@/components/2fa/Verify2FA";

export default {
  name: "TFAVerification",
  middleware: ["redirect-logged-user"],
  components: { Verify2FA },
};
</script>
