import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.CREATE_SUBSCRIPTION]({ commit }, { data }: { data: any }) {
    const { data: subscription } = await this.$axios.$post(
      `/subscription`,
      data
    );

    commit(MutationTypes.SET_SUBSCRIPTION, { data: subscription });
  },

  async [ActionTypes.CANCEL_SUBSCRIPTION]({ commit }) {
    const { data } = await this.$axios.$put(`/subscription`);
    commit(MutationTypes.SET_SUBSCRIPTION, { data });
  },
};

export default actions;
