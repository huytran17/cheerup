import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      subscription: "subscription/subscription",
      subscriptions: "subscription/subscriptions",
      subscription_analys_data: "subscription/subscription_analys_data",
      subscription_pagination: "subscription/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_SUBSCRIPTIONS: "subscription/GET_SUBSCRIPTIONS",
      GET_SUBSCRIPTION_ANALYTICS: "subscription/GET_SUBSCRIPTION_ANALYTICS",
      GET_SUBSCRIPTIONS_PAGINATED: "subscription/GET_SUBSCRIPTIONS_PAGINATED",
    }),

    ...mapMutations({
      SET_SUBSCRIPTION: "subscription/SET_SUBSCRIPTION",
      SET_SUBSCRIPTIONS: "subscription/SET_SUBSCRIPTIONS",
      SET_SUBSCRIPTION_PAGINATION: "subscription/SET_SUBSCRIPTION_PAGINATION",
      UPDATE_SUBSCRIPTION_PAGINATION:
        "subscription/UPDATE_SUBSCRIPTION_PAGINATION",
    }),
  },
};
