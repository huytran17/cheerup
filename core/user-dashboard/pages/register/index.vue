<template>
  <div
    :style="`background-image: url(${login_background_image})`"
    class="login-background-image h-100 py-10 py-md-0"
  >
    <v-container class="d-flex flex-column justify-center w-100 h-100">
      <RegisterForm />
    </v-container>
  </div>
</template>

<script>
import RegisterForm from "@/components/auth/register/RegisterForm";
export default {
  name: "RegisterPage",
  layout: "public",
  middleware: ["redirect-logged-user"],
  components: {
    RegisterForm,
  },
  head() {
    return {
      title: this.$t("Register"),
    };
  },
  data() {
    return {
      login_background_image: require("@/assets/images/auth/login-bg.webp"),
    };
  },
};
</script>

<style scoped>
.login-background-image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
