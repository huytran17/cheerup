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
      users: "user/users",
      user_analys_data: "user/user_analys_data",
    }),
  },
  methods: {
    ...mapActions({
      GET_USERS: "user/GET_USERS",
      GET_USER: "user/GET_USER",
      CREATE_USER: "user/CREATE_USER",
      UPDATE_USER: "user/UPDATE_USER",
      DELETE_USER: "user/DELETE_USER",
      UPLOAD_USER_AVATAR: "user/UPLOAD_USER_AVATAR",
      HARD_DELETE_USER: "user/HARD_DELETE_USER",
      UNBLOCK_USER_COMMENT: "user/UNBLOCK_USER_COMMENT",
      BLOCK_USER_COMMENT: "user/BLOCK_USER_COMMENT",
      UPDATE_USER_PASSWORD: "user/UPDATE_USER_PASSWORD",
      RESTORE_USER: "user/RESTORE_USER",
      GET_USER_ANALYTICS: "user/GET_USER_ANALYTICS",
      RESET_USER_LOGIN_FAILED_TIMES: "user/RESET_USER_LOGIN_FAILED_TIMES",
    }),
    ...mapMutations({
      SET_USER: "user/SET_USER",
      SET_USERS: "user/SET_USERS",
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
