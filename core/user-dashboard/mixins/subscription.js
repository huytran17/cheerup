import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      subscription: "subscription/subscription",
    }),
  },
  methods: {
    ...mapActions({
      CREATE_SUBSCRIPTION: "subscription/CREATE_SUBSCRIPTION",
      CANCEL_SUBSCRIPTION: "subscription/CANCEL_SUBSCRIPTION",
    }),

    ...mapMutations({
      SET_SUBSCRIPTION: "subscription/SET_SUBSCRIPTION",
      UPDATE_SUBSCRIPTION_DATA: "subscription/UPDATE_SUBSCRIPTION_DATA",
    }),

    updateUserObject({ path, data }) {
      this.UPDATE_SUBSCRIPTION_DATA({ path, data });
    },
  },
};
