<template>
  <v-form v-model="form_valid" class="mx-auto">
    <v-row
      class="flex-column flex-md-row flex-column-reverse login-box-shadow mx-1"
    >
      <v-col cols="12" class="py-8 px-8 login-form-background rounded-lg">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div
              class="d-flex flex-column justify-center rounded-icon pa-1 rounded-circle clickable"
            >
              <a :href="google_login_uri" class="text-decoration-none"
                ><v-icon class="mx-auto">mdi-google</v-icon></a
              >
            </div>
          </v-col>
        </v-row>
        <v-row class="pb-0">
          <v-col cols="12" class="pb-0">
            <div class="text-body-2 black--text">
              <span class="app-body text-uppercase" v-html="$t('Email')"></span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :placeholder="$t('Email')"
              rounded
              hide-details
              filled
              :rules="emailRules"
              @input="
                updateUserObject({
                  variable_path: 'email',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pb-0">
          <v-col cols="12" class="pb-0">
            <div class="text-body-2 black--text">
              <span
                class="app-body text-uppercase"
                v-html="$t('Fullname')"
              ></span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :placeholder="$t('Fullname')"
              rounded
              hide-details
              filled
              :rules="fullnameRules"
              @input="
                updateUserObject({
                  variable_path: 'full_name',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-2 black--text">
              <span
                class="app-body text-uppercase"
                v-html="$t('Password')"
              ></span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :placeholder="$t('Password')"
              rounded
              type="password"
              hide-details
              filled
              :rules="passwordRules"
              @input="
                updateUserObject({
                  variable_path: 'password',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-2 black--text">
              <span
                class="app-body text-uppercase"
                v-html="$t('Password Confirmation')"
              ></span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :placeholder="$t('Password Confirmation')"
              rounded
              type="password"
              hide-details
              filled
              :rules="passwordConfirmationRules"
              @input="
                updateUserObject({
                  variable_path: 'password_confirmation',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn
              depressed
              rounded
              class="login-linear-background btn-linear-background w-100 py-6"
              :disabled="!form_valid"
              @click="signUp"
            >
              <span class="text-body-1">
                <span
                  class="app-body text-capitalize white--text"
                  v-html="$t('Submit')"
                ></span>
              </span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="text-body-2 text-right">
              <span
                @click="$router.push(localePath('/forget-password'))"
                class="text-decoration-none black--text clickable"
                v-html="$t('Forgot Password?')"
              ></span>
            </div>
          </v-col>
          <v-col class="pt-0">
            <div class="text-body-2 text-right">
              <span
                @click="$router.push(localePath('/login'))"
                class="text-decoration-none black--text clickable"
                v-html="$t('Sign In')"
              ></span>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from "@/mixins/auth";
import userMixins from "@/mixins/user";

export default {
  name: "RegisterForm",
  mixins: [authMixins, userMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  computed: {
    google_login_uri() {
      return `${process.env.SERVER_URL}/api/auth/google`;
    },
  },
  methods: {
    async signUp() {
      try {
        await this.SIGN_UP({ data: this.user });
        this.$router.push(this.localePath("/login"));
      } catch (error) {
        console.error(error);
        this.$toast.error("Register information is incorrect");
      }
    },
  },
};
</script>

<style scoped>
.login-linear-background {
  background: linear-gradient(
    135deg,
    var(--color-register-form-gradient-1) 0%,
    var(--color-register-form-gradient-2) 100%
  );
}
.login-box-shadow {
  box-shadow: var(--color-register-form-shadow-bg) 0px 7px 29px 0px;
}
.login-form-background {
  background: var(--color-register-form-bg);
}
.rounded-icon {
  background: var(--color-rounded-icon-bg);
}
.rounded-icon * {
  color: var(--color-white) !important;
}
:deep(.v-btn--disabled) {
  background: var(--color-button-disabled-bg);
}
</style>
