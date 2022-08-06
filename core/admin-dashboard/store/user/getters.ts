import { GetterTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";

export const getters: GetterTree<UserState, RootState> = {
  prefix() {
    return "/user";
  },
  user: (state) => state.user,
  users: (state) => state.users,
};

export default getters;
