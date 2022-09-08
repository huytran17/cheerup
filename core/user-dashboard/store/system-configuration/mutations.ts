import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { SystemConfigurationState } from ".";
import _ from "lodash";

const mutations: MutationTree<SystemConfigurationState> = {
  [MutationTypes.SET_SYSTEM_CONFIGURATION](state, { data }: { data: any }) {
    state.system_configuration = data;
  },
};

export default mutations;
