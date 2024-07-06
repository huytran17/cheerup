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
              <span class="text-uppercase">{{ $t("Email") }}</span>
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
              <span class="text-uppercase">{{ $t("Password") }}</span>
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
                <span class="text-capitalize white--text">{{
                  $t("Sign In")
                }}</span>
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
                >{{ $t("Forgot Password?") }}</span
              >
            </div>
          </v-col>
          <v-col class="pt-0">
            <div class="text-body-2 text-right">
              <span
                @click="$router.push(localePath('/register'))"
                class="text-decoration-none black--text clickable"
                >{{ $t("Sign Up") }}</span
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <Verify2FADialog />
  </v-form>
</template>

<script>
import { get } from "lodash";
import authMixins from "@/mixins/auth";
import Verify2FADialog from "@/components/2fa/Verify2FADialog";

export default {
  name: "LoginForm",
  mixins: [authMixins],
  components: {
    Verify2FADialog,
  },
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
        if (!this.form_valid) {
          return;
        }

        const user = await this.SIGN_IN({ data: this.me });

        const is_enabled_2fa = get(user, "is_enabled_2fa", false);
        if (is_enabled_2fa) {
          this.SET_IS_OPEN_2FA_VERIFY_MODAL({ data: true });

          return this.$router.push({
            path: this.localePath("/login"),
            query: { email: user.email },
          });
        }

        await this.GET_ME();
        this.$router.push(this.localePath("/"));
      } catch (error) {
        this.$toast.error(this.$t(error));
      }
    },
  },

  fetch() {
    const query = this.$route.query;

    query.email && this.SET_IS_OPEN_2FA_VERIFY_MODAL({ data: true });
  },
};
</script>

<style lang="scss" scoped>
.login-linear-background {
  background: linear-gradient(
    135deg,
    var(--color-login-form-gradient-1) 0%,
    var(--color-login-form-gradient-2) 100%
  );
}
.login-box-shadow {
  box-shadow: var(--color-login-form-shadow-bg) 0 toRem(7) toRem(29) 0;
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
.v-btn--disabled {
  background: var(--color-button-disabled-bg);
}
</style>
