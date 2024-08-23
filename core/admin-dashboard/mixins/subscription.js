import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      subscription: "subscription/subscription",
      subscriptions: "subscription/subscriptions",
      subscription_analys_data: "subscription/subscription_analys_data",
    }),
  },
  methods: {
    ...mapActions({
      GET_SUBSCRIPTIONS: "subscription/GET_SUBSCRIPTIONS",
      GET_SUBSCRIPTION_ANALYTICS: "subscription/GET_SUBSCRIPTION_ANALYTICS",
    }),
    ...mapMutations({
      SET_SUBSCRIPTION: "subscription/SET_SUBSCRIPTION",
      SET_SUBSCRIPTIONS: "subscription/SET_SUBSCRIPTIONS",
    }),
  },
};
