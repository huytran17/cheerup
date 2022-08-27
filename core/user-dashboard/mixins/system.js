import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      drawer: "drawer",
      selected_nav_item: "selected_nav_item",
      is_open_search_box: "is_open_search_box",
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
      SET_DRAWER: "SET_DRAWER",
      SET_SELECTED_NAV_ITEM: "SET_SELECTED_NAV_ITEM",
      SET_SELECTED_SEARCH_BOX: "SET_SELECTED_SEARCH_BOX",
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
