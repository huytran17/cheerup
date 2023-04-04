import { GetterTree } from "vuex";
import { PasswordResetState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PasswordResetState, RootState> = {
  prefix() {
    return "/password-reset";
  },
  password_reset: (state) => state.password_reset,
};

export default getters;
