import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      is_open_login_requiring_snackbar: "is_open_login_requiring_snackbar",
      login_redirect_url: "login_redirect_url",
      is_open_login_snackbar: "is_open_login_snackbar",
    }),

    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },

    is_small_screen() {
      return this.$vuetify.breakpoint.name === "sm";
    },
  },
  methods: {
    ...mapMutations({
      SET_LOGIN_REDIRECT_URL: "SET_LOGIN_REDIRECT_URL",
      SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR:
        "SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR",
      SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR:
        "SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR",
    }),
    formatDate(date, format) {
      if (format) {
        return this.$moment(date).format(format);
      }
      return this.$moment(date).fromNow();
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();

      return value.replace(/\w+/g, _.capitalize);
    },
  },
};
