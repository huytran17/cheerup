<template>
  <v-form v-model="valid_form">
    <v-row class="soft-box-shadow">
      <v-col cols="12">
        <div class="text-body-1">
          <span
            class="app-title"
            v-html="$t('Create your new password')"
          ></span>
        </div>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-text-field
          :label="$t('Enter new password')"
          :type="show_password ? 'text' : 'password'"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          filled
          :rules="passwordRules"
          :value="password_reset.password"
          @click:append="show_password = !show_password"
          @input="
            updatePasswordResetObject({
              variable_path: 'password',
              data: $event,
            })
          "
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          :label="$t('Confirm your password')"
          :type="show_password_confirmation ? 'text' : 'password'"
          :append-icon="show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
          filled
          :rules="passwordConfirmationRules"
          :value="password_reset.password_confirmation"
          @click:append="
            show_password_confirmation = !show_password_confirmation
          "
          @input="
            updatePasswordResetObject({
              variable_path: 'password_confirmation',
              data: $event,
            })
          "
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-end pt-0">
        <v-btn
          color="brick"
          class="white--text"
          tile
          depressed
          :disabled="loading || !valid_form"
          @click="resetPassword"
        >
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import passwordResetMixins from "@/mixins/password-reset";

export default {
  name: "BaseResetPasswordForm",
  mixins: [passwordResetMixins],
  data() {
    return {
      valid_form: false,
      loading: false,
      show_password: false,
      show_password_confirmation: false,
    };
  },
  methods: {
    async resetPassword() {
      try {
        if (!this.valid_form) {
          return;
        }

        this.loading = true;
        const payload = {
          password: this.password_reset?.password,
          password_confirmation: this.password_reset?.password_confirmation,
          verification_token: localStorage.getItem("verification_token"),
        };

        await this.RESET_PASSWORD({ data: payload });

        this.$toast.success(this.$t("Updated your password"));
        this.$router.push(this.localePath("/login"));
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating your password")
        );
      } finally {
        this.loading = false;
        localStorage.removeItem("verification_token");
      }
    },
  },
};
</script>
