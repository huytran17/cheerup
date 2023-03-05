<template>
  <v-row>
    <v-col cols="12">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Email')"
              @input="
                updateUserObject({ variable_path: 'email', data: $event })
              "
              :rules="emailRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Fullname')"
              @input="
                updateUserObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Password')"
              :type="show_password ? 'text' : 'password'"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @input="
                updateUserObject({ variable_path: 'password', data: $event })
              "
              @click:append="show_password = !show_password"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Password Confirmation')"
              :type="show_password_confirmation ? 'text' : 'password'"
              :append-icon="
                show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append="
                show_password_confirmation = !show_password_confirmation
              "
              @input="
                updateUserObject({
                  variable_path: 'password_confirmation',
                  data: $event,
                })
              "
              :rules="passwordConfirmationRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :label="$t('Block comment for this user')"
              @change="
                updateUserObject({
                  variable_path: 'is_blocked_comment',
                  data: $event,
                })
              "
              :false-value="false"
              :true-value="true"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              :disabled="!form_valid"
              @click="createUser"
            >
              <span v-html="$t('Create')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import userMixins from "@/mixins/user";

export default {
  name: "BaseCreateUser",
  mixins: [userMixins],
  data() {
    return {
      form_valid: false,
      show_password: false,
      show_password_confirmation: false,
    };
  },
  methods: {
    async createUser() {
      try {
        const created_user = await this.CREATE_USER({
          data: this.user,
        });
        this.SET_USER({ data: created_user });
        this.$toast.success("Created user successfully");
        this.$router.push(this.localePath(`/user/${created_user._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error("Encountered error while creating user");
      }
    },
  },
  fetch() {
    this.SET_USER({ data: {} });
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>
