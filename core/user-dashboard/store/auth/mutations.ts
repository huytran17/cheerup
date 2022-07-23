import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AuthState } from ".";

const mutations: MutationTree<AuthState> = {
  [MutationTypes.SET_ME](state, { data }: { data: any }) {
    state.me = data;
  },

  [MutationTypes.SET_USER](state, { data }: { data: any }) {
    state.user = data;
  },
};

export default mutations;
