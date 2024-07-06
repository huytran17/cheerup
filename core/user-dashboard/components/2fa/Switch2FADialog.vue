<template>
  <v-dialog :value="is_open_2fa_modal" max-width="500" persistent>
    <v-row class="two-fa-confirmation-dialog">
      <v-col cols="12" class="text-center pb-0">
        <v-icon color="brick" :size="icon_size">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2">
          {{ $t(message) }}
        </div>
      </v-col>
      <v-col cols="12" class="otp">
        <v-otp-input
          :disabled="is_app_loading"
          @finish="submit_function"
        ></v-otp-input>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn text tile depressed class="mr-1" @click="closeModal">
          {{ $t("Cancel") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import authMixins from "@/mixins/auth";

export default {
  name: "Switch2FADialog",
  mixins: [authMixins],
  props: {
    icon: {
      type: String,
      default: () => "",
    },
    icon_size: {
      type: Number,
      default: () => 40,
    },
    message: {
      type: String,
      default: () => "",
    },
    submit_function: {
      type: Function,
      default: () => () => {},
    },
  },
  computed: {
    ...mapGetters({
      is_app_loading: "is_app_loading",
    }),
  },
  methods: {
    closeModal() {
      this.SET_IS_OPEN_2FA_MODAL({ data: false });
    },
  },
};
</script>
