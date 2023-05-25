<template>
  <v-form v-model="form_valid" class="mx-auto">
    <v-row class="d-flex login-box-shadow justify-center mx-1">
      <v-col cols="12" class="py-8 px-8 login-form-background rounded-lg">
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
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
  name: "LoginForm",
  mixins: [authMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async signIn() {
      try {
        await this.SIGN_IN({ data: this.me });
        this.$router.push(this.localePath("/"));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Email address or password is incorrect"));
      }
    },
  },
};
</script>

<style scoped>
.login-linear-background {
  background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
}
.login-box-shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.login-form-background {
  background: rgba(255, 255, 255, 0.6);
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
</style>
