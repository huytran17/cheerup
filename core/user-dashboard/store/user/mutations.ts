import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { UserState } from ".";
import { update } from "lodash";

const mutations: MutationTree<UserState> = {
  [MutationTypes.SET_USER](state, { data }: { data: any }) {
    state.user = data;
  },

  [MutationTypes.UPDATE_USER_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.user = update(state.user, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
