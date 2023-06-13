import { isEmpty } from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ADMIN_TYPES } from "@/constants";

export default {
  data() {
    return {
      admin_types: [ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR],
      typeRules: [(v) => !!v || this.$t("Type is required.")],
      fullnameRules: [
        (v) => !!v || this.$t("Full-name is required."),
        (v) =>
          (v && v.length > 1) || this.$t("Full-name must be min 2 characters."),
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
      passwordConfirmationRules: [
        (v) => !!v || this.$t("Password confirmation is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.me.password === v ||
          this.$t("Password confirmation must match password."),
      ],
      newPasswordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
      newPasswordConfirmationRules: [
        (v) => !!v || this.$t("Password confirmation is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.me.new_password === v ||
          this.$t("Password confirmation must match password."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
      has_user: "auth/has_user",
    }),

    authenticated() {
      return !isEmpty(this.me);
    },
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_OUT: "auth/SIGN_OUT",
      GET_ME: "auth/GET_ME",
      UPDATE_ADMIN_PERSONAL_PASSWORD: "admin/UPDATE_ADMIN_PERSONAL_PASSWORD",
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
