import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SystemConfigurationState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SystemConfigurationState, RootState> = {
  async [ActionTypes.GET_LATEST_SYSTEM_CONFIGURATION]({ commit }) {
    const { data: system_configuration } = await this.$axios.$get(
      `/system-configuration`
    );

    commit(MutationTypes.SET_SYSTEM_CONFIGURATION, {
      data: system_configuration,
    });

    return system_configuration;
  },
};

export default actions;
