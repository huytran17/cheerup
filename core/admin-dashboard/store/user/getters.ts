import { GetterTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";

export const getters: GetterTree<UserState, RootState> = {
  prefix() {
    return "/user";
  },
  user: (state) => state.user,
  user_analys_data: (state) => state.user_analys_data,
  users: (state) => state.users,
};

export default getters;
