import { mapActions, mapMutations, mapGetters } from "vuex";
import { ADMIN_TYPES } from "@/constants";

export default {
  data() {
    return {
      admin_types: [ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR],
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      typeRules: [(v) => !!v || this.$t("Type is required.")],
      fullnameRules: [
        (v) => !!v || this.$t("Full-name is required."),
        (v) =>
          (v && v.length > 1) || this.$t("Full-name must be min 2 characters."),
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
      admin_analys_data: "admin/admin_analys_data",
      admin_pagination: "admin/pagination",
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
      UPDATE_ADMIN_PASSWORD: "admin/UPDATE_ADMIN_PASSWORD",
      GET_ADMIN_ANALYTICS: "admin/GET_ADMIN_ANALYTICS",
      RESET_ADMIN_LOGIN_FAILED_TIMES: "admin/RESET_ADMIN_LOGIN_FAILED_TIMES",
      BATCH_UPLOAD_ADMINS: "admin/BATCH_UPLOAD_ADMINS",
      GET_ADMINS_PAGINATED: "admin/GET_ADMINS_PAGINATED",
    }),
    ...mapMutations({
      SET_ADMIN: "admin/SET_ADMIN",
      SET_ADMINS: "admin/SET_ADMINS",
      UPDATE_ADMIN_DATA: "admin/UPDATE_ADMIN_DATA",
      SET_ADMIN_PAGINATION: "admin/SET_ADMIN_PAGINATION",
      UPDATE_ADMIN_PAGINATION: "admin/UPDATE_ADMIN_PAGINATION",
    }),

    updateAdminObject({ path, data }) {
      this.UPDATE_ADMIN_DATA({ path, data });
    },
  },
};
