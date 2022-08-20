import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.GET_SUBSCRIPTIONS]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: subscriptions } = await this.$axios.$get("/subscription");

    if (!keep_in_store) {
      return subscriptions;
    }

    commit(MutationTypes.SET_SUBSCRIPTIONS, { data: subscriptions });
    return subscriptions;
  },

  async [ActionTypes.GET_SUBSCRIPTION]({ commit }, { id }: { id: string }) {
    const { data: subscription } = await this.$axios.$get(
      `/subscription/${id}`
    );

    commit(MutationTypes.SET_SUBSCRIPTION, { data: subscription });
    return subscription;
  },
};

export default actions;
