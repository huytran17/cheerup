import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      verificationCodeRules: [
        (v) => !!v || this.$t("Verification code is required."),
        (v) =>
          (v && v.length > 5) ||
          this.$t("Verification code must be min 6 characters."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      email_verification: "email-verification/email_verification",
      verification_code: "email-verification/verification_code",
    }),
  },
  methods: {
    ...mapActions({
      SEND_VERIFICATION_CODE: "email-verification/SEND_VERIFICATION_CODE",
    }),

    ...mapMutations({
      SET_VERIFICATION_CODE: "email-verification/SET_VERIFICATION_CODE",
    }),
  },
};
