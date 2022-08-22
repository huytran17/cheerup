import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
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
    };
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_UP: "auth/SIGN_UP",
      SIGN_OUT: "auth/SIGN_OUT",
    }),
    ...mapMutations({
      UPDATE_ME_DATA: "auth/UPDATE_ME_DATA",
    }),

    updateMeObject({ variable_path, data }) {
      this.UPDATE_ME_DATA({
        variable_path,
        data,
      });
    },
  },
};
