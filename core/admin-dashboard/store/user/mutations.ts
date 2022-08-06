import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { UserState } from ".";
import _ from "lodash";

const mutations: MutationTree<UserState> = {
  [MutationTypes.SET_USER](state, { data }: { data: any }) {
    state.user = data;
  },

  [MutationTypes.SET_USERS](state, { data }: { data: any[] }) {
    state.users = data;
  },

  [MutationTypes.UPDATE_USER_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.user = _.update(state.user, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
