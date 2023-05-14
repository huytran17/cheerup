import { capitalize as _capitalize } from "lodash";
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

    generateRandomString({ length }) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const characters_length = characters.length;
      let counter = 0;

      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * characters_length)
        );

        counter += 1;
      }
      return result;
    },
  },
  filters: {
    capitalize: function (value) {
      value = (value && value.toString()) || "";
      return value.replace(/\w+/g, _capitalize);
    },
  },
};
