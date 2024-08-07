import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { SystemConfigurationState } from ".";
import { update } from "lodash";

const mutations: MutationTree<SystemConfigurationState> = {
  [MutationTypes.SET_SYSTEM_CONFIGURATION](state, { data }: { data: any }) {
    state.system_configuration = data;
  },

  [MutationTypes.UPDATE_SYSTEM_CONFIGURATION_DATA](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.system_configuration = update(
      state.system_configuration,
      path,
      (n) => data
    );
  },
};

export default mutations;
