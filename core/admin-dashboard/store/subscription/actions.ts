import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.GET_SUBSCRIPTION_ANALYTICS]({ commit }, params = {}) {
    const distance = _.get(params, "distance", 7);
    const unit = _.get(params, "unit", "day");

    let url_query = new URLSearchParams();

    if (distance) {
      url_query.set("distance", distance);
    }

    if (unit) {
      url_query.set("unit", unit);
    }

    const { data } = await this.$axios.$get(
      `/subscription/analystics?${url_query}`
    );
    return data;
  },

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
