import { MutationTree } from "vuex";
import { SubscriptionState } from ".";
import { MutationTypes } from "./mutation-types";
import { update } from "lodash";

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

  [MutationTypes.SET_SUBSCRIPTION_PAGINATION](
    state,
    { data }: { data: IPagination }
  ) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_SUBSCRIPTION_PAGINATION](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.pagination = update(state.pagination, path, (n) => data);
  },
};

export default mutations;
