<template>
  <div class="my-15">
    <BaseVerifyEmail />

    <div class="mt-8">
      <BaseUpdateUserInformation />
    </div>

    <div class="mt-8">
      <BaseUpdateUserSecurity />
    </div>

    <div class="mt-8">
      <BaseAccountFeatures />
    </div>
  </div>
</template>

<script>
import BaseUpdateUserInformation from "@/components/user/update/BaseUpdateUserInformation";
import BaseUpdateUserSecurity from "@/components/user/update/BaseUpdateUserSecurity";
import BaseVerifyEmail from "@/components/user/update/BaseVerifyEmail";
import BaseAccountFeatures from "@/components/user/update/BaseAccountFeatures";

export default {
  name: "BaseUpdateProfile",
  components: {
    BaseUpdateUserInformation,
    BaseUpdateUserSecurity,
    BaseVerifyEmail,
    BaseAccountFeatures,
  },
};
</script>

<style></style>
