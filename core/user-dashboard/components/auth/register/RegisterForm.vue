<template>
  <v-form v-model="form_valid" class="w-75 mx-auto">
    <v-row class="flex-column flex-md-row flex-column-reverse login-box-shadow">
      <v-col
        cols="12"
        md="7"
        class="login-linear-background d-flex flex-column justify-center py-6 py-md-0 rounded-left-lg"
      >
        <div class="white--text text-center">
          <div class="text-h5 text-sm-h4">
            <span class="app-title" v-html="$t('Welcome to register')"></span>
          </div>
          <div class="text-body-2 my-2">
            <span
              class="app-body"
              v-html="$t('Already have an account?')"
            ></span>
          </div>
          <div class="mt-5 d-flex justify-center">
            <v-btn
              depressed
              outlined
              rounded
              color="white"
              @click="$router.push(localePath('/login'))"
            >
              <span
                class="app-body text-capitalize"
                v-html="$t('Sign In')"
              ></span>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="5"
        class="py-8 px-8 login-form-background rounded-right-lg"
      >
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div
              class="d-flex flex-column justify-center rounded-icon mr-2 pa-1 rounded-circle clickable"
            >
              <v-icon class="mx-auto">mdi-facebook</v-icon>
            </div>
            <div
              class="d-flex flex-column justify-center rounded-icon pa-1 rounded-circle clickable"
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
  methods: {
    async signUp() {
      try {
        await this.SIGN_UP({ data: this.user });
        this.$router.push(this.localePath("/login"));
      } catch (error) {
        console.log(error);
        this.$toast.error("Register information is incorrect");
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
