<template>
  <v-form v-model="form_valid" class="mx-auto">
    <v-row
      class="flex-column flex-md-row flex-column-reverse login-box-shadow mx-1"
    >
      <v-col cols="12" class="py-8 px-8 login-form-background rounded-lg">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div
              class="d-flex flex-column justify-center rounded-icon mr-2 pa-1 rounded-circle clickable"
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
                updateMeObject({
                  variable_path: 'email',
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
                updateMeObject({
                  variable_path: 'password',
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
              :disabled="!form_valid"
              class="login-linear-background w-100 py-6"
              @click="signIn"
            >
              <span class="text-body-1">
                <span
                  class="app-body text-capitalize white--text"
                  v-html="$t('Sign In')"
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
                @click="$router.push(localePath('/register'))"
                class="text-decoration-none black--text clickable"
                v-html="$t('Sign Up')"
              ></span>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from "lodash";
import authMixins from "@/mixins/auth";

export default {
  name: "LoginForm",
  mixins: [authMixins],
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
    async signIn() {
      try {
        const { user, access_token } = await this.SIGN_IN({ data: this.me });

        const is_enabled_2fa = get(user, "is_enabled_2fa", false);
        if (is_enabled_2fa) {
          this.SET_ACCESS_TOKEN({ data: access_token });
          return this.$router.push(this.localePath("/auth/tfa-verification"));
        }

        this.SET_ME({ data: user });
        this.SET_HAS_USER({ data: true });

        this.$router.push(this.localePath("/"));
      } catch (error) {
        console.error(error);
        this.$toast.error("Email address or password is incorrect");
      }
    },
  },
};
</script>

<style scoped>
.login-linear-background {
  background: linear-gradient(
    135deg,
    var(--color-login-form-gradient-1) 0%,
    var(--color-login-form-gradient-2) 100%
  );
}
.login-box-shadow {
  box-shadow: var(--color-login-form-shadow-bg) 0px 7px 29px 0px;
}
.login-form-background {
  background: var(--color-login-form-bg);
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
