<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="form_valid">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Email')"
              @input="
                updateAdminObject({ variable_path: 'email', data: $event })
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
                updateAdminObject({ variable_path: 'full_name', data: $event })
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
                updateAdminObject({ variable_path: 'password', data: $event })
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
                updateAdminObject({
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
          <v-col cols="12" md="6">
            <v-autocomplete
              :items="admin_types"
              chips
              small-chips
              :label="$t('Type')"
              @input="
                updateAdminObject({
                  variable_path: 'type',
                  data: $event,
                })
              "
              :rules="typeRules"
              outlined
              color="brick"
            ></v-autocomplete>
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
              @click="createAdmin"
            >
              <span class="app-body0">{{ $t("Create") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import adminMixins from "@/mixins/admin";

export default {
  name: "BaseCreateAdmin",
  mixins: [adminMixins],
  data() {
    return {
      form_valid: false,
      show_password: false,
      show_password_confirmation: false,
    };
  },
  methods: {
    async createAdmin() {
      try {
        if (!this.form_valid) {
          return;
        }

        const created_admin = await this.CREATE_ADMIN({
          data: this.admin,
        });

        this.$toast.success(this.$t("Created admin successfully"));
        this.$router.push(this.localePath(`/admin/${created_admin._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while creating admin"));
      }
    },
  },
  fetch() {
    this.SET_ADMIN({ data: {} });
  },
};
</script>
