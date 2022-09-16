import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      login_redirect_url: "login_redirect_url",
    }),
    /**
     *
     * @returns true if xs;
     */
    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },

    /**
     *
     * @returns true if xs;
     */
    is_small_screen() {
      return this.$vuetify.breakpoint.name === "sm";
    },
  },
  methods: {
    ...mapMutations({
      SET_LOGIN_REDIRECT_URL: "SET_LOGIN_REDIRECT_URL",
    }),
    /**
     *
     * @param {*} date
     * @param {*} format
     * @returns format the date // default: "DD MMMM YYYY, hh:mm"
     */
    formatDate(date, format) {
      if (format) {
        return this.$moment(date).format(format);
      } else {
        return this.$moment(date).fromNow();
      }
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
