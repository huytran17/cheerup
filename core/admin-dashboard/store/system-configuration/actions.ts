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

  async [ActionTypes.UPDATE_SYSTEM_CONFIGURATION](
    { commit },
    { data }: { data: any }
  ) {
    const { _id } = data;
    const { data: system_configuration } = await this.$axios.$put(
      `/system-configuration/${_id}`,
      data
    );
    commit(MutationTypes.SET_SYSTEM_CONFIGURATION, {
      data: system_configuration,
    });
  },
};

export default actions;
