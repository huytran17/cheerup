<template>
  <div class="mt-15">
    <BaseUpdateUserInformation />
    <div class="mt-8">
      <BaseUpdateUserSecurity />
    </div>
    <div class="mt-8">
      <BaseVerifyEmail />
    </div>
  </div>
</template>

<script>
import BaseUpdateUserInformation from "@/components/user/update/BaseUpdateUserInformation";
import BaseUpdateUserSecurity from "@/components/user/update/BaseUpdateUserSecurity";
import BaseVerifyEmail from "@/components/user/update/BaseVerifyEmail";

export default {
  name: "BaseUpdateProfile",
  components: {
    BaseUpdateUserInformation,
    BaseUpdateUserSecurity,
    BaseVerifyEmail,
  },
};
</script>

<style></style>
