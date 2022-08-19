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
                updateAdminObject({ variable_path: 'email', data: $event })
              "
              :rules="titleRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('Full Name')"
              @input="
                updateAdminObject({ variable_path: 'full_name', data: $event })
              "
              :rules="titleRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :label="$t('Enable Auto Censorship Post')"
              @change="
                updateAdminObject({
                  variable_path: 'is_auto_censorship_post',
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
              @click="createAdmin"
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
import adminMixins from "@/mixins/admin";

export default {
  name: "BaseCreateAdmin",
  mixins: [adminMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async createAdmin() {
      try {
        const created_post = await this.CREATE_ADMIN({
          data: this.post,
        });
        this.SET_ADMIN({ data: created_post });
        this.$toast.success("Created post successfully");
        this.$router.push(this.localePath(`/post/${created_post._id}`));
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating post");
      }
    },
  },
  fetch() {
    this.SET_ADMIN({ data: {} });
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>
