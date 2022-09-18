import { GetterTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";

export const getters: GetterTree<SubscriptionState, RootState> = {
  prefix() {
    return "/subscription";
  },
  subscription: (state) => state.subscription,
};

export default getters;
