import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AuthState } from ".";
import { update } from "lodash";

const mutations: MutationTree<AuthState> = {
  [MutationTypes.SET_ME](state, { data }: { data: any }) {
    state.me = data;
  },

  [MutationTypes.SET_HAS_USER](state, { data }: { data: boolean }) {
    state.has_user = data;
  },

  [MutationTypes.UPDATE_ME_DATA](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.me = update(state.me, path, (n) => data);
  },
};

export default mutations;
