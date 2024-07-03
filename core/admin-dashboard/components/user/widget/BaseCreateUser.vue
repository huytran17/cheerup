<template>
  <v-row>
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
              outlined
              color="brick"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Fullname')"
              @input="
                updateUserObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
              outlined
              color="brick"
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
              outlined
              color="brick"
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
              outlined
              color="brick"
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
              color="brick"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="brick"
              class="white--text"
              tile
              :disabled="!form_valid"
              @click="createUser"
            >
              <span class="app-body">{{ $t("Create") }}</span>
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
        if (!this.form_valid) {
          return;
        }

        const created_user = await this.CREATE_USER({
          data: this.user,
        });

        this.$toast.success(this.$t("Created user successfully"));
        this.$router.push(this.localePath(`/user/${created_user._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while creating user"));
      }
    },
  },
  fetch() {
    this.SET_USER({ data: {} });
  },
};
</script>
