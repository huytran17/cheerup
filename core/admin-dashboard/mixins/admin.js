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
          this.admin.password === v ||
          this.$t("Password confirmation must match password."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      admin: "admin/admin",
      admins: "admin/admins",
    }),
  },
  methods: {
    ...mapActions({
      GET_ADMINS: "admin/GET_ADMINS",
      GET_ADMIN: "admin/GET_ADMIN",
      CREATE_ADMIN: "admin/CREATE_ADMIN",
      UPDATE_ADMIN: "admin/UPDATE_ADMIN",
      DELETE_ADMIN: "admin/DELETE_ADMIN",
      RESTORE_ADMIN: "admin/RESTORE_ADMIN",
      HARD_DELETE_ADMIN: "admin/HARD_DELETE_ADMIN",
      DISABLE_AUTO_CENSORSHIP_POST: "admin/DISABLE_AUTO_CENSORSHIP_POST",
      ENABLE_AUTO_CENSORSHIP_POST: "admin/ENABLE_AUTO_CENSORSHIP_POST",
    }),
    ...mapMutations({
      SET_ADMIN: "admin/SET_ADMIN",
      SET_ADMINS: "admin/SET_ADMINS",
      UPDATE_ADMIN_DATA: "admin/UPDATE_ADMIN_DATA",
    }),

    updateAdminObject({ variable_path, data }) {
      this.UPDATE_ADMIN_DATA({
        variable_path,
        data,
      });
    },
  },
};
