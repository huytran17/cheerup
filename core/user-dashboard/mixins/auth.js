import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      verifycationCodeRules: [
        (v) => !!v || this.$t("Verification code is required."),
        (v) =>
          (v && v.length > 6) ||
          this.$t("Verification code must be min 6 characters."),
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
      user: "user/user",
    }),
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_UP: "auth/SIGN_UP",
      SIGN_OUT: "auth/SIGN_OUT",
      GET_ME: "auth/GET_ME",
      VERIFY_ACCESS: "auth/VERIFY_ACCESS",
    }),

    ...mapMutations({
      UPDATE_ME_DATA: "auth/UPDATE_ME_DATA",
      SET_ME: "auth/SET_ME",
    }),

    updateMeObject({ variable_path, data }) {
      this.UPDATE_ME_DATA({
        variable_path,
        data,
      });
    },
  },
};
