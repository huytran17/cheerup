import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.CREATE_SUBSCRIPTION]({ commit }, { data }: { data: any }) {
    const { data: subscription } = await this.$axios.$post(
      `/subscription`,
      data
    );

    commit(MutationTypes.SET_SUBSCRIPTION, { data: subscription });
    return subscription;
  },

  async [ActionTypes.CANCEL_SUBSCRIPTION]({ commit }) {
    const { data: subscription } = await this.$axios.$put(`/subscription`);

    commit(MutationTypes.SET_SUBSCRIPTION, { data: subscription });
    return subscription;
  },
};

export default actions;
