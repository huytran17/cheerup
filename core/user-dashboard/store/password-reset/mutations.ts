import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PasswordResetState } from ".";
import { update } from "lodash";

const mutations: MutationTree<PasswordResetState> = {
  [MutationTypes.SET_PASSWORD_RESET](state, { data }: { data: any }) {
    state.password_reset = data;
  },

  [MutationTypes.UPDATE_PASSWORD_RESET_DATA](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.password_reset = update(state.password_reset, path, (n) => data);
  },
};

export default mutations;
