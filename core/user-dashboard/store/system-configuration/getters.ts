import { GetterTree } from "vuex";
import { SystemConfigurationState } from ".";
import { RootState } from "..";

export const getters: GetterTree<SystemConfigurationState, RootState> = {
  prefix() {
    return "/system_configuration";
  },
  system_configuration: (state) => state.system_configuration,
};

export default getters;
