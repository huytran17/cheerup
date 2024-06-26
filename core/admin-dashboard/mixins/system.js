import { capitalize as _capitalize } from "lodash";
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      app_loading: "app_loading",
    }),

    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },
  methods: {
    ...mapMutations({
      SET_APP_LOADING: "SET_APP_LOADING",
    }),
    formatDate(date, format) {
      if (!date) {
        return;
      }

      if (format) {
        return this.$moment(date).format(format);
      }

      return this.$moment(date).fromNow();
    },

    formatLocaleDate(date) {
      return this.formatDate(date, "DD-MM-YYYY HH:mm");
    },

    replaceHTMLTag(string) {
      if (!string) {
        return;
      }

      return string.replaceAll(/(<([^>]+)>)/gi, "");
    },
  },
  filters: {
    capitalize: function (value) {
      value = (value && value.toString()) || "";
      return value.replace(/\w+/g, _capitalize);
    },
  },
};
