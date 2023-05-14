import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import { get, join } from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.GET_SUBSCRIPTION_ANALYTICS]({ commit }, params = {}) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    const { data } = await this.$axios.$get(
      `/subscription/analystics?${url_query}`
    );
    commit(MutationTypes.SET_SUBSCRIPTION_ANALYS_DATA, { data });
    return data;
  },

  async [ActionTypes.GET_SUBSCRIPTIONS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

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
