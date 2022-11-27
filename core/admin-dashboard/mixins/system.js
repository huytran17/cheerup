import _ from "lodash";
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      app_loading: "app_loading",
    }),
    /**
     *
     * @returns true if xs;
     */
    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },
  methods: {
    ...mapMutations({
      SET_APP_LOADING: "SET_APP_LOADING",
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
