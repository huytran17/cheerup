<template>
  <div
    :style="`background-image: url(${login_background_image})`"
    class="login-background-image h-100 py-10 py-md-0"
  >
    <v-container class="d-flex flex-column justify-center w-100 h-100 py-10">
      <LoginForm />
    </v-container>
  </div>
</template>

<script>
import LoginForm from "@/components/auth/login/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
  data() {
    return {
      login_background_image: require("@/assets/images/auth/login-bg.jpg"),
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
