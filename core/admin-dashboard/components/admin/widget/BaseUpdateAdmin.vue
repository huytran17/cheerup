<template>
  <v-row>
    <v-col cols="12">
      <v-form v-model="form_valid" class="soft-box-shadow rounded-lg px-4 py-5">
        <v-row>
          <v-col cols="12" class="pb-2">
            <div class="text-body-1 brick--text">
              <h3 class="app-title">{{ $t("Information") }}</h3>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :value="admin.email"
              :label="$t('Email')"
              @input="
                updateAdminObject({ variable_path: 'email', data: $event })
              "
              disabled
              color="brick"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :value="admin.full_name"
              :label="$t('Fullname')"
              @input="
                updateAdminObject({ variable_path: 'full_name', data: $event })
              "
              :rules="fullnameRules"
              color="brick"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              :value="admin.type"
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
              color="brick"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-body-2">
              <span class="app-body">
                <span v-html="$t('Avatar')"></span>
              </span>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img
              :src="admin.avatar_url"
              :alt="admin.full_name"
              contain
              max-width="200px"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="brick"
              class="white--text"
              :disabled="!form_valid"
              @click="updateAdmin"
            >
              <span class="app-body">{{ $t("Update") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-form
        v-model="security_form_valid"
        class="soft-box-shadow rounded-lg px-4 py-5 mt-6"
      >
        <v-row>
          <v-col cols="12" class="pb-2">
            <div class="text-body-1 brick--text">
              <h3 class="app-title">{{ $t("Security") }}</h3>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password')"
              :type="show_password ? 'text' : 'password'"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_password = !show_password"
              @input="
                updateAdminObject({ variable_path: 'password', data: $event })
              "
              :rules="passwordRules"
              color="brick"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('New Password Confirmation')"
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
              color="brick"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="brick"
              class="white--text"
              tile
              :disabled="!security_form_valid"
              @click="updateAdminSecurity"
            >
              <span class="app-body">{{ $t("Update") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { omit, pick } from "lodash";
import adminMixins from "@/mixins/admin";
import dropzoneMixins from "@/mixins/dropzone";

export default {
  name: "BaseUpdateAdmin",
  mixins: [adminMixins, dropzoneMixins],
  data() {
    return {
      form_valid: false,
      security_form_valid: false,
      show_password_confirmation: false,
      show_password: false,
    };
  },
  methods: {
    async updateAdmin() {
      try {
        if (!this.form_valid) {
          return;
        }

        const final_admin_details = omit(this.admin, [
          "password",
          "password_confirmation",
          "hash_password",
        ]);

        await this.UPDATE_ADMIN({
          data: final_admin_details,
        });

        await this.$fetch();

        this.$toast.success(this.$t("Updated admin successfully"));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while updating admin"));
      }
    },

    async updateAdminSecurity() {
      try {
        if (!this.security_form_valid) {
          return;
        }

        const final_admin_details = pick(this.admin, [
          "_id",
          "password",
          "password_confirmation",
        ]);

        await this.UPDATE_ADMIN_PASSWORD({
          data: final_admin_details,
        });

        this.$toast.success(this.$t("Updated admin password successfully"));

        await this.$fetch();
      } catch (error) {
        console.error(error);
        this.$toast.error(
          this.$t("Encountered error while updating admin password")
        );
      }
    },
  },
  async fetch() {
    try {
      await this.GET_ADMIN({ id: this.$route.params.id });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
