import { GetterTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";

export const getters: GetterTree<SubscriptionState, RootState> = {
  prefix() {
    return "/post-bookmark";
  },
  post_bookmark: (state) => state.post_bookmark,
};

export default getters;
