import { MutationTree } from "vuex";
import { SubscriptionState } from ".";
import { MutationTypes } from "./mutation-types";

const mutations: MutationTree<SubscriptionState> = {
  [MutationTypes.SET_SUBSCRIPTION_ANALYS_DATA](state, { data }: { data: any }) {
    state.subscription_analys_data = data;
  },

  [MutationTypes.SET_SUBSCRIPTION](state, { data }: { data: any }) {
    state.subscription = data;
  },

  [MutationTypes.SET_SUBSCRIPTIONS](state, { data }: { data: any[] }) {
    state.subscriptions = data;
  },
};

export default mutations;
