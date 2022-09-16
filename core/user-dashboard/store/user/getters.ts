import { GetterTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";

export const getters: GetterTree<UserState, RootState> = {
  prefix() {
    return "/user";
  },
  user: (state) => state.user,
};

export default getters;
