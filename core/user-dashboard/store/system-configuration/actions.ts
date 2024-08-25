import { ActionTree } from "vuex";
import { SystemConfigurationState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<SystemConfigurationState, RootState> = {
  async [ActionTypes.GET_LATEST_SYSTEM_CONFIGURATION]({ commit }) {
    const { data } = await this.$axios.$get(`/system-configuration`);

    commit(MutationTypes.SET_SYSTEM_CONFIGURATION, {
      data,
    });
  },
};

export default actions;
