import { GetterTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "../";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  me: (state) => state.me,
  has_user: (state) => state.has_user,
};

export default getters;
