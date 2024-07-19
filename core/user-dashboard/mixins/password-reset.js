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
          (v && v.length > 5) ||
          this.$t("Verification code must be min 6 characters."),
      ],
      passwordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
      passwordConfirmationRules: [
        (v) => !!v || this.$t("Password confirmation is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.password_reset.password === v ||
          this.$t("Password confirmation must match password."),
      ],
    };
  },

  computed: {
    ...mapGetters({
      password_reset: "password-reset/password_reset",
    }),
  },
  methods: {
    ...mapActions({
      GET_PASSWORD_RESET_BY_CODE: "password-reset/GET_PASSWORD_RESET_BY_CODE",
      CREATE_PASSWORD_RESET: "password-reset/CREATE_PASSWORD_RESET",
      HARD_DELETE_PASSWORD_RESET: "password-reset/HARD_DELETE_PASSWORD_RESET",
      RESET_PASSWORD: "password-reset/RESET_PASSWORD",
    }),

    ...mapMutations({
      SET_PASSWORD_RESET: "password-reset/SET_PASSWORD_RESET",
      UPDATE_PASSWORD_RESET_DATA: "password-reset/UPDATE_PASSWORD_RESET_DATA",
    }),

    updatePasswordResetObject({ path, data }) {
      this.UPDATE_PASSWORD_RESET_DATA({ path, data });
    },
  },
};
