import { GetterTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "../";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  user: (state) => state.user,
  me: (state) => state.me,
};
