import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.GET_SUBSCRIPTION_ANALYTICS]({ commit }, params = {}) {
    const range = _.get(params, "range", []);
    const unit = _.get(params, "unit", "month");

    let url_query = new URLSearchParams();

    const has_range = range && range.length;
    if (has_range) {
      url_query.set("range", _.join(range));
    }

    if (unit) {
      url_query.set("unit", unit);
    }

    const { data } = await this.$axios.$get(
      `/subscription/analystics?${url_query}`
    );
    commit(MutationTypes.SET_SUBSCRIPTION_ANALYS_DATA, { data });
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
