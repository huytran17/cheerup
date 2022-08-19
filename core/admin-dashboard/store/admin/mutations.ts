import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AdminState } from ".";
import _ from "lodash";

const mutations: MutationTree<AdminState> = {
  [MutationTypes.SET_ADMIN](state, { data }: { data: any }) {
    state.admin = data;
  },

  [MutationTypes.SET_ADMINS](state, { data }: { data: any[] }) {
    state.admins = data;
  },

  [MutationTypes.UPDATE_ADMIN_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.admin = _.update(state.admin, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
