import { get, join } from "lodash";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

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
  },

  async [ActionTypes.GET_SUBSCRIPTIONS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/subscription");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_SUBSCRIPTIONS, { data });
  },

  async [ActionTypes.GET_SUBSCRIPTIONS_PAGINATED]({ commit }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const query_url = new URLSearchParams();

    query && query_url.set("query", query);
    page && query_url.set("page", page);
    entries_per_page && query_url.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/subscription/all-paginated?${query_url}`
    );

    commit(MutationTypes.SET_SUBSCRIPTIONS, { data });
    commit(MutationTypes.SET_SUBSCRIPTION_PAGINATION, { data: pagination });
  },
};

export default actions;
