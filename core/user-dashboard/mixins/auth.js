import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      twoFACodeRules: [
        (v) => !!v || this.$t("Confirmation code is required."),
        (v) =>
          (v && v.length > 5) || this.$t("Password must be min 6 characters."),
      ],
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      passwordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
      newPasswordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
      passwordConfirmationRules: [
        (v) => !!v || this.$t("Password confirmation is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.user.password === v ||
          this.$t("Password confirmation must match password."),
      ],
      newPasswordConfirmationRules: [
        (v) => !!v || this.$t("Password confirmation is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.user.new_password === v ||
          this.$t("Password confirmation must match password."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
      has_user: "auth/has_user",
      is_open_2fa_modal: "auth/is_open_2fa_modal",
      is_open_2fa_qr_modal: "auth/is_open_2fa_qr_modal",
      qr_data: "auth/qr_data",
      user: "user/user",
      access_token: "auth/access_token",
    }),
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_UP: "auth/SIGN_UP",
      SIGN_OUT: "auth/SIGN_OUT",
      GET_ME: "auth/GET_ME",
      ENABLE_2FA: "auth/ENABLE_2FA",
      ENABLE_2FA_CONFIRMATION: "auth/ENABLE_2FA_CONFIRMATION",
      DISABLE_2FA_CONFIRMATION: "auth/DISABLE_2FA_CONFIRMATION",
      DISABLE_2FA: "auth/DISABLE_2FA",
      VERIFY_2FA: "auth/VERIFY_2FA",
    }),

    ...mapMutations({
      UPDATE_ME_DATA: "auth/UPDATE_ME_DATA",
      SET_ME: "auth/SET_ME",
      SET_HAS_USER: "auth/SET_HAS_USER",
      SET_IS_OPEN_2FA_MODAL: "auth/SET_IS_OPEN_2FA_MODAL",
      SET_IS_OPEN_2FA_QR_MODAL: "auth/SET_IS_OPEN_2FA_QR_MODAL",
      SET_QR_DATA: "auth/SET_QR_DATA",
      SET_ACCESS_TOKEN: "auth/SET_ACCESS_TOKEN",
    }),

    updateMeObject({ variable_path, data }) {
      this.UPDATE_ME_DATA({
        variable_path,
        data,
      });
    },
  },
};
