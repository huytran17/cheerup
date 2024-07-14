import { GetterTree } from "vuex";
import { AdminState } from ".";
import { RootState } from "..";

export const getters: GetterTree<AdminState, RootState> = {
  prefix() {
    return "/admin";
  },
  admin: (state) => state.admin,
  admins: (state) => state.admins,
  admin_analys_data: (state) => state.admin_analys_data,
  pagination: (state) => state.pagination,
};

export default getters;
