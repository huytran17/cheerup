import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      subscription: "subscription/subscription",
      subscriptions: "subscription/subscriptions",
    }),
  },
  methods: {
    ...mapActions({
      GET_SUBSCRIPTIONS: "subscription/GET_SUBSCRIPTIONS",
      GET_SUBSCRIPTION: "subscription/GET_SUBSCRIPTION",
    }),
    ...mapMutations({
      SET_SUBSCRIPTION: "subscription/SET_SUBSCRIPTION",
      SET_SUBSCRIPTIONS: "subscription/SET_SUBSCRIPTIONS",
    }),

    updateUserObject({ variable_path, data }) {
      this.UPDATE_SUBSCRIPTION_DATA({
        variable_path,
        data,
      });
    },
  },
};
