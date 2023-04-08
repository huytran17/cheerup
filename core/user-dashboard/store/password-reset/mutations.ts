import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PasswordResetState } from ".";
import _ from "lodash";

const mutations: MutationTree<PasswordResetState> = {
  [MutationTypes.SET_PASSWORD_RESET](state, { data }: { data: any }) {
    state.password_reset = data;
  },

  [MutationTypes.UPDATE_PASSWORD_RESET_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.password_reset = _.update(
      state.password_reset,
      variable_path,
      (n) => {
        return data;
      }
    );
  },
};

export default mutations;
