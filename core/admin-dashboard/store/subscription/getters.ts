import { GetterTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";

export const getters: GetterTree<SubscriptionState, RootState> = {
  prefix() {
    return "/subscription";
  },
  subscription: (state) => state.subscription,
  subscriptions: (state) => state.subscriptions,
  subscription_analys_data: (state) => state.subscription_analys_data,
};

export default getters;
