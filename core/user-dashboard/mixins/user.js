import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      fullnameRules: [
        (v) => !!v || this.$t("Fullname is required."),
        (v) =>
          (v && v.length > 1) || this.$t("Fullname must be min 2 characters."),
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
      UPDATE_USER: "user/UPDATE_USER",
      UPLOAD_USER_AVATAR: "user/UPLOAD_USER_AVATAR",
      UPDATE_USER_PASSWORD: "user/UPDATE_USER_PASSWORD",
      VERIFY_EMAIL: "user/VERIFY_EMAIL",
    }),
    ...mapMutations({
      SET_USER: "user/SET_USER",
      UPDATE_USER_DATA: "user/UPDATE_USER_DATA",
    }),

    updateUserObject({ path, data }) {
      this.UPDATE_USER_DATA({ path, data });
    },
  },
};
