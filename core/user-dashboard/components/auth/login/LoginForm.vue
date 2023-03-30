<template>
  <v-form v-model="form_valid" class="w-75 mx-auto">
    <v-row class="flex-column flex-md-row flex-column-reverse login-box-shadow">
      <v-col
        cols="12"
        md="5"
        class="py-8 px-8 login-form-background rounded-left-lg"
      >
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div
              class="d-flex flex-column justify-center rounded-icon mr-2 pa-1 rounded-circle clickable"
            >
              <v-icon class="mx-auto">mdi-facebook</v-icon>
            </div>
            <div
              class="d-flex flex-column justify-center rounded-icon mr-2 pa-1 rounded-circle clickable"
            >
              <v-icon class="mx-auto">mdi-google</v-icon>
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
              class="login-linear-background btn-linear-background w-100 py-6"
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
              <a
                :href="localePath('/forget-password')"
                class="text-decoration-none black--text"
                v-html="$t('Forgot Password')"
              ></a>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="7"
        class="login-linear-background d-flex flex-column justify-center py-6 py-md-0 rounded-right-lg"
      >
        <div class="white--text text-center">
          <div class="text-h5 text-sm-h4">
            <span class="app-title" v-html="$t('Welcome to login')"></span>
          </div>
          <div class="text-body-2 my-2">
            <span
              class="app-body"
              v-html="$t('Don\'t have an account?')"
            ></span>
          </div>
          <div class="mt-5 d-flex justify-center">
            <v-btn
              depressed
              outlined
              rounded
              color="white"
              @click="$router.push(localePath('/register'))"
            >
              <span
                class="app-body text-capitalize"
                v-html="$t('Sign Up')"
              ></span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
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
    ...mapGetters({
      login_redirect_url: "login_redirect_url",
    }),
  },
  methods: {
    ...mapMutations({
      SET_LOGIN_REDIRECT_URL: "SET_LOGIN_REDIRECT_URL",
    }),

    async signIn() {
      try {
        await this.SIGN_IN({ data: this.me });

        const has_login_redirect_url = this.login_redirect_url;
        if (!has_login_redirect_url) {
          return this.$router.push(this.localePath("/"));
        }

        this.$router.push(this.localePath(this.login_redirect_url));
        this.SET_LOGIN_REDIRECT_URL({ data: "" });
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
  background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
}
.btn-linear-background:hover {
  background: #f35588;
}
.login-box-shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.login-form-background {
  background: rgba(255, 255, 255, 0.6);
}
.rounded-right-lg {
  border-radius: 0 8px 8px 0;
}
.rounded-left-lg {
  border-radius: 8px 0 0 8px;
}
.rounded-icon:hover {
  background: #f35587;
}
.rounded-icon:hover > * {
  color: #ffffff;
}
:deep(.v-btn--disabled) {
  background: #e0e0e0;
}
@media only screen and (max-width: 959px) {
  .rounded-right-lg {
    border-radius: 8px 8px 0 0;
  }
  .rounded-left-lg {
    border-radius: 0 0 8px 8px;
  }
}
</style>
