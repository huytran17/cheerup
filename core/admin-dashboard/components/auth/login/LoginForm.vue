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
        if (!this.form_valid) {
          return;
        }

        await this.SIGN_IN({ data: this.me });

        this.$router.push(this.localePath("/"));
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
.rounded-icon:hover {
  background: var(--color-rounded-icon-hover-bg);
}
.rounded-icon:hover > * {
  color: var(--color-white);
}
:deep(.v-btn--disabled) {
  background: var(--color-button-disabled-bg);
}
</style>
