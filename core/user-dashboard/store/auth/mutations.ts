import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AuthState } from ".";
import _ from "lodash";

const mutations: MutationTree<AuthState> = {
  [MutationTypes.SET_ME](state, { data }: { data: any }) {
    state.me = data;
  },

  [MutationTypes.UPDATE_ME_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.me = _.update(state.me, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
