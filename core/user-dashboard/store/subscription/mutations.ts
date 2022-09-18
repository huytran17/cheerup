import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { SubscriptionState } from ".";
import _ from "lodash";

const mutations: MutationTree<SubscriptionState> = {
  [MutationTypes.SET_SUBSCRIPTION](state, { data }: { data: any }) {
    state.subscription = data;
  },
};

export default mutations;
