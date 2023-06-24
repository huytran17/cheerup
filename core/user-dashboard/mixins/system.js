import { capitalize as _capitalize } from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      after_login_redirect_url: "after_login_redirect_url",
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
      SET_AFTER_LOGIN_REDIRECT_URL: "SET_AFTER_LOGIN_REDIRECT_URL",
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
