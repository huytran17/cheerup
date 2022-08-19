import { GetterTree } from "vuex";
import { AdminState } from ".";
import { RootState } from "..";

export const getters: GetterTree<AdminState, RootState> = {
  prefix() {
    return "/admin";
  },
  admin: (state) => state.admin,
  admins: (state) => state.admins,
};

export default getters;
