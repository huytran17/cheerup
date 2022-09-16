<template>
  <div class="mt-15">
    <BaseUpdateUserInformation />
    <div class="mt-8">
      <BaseUpdateUserSecurity />
    </div>
  </div>
</template>

<script>
import BaseUpdateUserInformation from "@/components/user/update/BaseUpdateUserInformation";
import BaseUpdateUserSecurity from "@/components/user/update/BaseUpdateUserSecurity";

export default {
  name: "BaseUpdateProfile",
  components: {
    BaseUpdateUserInformation,
    BaseUpdateUserSecurity,
  },
};
</script>

<style></style>
