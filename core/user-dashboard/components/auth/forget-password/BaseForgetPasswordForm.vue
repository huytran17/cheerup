<template>
  <v-form v-model="valid_form">
    <v-row class="soft-box-shadow">
      <v-col cols="12">
        <div class="text-body-2">
          <span
            class="app-body"
            v-html="
              $t(
                'Enter your email and press the submit button to receive the verification code.'
              )
            "
          ></span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-text-field
          :label="$t('Enter you email')"
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
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" tile depressed>
          <span class="app-body" v-html="$t('Submit')"></span>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <div class="text-body-2">
          <span
            class="app-body"
            v-html="
              $t(
                'Then enter the confirmation code in the form below to authenticate.'
              )
            "
          ></span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-text-field
          :label="$t('Enter you email')"
          filled
          :rules="verifycationCodeRules"
          @input="
            updateMeObject({
              variable_path: 'email',
              data: $event,
            })
          "
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" tile depressed>
          <span class="app-body" v-html="$t('Verify')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
  name: "BaseForgetPasswordForm",
  mixins: [authMixins],
  data() {
    return {
      valid_form: false,
    };
  },
};
</script>

<style></style>
