import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      fullnameRules: [
        (v) => !!v || this.$t("Fullname is required."),
        (v) =>
          (v && v.length > 1) || this.$t("Fullname must be min 2 characters."),
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
          this.user.password === v ||
          this.$t("Password confirmation must match password."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
    }),
  },
  methods: {
    ...mapActions({
      GET_USER: "user/GET_USER",
      UPDATE_USER: "user/UPDATE_USER",
      DELETE_USER: "user/DELETE_USER",
      UPLOAD_USER_AVATAR: "user/UPLOAD_USER_AVATAR",
      HARD_DELETE_USER: "user/HARD_DELETE_USER",
      UPDATE_USER_PASSWORD: "user/UPDATE_USER_PASSWORD",
    }),
    ...mapMutations({
      SET_USER: "user/SET_USER",
      UPDATE_USER_DATA: "user/UPDATE_USER_DATA",
    }),

    updateUserObject({ variable_path, data }) {
      this.UPDATE_USER_DATA({
        variable_path,
        data,
      });
    },
  },
};
