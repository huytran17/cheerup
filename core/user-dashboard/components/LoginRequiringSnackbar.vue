<template>
  <v-snackbar v-model="is_open">
    <div class="text-body-2">
      {{ $t("Please login to perform this action") }}
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs">
        {{ $t("Login") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "LoginRequiringSnackbar",
  mixins: [systemMixins],
  data() {
    return {
      is_open: false,
    };
  },
  watch: {
    is_open(value) {
      this.SET_IS_OPEN_LOGIN_REQQUIRING_SNACKBAR({ data: value });
    },
  },
};
</script>
